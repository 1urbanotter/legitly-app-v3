import mongoose, { Document, Schema } from 'mongoose';

export interface ICase extends Document {
  userId: Schema.Types.ObjectId;
  issueDescription: string;
  partiesInvolved: string;
  incidentLocation: string;
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
}

const CaseSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  issueDescription: { type: String, required: true },
  partiesInvolved: { type: String, required: true },
  incidentLocation: { type: String, required: true },
  incidentDate: { type: Date, required: true },
  impact: { type: String, required: true },
  desiredOutcome: { type: String, required: true },
  documents: { type: [String], default: [] },
  caseClassification: { type: String },
  relevantLaws: { type: [String] },
  jurisdiction: { type: String },
  recommendations: { type: [String] },
  deadlines: { type: [String] },
  strengthIndicators: { type: String },
  supportingDocumentation: { type: [String] },
  draftedCommunication: { type: String },
}, { timestamps: true });

export default mongoose.models.Case || mongoose.model<ICase>('Case', CaseSchema);