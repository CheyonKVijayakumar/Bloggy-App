import { Project, Stakeholder, CarbonCredit, DataRecord } from './types';

export const stakeholders: Stakeholder[] = [
  { id: '1', address: '0xAdminUser', role: 'ADMIN', name: 'NCCR Admin' },
  { id: '2', address: '0xVerifierUser', role: 'VERIFIER', name: 'Coastal NGO' },
  { id: '3', address: '0xDeveloperUser', role: 'DEVELOPER', name: 'GreenDevelop Corp' },
  { id: '4', address: '0xPanchayatUser', role: 'VERIFIER', name: 'Sundarbans Panchayat' },
];

const project1DataRecords: DataRecord[] = [
  { id: 1, timestamp: 1672531200, dataHash: 'ipfs://Qm...record1', sequestrationDelta: 150, verified: true, verifier: '0xVerifierUser', verificationTimestamp: 1672617600 },
  { id: 2, timestamp: 1675209600, dataHash: 'ipfs://Qm...record2', sequestrationDelta: 120, verified: false },
];

const project2DataRecords: DataRecord[] = [
    { id: 1, timestamp: 1673531200, dataHash: 'ipfs://Qm...record3', sequestrationDelta: 200, verified: true, verifier: '0xPanchayatUser', verificationTimestamp: 1673617600 },
];

export const projects: Project[] = [
  {
    id: 1,
    developer: '0xDeveloperUser',
    name: 'Mangrove Restoration in Sundarbans',
    location: 'Sundarbans, West Bengal',
    baselineCarbon: 10000,
    lastSequestration: 14250,
    totalCreditsMinted: 14250,
    active: true,
    dataRecords: project1DataRecords,
    type: 'Mangrove',
  },
  {
    id: 2,
    developer: '0xDeveloperUser',
    name: 'Seagrass Protection in Palk Bay',
    location: 'Palk Bay, Tamil Nadu',
    baselineCarbon: 5000,
    lastSequestration: 19000,
    totalCreditsMinted: 19000,
    active: true,
    dataRecords: project2DataRecords,
    type: 'Seagrass',
  },
  {
    id: 3,
    developer: '0xDeveloperUser',
    name: 'Gulf of Kutch Salt Marsh Project',
    location: 'Gulf of Kutch, Gujarat',
    baselineCarbon: 8000,
    lastSequestration: 0,
    totalCreditsMinted: 0,
    active: true,
    dataRecords: [],
    type: 'Salt Marsh',
  },
];

export const carbonCredits: CarbonCredit[] = [
  { id: 1, tokenId: 1001, projectId: 1, sequestrationAmount: 14250, dataHash: 'ipfs://Qm...record1', owner: '0xDeveloperUser', retired: false, mintTimestamp: 1672704000 },
  { id: 2, tokenId: 1002, projectId: 2, sequestrationAmount: 19000, dataHash: 'ipfs://Qm...record3', owner: '0xBuyerAddress1', retired: false, mintTimestamp: 1673704000 },
  { id: 3, tokenId: 1003, projectId: 2, sequestrationAmount: 500, dataHash: 'ipfs://Qm...record3', owner: '0xDeveloperUser', retired: true, mintTimestamp: 1673704000 },
];
