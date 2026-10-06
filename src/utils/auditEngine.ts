import {
  AuditInput,
  AuditReport,
  DocumentedBreach,
  IdentityProfileDeduction,
  OsintDork,
  RemediationStep,
  RiskLevel,
  ThreatVector
} from '../types/audit';
import { DOCUMENTED_BREACHES } from '../data/breachCatalog';

function clean(str?: string): string {
  return (str || '').toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function runSecurityAudit(input: AuditInput): AuditReport {
  const cleanFirst = clean(input.firstName);
  const cleanLast = clean(input.lastName);
  const cleanDiscord = clean(input.discordHandle).replace(/^@/, '');
  const cleanSnap = clean(input.snapchatHandle).replace(/^@/, '');
  const cleanEmail = clean(input.email);
  const emailUser = cleanEmail.includes('@') ? cleanEmail.split('@')[0] : '';
  const emailDomain = cleanEmail.includes('@') ? cleanEmail.split('@')[1] : '';

  const hasName = Boolean(cleanFirst || cleanLast);
  const hasDiscord = Boolean(cleanDiscord);
  const hasSnap = Boolean(cleanSnap);
  const hasEmail = Boolean(cleanEmail);
  const hasPhone = Boolean(input.phoneNumber && input.phoneNumber.trim().length > 6);
  const hasCity = Boolean(input.city && input.city.trim().length > 1);

  const providedCount = [hasName, hasDiscord, hasSnap, hasEmail, hasPhone, hasCity].filter(Boolean).length;

  // Correlation logic
  const handlesMatch = hasDiscord && hasSnap && cleanDiscord.length > 2 && (cleanDiscord === cleanSnap || cleanDiscord.includes(cleanSnap) || cleanSnap.includes(cleanDiscord));
  const nameInEmail = hasName && hasEmail && ((cleanFirst.length > 2 && emailUser.includes(cleanFirst)) || (cleanLast.length > 2 && emailUser.includes(cleanLast)));
  const handleInEmail = hasEmail && ((hasDiscord && cleanDiscord.length > 2 && emailUser.includes(cleanDiscord)) || (hasSnap && cleanSnap.length > 2 && emailUser.includes(cleanSnap)));
  const nameInHandle = hasName && ((hasDiscord && (cleanDiscord.includes(cleanFirst) || cleanDiscord.includes(cleanLast))) || (hasSnap && (cleanSnap.includes(cleanFirst) || cleanSnap.includes(cleanLast))));

  // Score calculation based on provided vectors
  let score = 20;

  if (hasEmail) score += 20;
  if (hasName) score += 15;
  if (hasDiscord) score += 12;
  if (hasSnap) score += 12;
  if (hasPhone) score += 14;
  if (hasCity) score += 6;

  // Additional correlation penalties
  if (handlesMatch) score += 15;
  if (nameInEmail) score += 12;
  if (handleInEmail) score += 10;
  if (nameInHandle) score += 10;

  // Cap score
  score = Math.min(score, 98);
  if (providedCount === 1) {
    score = Math.min(score, 45); // Single identifier has moderate standalone exposure
  }

  let riskLevel: RiskLevel = 'LOW';
  if (score >= 70) riskLevel = 'CRITICAL';
  else if (score >= 50) riskLevel = 'HIGH';
  else if (score >= 30) riskLevel = 'MEDIUM';

  const threatVectors: ThreatVector[] = [];

  // Handle Reuse vector
  if (handlesMatch) {
    threatVectors.push({
      id: 'vector-handle-reuse',
      title: 'Triangulation par Réutilisation de Pseudonyme',
      category: 'IDENTITY',
      severity: 'CRITICAL',
      scoreImpact: 18,
      description: `Le pseudonyme Discord ("${input.discordHandle}") et Snapchat ("${input.snapchatHandle}") sont identiques ou très similaires. Cela permet de relier instantanément votre vie publique et vos cercles d'amis intimes.`,
      crossPoint: ['Discord', 'Snapchat'],
      exploitScenario: 'Un attaquant sur un serveur Discord public retrouve votre compte Snapchat en quelques secondes pour accéder à vos stories, vos amis ou votre géolocalisation.',
      mitigation: 'Utilisez un pseudonyme d\'emprunt opaque sur Discord et un pseudonyme distinct sur Snapchat.'
    });
  }

  // Name in Email vector
  if (nameInEmail) {
    threatVectors.push({
      id: 'vector-name-email-pivot',
      title: 'Pivot Identité Réelle via Adresse Email',
      category: 'SOCIAL_ENGINEERING',
      severity: 'HIGH',
      scoreImpact: 14,
      description: `Votre adresse email ("${input.email}") contient votre nom ou prénom. L'anonymat est compromis dès qu'un service expose cette adresse.`,
      crossPoint: ['Identité Civile', 'Email'],
      exploitScenario: 'En cas de fuite sur un site tiers (Canva, forum, boutique), l\'attaquant fait le lien direct avec votre état civil, employeur ou profil LinkedIn.',
      mitigation: 'Réservez cet email aux administrations et utilisez des alias masqués (SimpleLogin / Hide My Email) pour tous les services web.'
    });
  }

  // Email specific threats
  if (hasEmail) {
    threatVectors.push({
      id: 'vector-credential-stuffing',
      title: 'Vulnérabilité au Credential Stuffing & Dépassement de Hachages',
      category: 'CREDENTIALS',
      severity: 'HIGH',
      scoreImpact: 15,
      description: `L'adresse email "${input.email}" a une très forte probabilité d'apparaître dans les méga-compilations (COMB, Collections #1 à #5). Tout mot de passe réutilisé expose vos comptes.`,
      crossPoint: ['Email', ...(hasDiscord ? ['Discord'] : []), ...(hasSnap ? ['Snapchat'] : [])],
      exploitScenario: 'Des botnets testent automatiquement les combinaisons email/mot de passe fuitées sur des centaines de services pour compromettre vos comptes.',
      mitigation: 'Activez le 2FA par clé physique ou application TOTP (pas de SMS) et utilisez un mot de passe unique par service.'
    });
  }

  // Discord specific threat
  if (hasDiscord) {
    threatVectors.push({
      id: 'vector-discord-scraping',
      title: 'Exposition Discord & Profilage Communautaire',
      category: 'METADATA',
      severity: 'MEDIUM',
      scoreImpact: 10,
      description: `Le pseudo Discord "${input.discordHandle}" peut être archivé par des bots tiers (Discortics, top.gg) qui enregistrent les serveurs publics rejoints, l'ID numérique (Snowflake) et les rôles.`,
      crossPoint: ['Discord', ...(hasName ? ['Identité Civile'] : [])],
      exploitScenario: 'Des attaquants cartographient vos centres d\'intérêt et vos contacts pour monter un scénario d\'ingénierie sociale (faux concours Discord Nitro, fausse alerte modération).',
      mitigation: 'Verrouillez les messages privés des membres du serveur et masquez vos comptes connectés (Steam, Spotify, GitHub).'
    });
  }

  // Snapchat specific threat
  if (hasSnap) {
    threatVectors.push({
      id: 'vector-snap-metadata',
      title: 'Exposition Snapchat & Géolocalisation Snap Map',
      category: 'GEOLOCATION',
      severity: 'MEDIUM',
      scoreImpact: 10,
      description: `Le profil Snapchat "${input.snapchatHandle}" expose potentiellement votre numéro de téléphone (API Find Friends) et votre position géographique si la carte Snap n'est pas restreinte.`,
      crossPoint: ['Snapchat', ...(hasPhone ? ['Numéro Mobile'] : [])],
      exploitScenario: 'Localisation de votre routine quotidienne ou découverte de votre numéro de portable via la synchronisation des contacts.',
      mitigation: 'Activez en permanence le "Mode Fantôme" et désactivez "Me trouver avec mon numéro de téléphone".'
    });
  }

  // Spear Phishing if combination of name and contact/handle
  if (hasName && (hasEmail || hasDiscord || hasSnap)) {
    const contacts = [
      input.email ? 'votre email' : '',
      input.discordHandle ? 'Discord' : '',
      input.snapchatHandle ? 'Snapchat' : ''
    ].filter(Boolean).join(' et ');

    threatVectors.push({
      id: 'vector-spear-phishing',
      title: 'Surface d\'Ingénierie Sociale Ciblée (Spear-Phishing)',
      category: 'SOCIAL_ENGINEERING',
      severity: 'HIGH',
      scoreImpact: 12,
      description: `En associant votre identité (${[input.firstName, input.lastName].filter(Boolean).join(' ')}) à ${contacts}, un escroc peut confectionner un message personnalisé très convaincant.`,
      crossPoint: ['Nom', ...(hasEmail ? ['Email'] : []), ...(hasDiscord ? ['Discord'] : [])],
      exploitScenario: 'Envoi d\'un email d\'alerte personnalisé vous appelant par votre vrai nom concernant un prétendu bannissement ou piratage.',
      mitigation: 'Ne cliquez jamais sur les liens reçus par email ou DM. Connectez-vous toujours directement depuis le site ou l\'application officielle.'
    });
  }

  // SIM swapping if phone provided
  if (hasPhone) {
    threatVectors.push({
      id: 'vector-sim-swapping',
      title: 'Vecteur Téléphonique & Risque de SIM-Swapping',
      category: 'CREDENTIALS',
      severity: 'CRITICAL',
      scoreImpact: 16,
      description: `La détention de votre numéro (${input.phoneNumber}) combinée à votre nom civil est la cible principale des attaques par détournement de carte SIM auprès des opérateurs.`,
      crossPoint: ['Téléphone', ...(hasName ? ['Identité Civile'] : [])],
      exploitScenario: 'L\'attaquant se fait passer pour vous auprès du service client de l\'opérateur téléphonique pour activer une nouvelle carte SIM et intercepter vos SMS 2FA.',
      mitigation: 'Bannissez la double authentification par SMS au profit d\'une application TOTP (Bitwarden, Aegis, 2FAS) ou d\'une clé FIDO2.'
    });
  }

  // Deductions
  const identityDeductions: IdentityProfileDeduction[] = [];

  if (hasName) {
    identityDeductions.push({
      dataPoint: 'Identité Civile & Registres Publics',
      exposedThrough: [input.firstName, input.lastName].filter(Boolean).join(' '),
      deduction: 'Permet de retrouver les comptes professionnels (LinkedIn, Malt), articles de presse, mentions dans des associations ou listes de résultats scolaires/concours.',
      certaintyPercent: 90
    });
  }

  if (hasEmail) {
    identityDeductions.push({
      dataPoint: 'Périmètre des Inscriptions en Ligne',
      exposedThrough: `Email (${input.email})`,
      deduction: 'Pivot universel. Utilisé pour tester l\'existence de comptes sur Amazon, Netflix, banques, PayPal via des formulaires d\'inscription ou de récupération.',
      certaintyPercent: 98
    });
  }

  if (hasDiscord) {
    identityDeductions.push({
      dataPoint: 'Communautés, Gaming & Horaires',
      exposedThrough: `Discord (${input.discordHandle})`,
      deduction: 'Historique des serveurs publics fréquentés, statut de jeu, fuseau horaire habituel et liaisons avec Steam / Twitch.',
      certaintyPercent: 88
    });
  }

  if (hasSnap) {
    identityDeductions.push({
      dataPoint: 'Cercle Privé & Réseau Social Proche',
      exposedThrough: `Snapchat (${input.snapchatHandle})`,
      deduction: 'Réseau d\'amis proches, stories partagées et géolocalisation si le mode Fantôme est inactif.',
      certaintyPercent: 85
    });
  }

  if (hasCity) {
    identityDeductions.push({
      dataPoint: 'Zone Géographique d\'Activité',
      exposedThrough: `Ville (${input.city})`,
      deduction: `Permet de restreindre les recoupements d'ingénierie sociale à la région locale (${input.city}).`,
      certaintyPercent: 92
    });
  }

  // Correlate Documented Breaches based on what was provided
  const breaches: DocumentedBreach[] = DOCUMENTED_BREACHES.filter(breach => {
    if (breach.targetType === 'DISCORD' && !hasDiscord) return false;
    if (breach.targetType === 'SNAPCHAT' && !hasSnap) return false;
    if (breach.targetType === 'EMAIL' && !hasEmail) return false;
    if (breach.targetType === 'IDENTITY' && !hasName) return false;
    return true;
  }).map(breach => {
    let relevanceReason = '';
    if (breach.targetType === 'DISCORD') {
      relevanceReason = `Compte Discord analysé ("${input.discordHandle}"). Risque d'exposition dans les services tiers et scrapers d'API.`;
    } else if (breach.targetType === 'SNAPCHAT') {
      relevanceReason = `Compte Snapchat analysé ("${input.snapchatHandle}"). Risque de corrélation via l'API de contacts.`;
    } else if (breach.targetType === 'EMAIL') {
      relevanceReason = `Adresse email analysée ("${input.email}"). Forte présence dans les index globaux de credentials.`;
    } else if (breach.targetType === 'IDENTITY') {
      relevanceReason = `Identité civile (${[input.firstName, input.lastName].filter(Boolean).join(' ')}). Risque lié aux fuites de registres officiels.`;
    } else {
      relevanceReason = 'Compromission générale de métadonnées publiques.';
    }

    return {
      ...breach,
      isLikelyExposed: true,
      relevanceReason
    };
  });

  // OSINT Google Dorks tailored only to provided data
  const osintDorks: OsintDork[] = [];

  if (hasName) {
    const fullName = [input.firstName, input.lastName].filter(Boolean).join(' ');
    osintDorks.push({
      id: 'dork-civil-docs',
      label: 'Fichiers & Documents Personnels Indexés (CV, PDF)',
      query: `"${fullName}" (filetype:pdf OR filetype:docx OR filetype:xlsx)`,
      description: 'Vérifie si des documents confidentiels (CV, listes associatives, délibérations) contenant votre nom sont indexés sur Google.',
      riskAnalyzed: 'Exposition d\'antécédents civils, adresses ou coordonnées.',
      searchUrl: `https://www.google.com/search?q=${encodeURIComponent(`"${fullName}" (filetype:pdf OR filetype:docx OR filetype:xlsx)`)}`
    });
  }

  if (hasEmail) {
    osintDorks.push({
      id: 'dork-email-leaks',
      label: 'Mentions Publiques de l\'Adresse Email',
      query: `"${input.email}"`,
      description: 'Recherche les forums, annuaires et pages publiques où votre email figure en clair.',
      riskAnalyzed: 'Ciblage spam, scraping par data brokers.',
      searchUrl: `https://www.google.com/search?q=${encodeURIComponent(`"${input.email}"`)}`
    });
  }

  if (hasDiscord) {
    osintDorks.push({
      id: 'dork-discord-pastes',
      label: 'Dumps & Pastes Mentionnant le Pseudo Discord',
      query: `site:pastebin.com OR site:justpaste.it OR site:rentry.co "${cleanDiscord}"`,
      description: 'Détecte si votre identifiant Discord est mentionné dans des fichiers de logs ou des bases fuitées.',
      riskAnalyzed: 'Présence dans des combo-lists ou listes de cibles.',
      searchUrl: `https://www.google.com/search?q=${encodeURIComponent(`site:pastebin.com OR site:justpaste.it OR site:rentry.co "${cleanDiscord}"`)}`
    });
  }

  if (hasSnap || hasDiscord) {
    const queryHandles = [
      hasDiscord ? `"${cleanDiscord}"` : '',
      hasSnap ? `"${cleanSnap}"` : ''
    ].filter(Boolean).join(' OR ');

    osintDorks.push({
      id: 'dork-cross-social',
      label: 'Empreinte des Pseudonymes sur le Web Public',
      query: `site:github.com OR site:twitter.com OR site:instagram.com OR site:tiktok.com ${queryHandles}`,
      description: 'Détecte si vos pseudonymes sont associés à d\'autres profils publics découvrables par des tiers.',
      riskAnalyzed: 'Facilité de traçage et corrélation multi-plateformes.',
      searchUrl: `https://www.google.com/search?q=${encodeURIComponent(`site:github.com OR site:twitter.com OR site:instagram.com OR site:tiktok.com ${queryHandles}`)}`
    });
  }

  // Remediation steps adapted
  const remediationPlan: RemediationStep[] = [
    {
      id: 'rem-mfa-authenticator',
      platform: 'GENERAL',
      priority: 'URGENT',
      title: 'Activer la Double Authentification (2FA) par Application TOTP',
      instructions: [
        'Installez un gestionnaire d\'authentification sécurisé (Bitwarden, 2FAS, Aegis ou Google Authenticator).',
        'Bannissez le 2FA par SMS sur tous vos comptes pour éliminer le risque de SIM Swapping.',
        'Téléchargez et conservez vos codes de secours hors ligne.'
      ],
      completed: false
    }
  ];

  if (hasDiscord) {
    remediationPlan.push({
      id: 'rem-discord-lockdown',
      platform: 'DISCORD',
      priority: 'URGENT',
      title: 'Verrouiller la Confidentialité de votre Compte Discord',
      instructions: [
        'Dans Paramètres > Confidentialité et sécurité : désactivez "Autoriser les messages privés des membres du serveur".',
        'Désactivez les requêtes d\'amis provenant de "Tout le monde".',
        'Dans Connexions : masquez les profils tiers (Steam, Spotify, GitHub, YouTube).'
      ],
      completed: false
    });
  }

  if (hasSnap) {
    remediationPlan.push({
      id: 'rem-snap-ghostmode',
      platform: 'SNAPCHAT',
      priority: 'URGENT',
      title: 'Activer le Mode Fantôme et Masquer vos Coordonnées sur Snapchat',
      instructions: [
        'Ouvrez la Carte Snap > Paramètres > Activez immédiatement le "Mode Fantôme" (Ghost Mode).',
        'Dans Paramètres de profil > Numéro : désactivez "Laisser les autres me trouver grâce à mon numéro".',
        'Réglez "Me contacter" et "Voir ma story" sur "Mes amis uniquement".'
      ],
      completed: false
    });
  }

  if (hasEmail) {
    remediationPlan.push({
      id: 'rem-email-alias',
      platform: 'EMAIL',
      priority: 'RECOMMENDED',
      title: 'Cloisonner votre Adresse Email avec des Alias Masqués',
      instructions: [
        'Créez un compte sur un service de relais d\'alias comme SimpleLogin, Firefox Relay ou Apple Hide My Email.',
        'Générez un alias unique pour chaque nouvelle plateforme. Si un service fuite, désactivez l\'alias sans impacter votre vie réelle.'
      ],
      completed: false
    });
  }

  remediationPlan.push({
    id: 'rem-google-removal',
    platform: 'GENERAL',
    priority: 'RECOMMENDED',
    title: 'Demander le Déréférencement de vos Données sur Google (PII)',
    instructions: [
      'Utilisez le formulaire officiel Google pour retirer les résultats exposant vos coordonnées personnelles.',
      'Exercez votre Droit à l\'effacement RGPD (Art. 17) auprès des sites qui indexent des informations sans votre accord.'
    ],
    link: {
      label: 'Outil officiel Google Removal',
      url: 'https://support.google.com/websearch/troubleshooter/3111061'
    },
    completed: false
  });

  const identityDescription = [
    hasName ? `nom civil (${[input.firstName, input.lastName].filter(Boolean).join(' ')})` : '',
    hasDiscord ? `compte Discord (${input.discordHandle})` : '',
    hasSnap ? `compte Snapchat (${input.snapchatHandle})` : '',
    hasEmail ? `adresse email (${input.email})` : ''
  ].filter(Boolean).join(', ');

  const executiveSummary = providedCount > 2
    ? `Niveau d'exposition ${riskLevel === 'CRITICAL' ? 'CRITIQUE' : 'ÉLEVÉ'} (${score}/100). Le croisement de vos données (${identityDescription}) crée une surface d'attaque étendue avec des risques avérés de corrélation d'identité, doxxing et credential stuffing.`
    : providedCount === 2
    ? `Niveau d'exposition MODÉRÉ À ÉLEVÉ (${score}/100). L'audit des éléments renseignés (${identityDescription}) met en évidence des points de contact exploitables par des tiers malveillants.`
    : `Niveau d'exposition CIBLÉ (${score}/100). Audit calculé sur la base de votre identifiant unique (${identityDescription}). Même isolé, cet identifiant présente des vecteurs de fuite spécifiques qu'il convient de verrouiller.`;

  return {
    id: `audit-${Date.now()}`,
    timestamp: new Date().toISOString(),
    input,
    overallScore: score,
    riskLevel,
    executiveSummary,
    threatVectors,
    breaches,
    identityDeductions,
    osintDorks,
    remediationPlan,
    correlationPivots: {
      handlesMatch,
      nameInEmail,
      highDoxxingPotential: score >= 60,
      credentialStuffingExposure: hasEmail
    }
  };
}
