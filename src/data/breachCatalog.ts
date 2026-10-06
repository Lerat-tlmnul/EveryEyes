import { DocumentedBreach } from '../types/audit';

export const DOCUMENTED_BREACHES: Omit<DocumentedBreach, 'isLikelyExposed' | 'relevanceReason'>[] = [
  {
    id: 'discord-io-2023',
    service: 'Discord.io (Invites & Directory)',
    targetType: 'DISCORD',
    breachDate: 'Août 2023',
    recordsExposed: '760 000 comptes',
    severity: 'HIGH',
    compromisedData: [
      'Adresses email',
      'Identifiants uniques Discord (Snowflakes)',
      'Hachages de mots de passe bcrypt',
      'Adresses de facturation',
      'Tokens d\'authentification'
    ],
    description: 'Une faille critique sur le service de redirection d\'invitations Discord.io a conduit à l\'exfiltration complète de la base de données, mise en vente sur BreachForums par le pirate "Akhirah".',
    attackVector: 'Injection SQL & mauvaise configuration API'
  },
  {
    id: 'discord-spyware-botnet',
    service: 'Discord Token & Webhook Grabbers',
    targetType: 'DISCORD',
    breachDate: '2022 - 2024 (Continu)',
    recordsExposed: 'Multi-millions de sessions',
    severity: 'CRITICAL',
    compromisedData: [
      'Tokens de session Discord',
      'Cartes bancaires enregistrées (Nitro)',
      'Historique complet des DM privés',
      'Liste d\'amis et serveurs administrés'
    ],
    description: 'Les infostealers (RedLine, Racoon, Vidar) ciblent les fichiers LocalStorage de Discord pour voler le token de session. Cela permet de contourner le mot de passe et le 2FA en direct.',
    attackVector: 'Malware de type infostealer ou faux liens Discord Nitro'
  },
  {
    id: 'snapchat-api-leak-4m',
    service: 'Snapchat "Find Friends" Database',
    targetType: 'SNAPCHAT',
    breachDate: 'Janvier 2014 / Exploitations résiduelles',
    recordsExposed: '4,6 millions d\'utilisateurs',
    severity: 'HIGH',
    compromisedData: [
      'Pseudonymes Snapchat complets',
      'Numéros de téléphone associés',
      'Codes indicatifs régionaux'
    ],
    description: 'Une vulnérabilité dans l\'API "Trouver des amis" de Snapchat a permis à des attaquants d\'aspirer massivement les numéros de mobile reliés à chaque pseudonyme Snapchat, corrélant identité réelle et compte anonyme.',
    attackVector: 'Abus d\'API non bridée (Rate-limiting bypass)'
  },
  {
    id: 'snapsaved-cloud-leak',
    service: 'Snapsaved & Clients Tiers Snapchat',
    targetType: 'SNAPCHAT',
    breachDate: 'Octobre 2014 / 2020',
    recordsExposed: '200 000+ médias privés',
    severity: 'HIGH',
    compromisedData: [
      'Photos et vidéos éphémères archivées',
      'Pseudos expéditeurs et destinataires',
      'Métadonnées EXIF de prise de vue'
    ],
    description: 'Les utilisateurs ayant relié leur compte Snapchat à des applications tierces non officielles pour sauvegarder les Snaps ont vu leurs fichiers stockés sur des serveurs non chiffrés et divulgués en ligne.',
    attackVector: 'Serveurs cloud tiers non protégés (S3 Bucket misconfigured)'
  },
  {
    id: 'comb-mega-breach',
    service: 'COMB (Compilation of Many Breaches)',
    targetType: 'EMAIL',
    breachDate: 'Février 2021',
    recordsExposed: '3,2 milliards de paires login/MDP',
    severity: 'CRITICAL',
    compromisedData: [
      'Adresses email',
      'Mots de passe en clair ou déhachés',
      'Noms de domaine associés'
    ],
    description: 'La plus grande compilation publique de fuites d\'identifiants jamais indexée. Elle regroupe les fuites de LinkedIn, Netflix, Yahoo, Minecraft et des milliers d\'autres sites web.',
    attackVector: 'Agrégation automatisée et déhachage de bases de données compromises'
  },
  {
    id: 'collection-1-5',
    service: 'Collections #1 à #5 & Exploit.in',
    targetType: 'EMAIL',
    breachDate: '2019',
    recordsExposed: '2,7 milliards d\'identifiants',
    severity: 'HIGH',
    compromisedData: [
      'Emails',
      'Mots de passe textuels',
      'Combinaisons combo-list'
    ],
    description: 'Fichiers massifs utilisés par les botnets pour mener des attaques par "Credential Stuffing" automatisées sur tous les portails de connexion (webmails, banques, réseaux sociaux).',
    attackVector: 'Dumps de credentials échangés sur les marchés noirs cybercriminels'
  },
  {
    id: 'deezer-breach',
    service: 'Deezer User Database',
    targetType: 'EMAIL',
    breachDate: 'Fin 2022',
    recordsExposed: '229 millions de comptes',
    severity: 'HIGH',
    compromisedData: [
      'Prénoms et Noms',
      'Adresses email',
      'Dates de naissance',
      'Adresses IP et localisations géographiques'
    ],
    description: 'Une copie d\'une sauvegarde d\'un partenaire technique de 2019 a été dérobée et publiée sur un forum de hacking, reliant l\'identité civile complète à l\'adresse email.',
    attackVector: 'Compromission d\'un prestataire tiers'
  },
  {
    id: 'canva-breach',
    service: 'Canva Design Platform',
    targetType: 'EMAIL',
    breachDate: 'Mai 2019',
    recordsExposed: '137 millions de comptes',
    severity: 'MEDIUM',
    compromisedData: [
      'Noms d\'affichage',
      'Emails',
      'Villes et pays',
      'Mots de passe hachés bcrypt'
    ],
    description: 'Le groupe GHOSTSQUAD a pénétré les serveurs de Canva et a extrait les données des comptes créés avant mi-2019.',
    attackVector: 'Exploitation d\'une vulnérabilité serveur interne'
  },
  {
    id: 'twitter-x-scrape',
    service: 'Twitter / X Email Scrape Leak',
    targetType: 'GENERAL',
    breachDate: 'Janvier 2023',
    recordsExposed: '200 millions d\'utilisateurs',
    severity: 'HIGH',
    compromisedData: [
      'Adresses email',
      'Pseudos Twitter/X publics',
      'Noms de profil',
      'Date de création de compte'
    ],
    description: 'Une faille dans l\'API de recherche de contacts Twitter a permis de tester des milliards d\'adresses email et d\'obtenir en réponse le compte Twitter public lié, brisant l\'anonymat en ligne.',
    attackVector: 'API Contact Enumeration Exploit'
  },
  {
    id: 'french-gov-pole-emploi',
    service: 'Opérateurs de Services & Registres Publics',
    targetType: 'IDENTITY',
    breachDate: '2023 - 2024',
    recordsExposed: '43 millions d\'identités',
    severity: 'CRITICAL',
    compromisedData: [
      'Nom et Prénom',
      'Date de naissance',
      'Numéro de Sécurité Sociale (NIR)',
      'Adresse postale & Email',
      'Téléphone'
    ],
    description: 'Cyberattaques coordonnées contre des prestataires et opérateurs publics français ayant conduit à l\'exposition massive des états civils et coordonnées de contact.',
    attackVector: 'Usurpation d\'accès de conseillers via phishing'
  }
];
