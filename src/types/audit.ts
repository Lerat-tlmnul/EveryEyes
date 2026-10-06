export interface AuditInput {
  firstName?: string;
  lastName?: string;
  discordHandle?: string;
  snapchatHandle?: string;
  email?: string;
  phoneNumber?: string;
  city?: string;
}

export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface ThreatVector {
  id: string;
  title: string;
  category: 'IDENTITY' | 'CREDENTIALS' | 'SOCIAL_ENGINEERING' | 'GEOLOCATION' | 'METADATA';
  severity: RiskLevel;
  scoreImpact: number;
  description: string;
  crossPoint: string[];
  exploitScenario: string;
  mitigation: string;
}

export interface DocumentedBreach {
  id: string;
  service: string;
  targetType: 'DISCORD' | 'SNAPCHAT' | 'EMAIL' | 'IDENTITY' | 'GENERAL';
  breachDate: string;
  recordsExposed: string;
  severity: RiskLevel;
  compromisedData: string[];
  description: string;
  attackVector: string;
  isLikelyExposed: boolean;
  relevanceReason: string;
}

export interface OsintDork {
  id: string;
  label: string;
  query: string;
  description: string;
  riskAnalyzed: string;
  searchUrl: string;
}

export interface IdentityProfileDeduction {
  dataPoint: string;
  exposedThrough: string;
  deduction: string;
  certaintyPercent: number;
}

export interface RemediationStep {
  id: string;
  platform: 'DISCORD' | 'SNAPCHAT' | 'EMAIL' | 'GENERAL';
  priority: 'URGENT' | 'RECOMMENDED' | 'PREVENTATIVE';
  title: string;
  instructions: string[];
  link?: { label: string; url: string };
  completed: boolean;
}

export interface AuditReport {
  id: string;
  timestamp: string;
  input: AuditInput;
  overallScore: number; // 0-100 (100 is maximum exposure risk)
  riskLevel: RiskLevel;
  executiveSummary: string;
  threatVectors: ThreatVector[];
  breaches: DocumentedBreach[];
  identityDeductions: IdentityProfileDeduction[];
  osintDorks: OsintDork[];
  remediationPlan: RemediationStep[];
  correlationPivots: {
    handlesMatch: boolean;
    nameInEmail: boolean;
    highDoxxingPotential: boolean;
    credentialStuffingExposure: boolean;
  };
}
