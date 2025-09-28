export type StakeholderRole = "ADMIN" | "VERIFIER" | "DEVELOPER";

export interface Stakeholder {
  id: string;
  address: string;
  role: StakeholderRole;
  name: string;
}

export interface DataRecord {
  id: number;
  timestamp: number;
  dataHash: string;
  sequestrationDelta: number;
  verified: boolean;
  verifier?: string;
  verificationTimestamp?: number;
}

export interface Project {
  id: number;
  developer: string;
  name: string;
  location: string;
  baselineCarbon: number;
  lastSequestration: number;
  totalCreditsMinted: number;
  active: boolean;
  dataRecords: DataRecord[];
  type: 'Mangrove' | 'Seagrass' | 'Salt Marsh';
}

export interface CarbonCredit {
  id: number;
  tokenId: number;
  projectId: number;
  sequestrationAmount: number;
  dataHash: string;
  owner: string;
  retired: boolean;
  mintTimestamp: number;
}
