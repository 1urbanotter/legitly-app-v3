export interface Case {
  _id: string;
  userId: string;
  issueDescription: string;
  partiesInvolved: string;
  incidentDate: Date;
  impact: string;
  desiredOutcome: string;
  documents: string[];
  caseClassification?: string;
  relevantLaws?: string[];
  jurisdiction?: string;
  recommendations?: string[];
  deadlines?: string[];
  strengthIndicators?: string;
  supportingDocumentation?: string[];
  draftedCommunication?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}