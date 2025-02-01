export interface AnalysisResult {
  caseClassification?: string;
  relevantLaws?: string[];
  jurisdiction?: string;
  recommendations?: string[];
  deadlines?: string[];
  strengthIndicators?: string;
  supportingDocumentation?: string[];
  draftedCommunication?: string;
}