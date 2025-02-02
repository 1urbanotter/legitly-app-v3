import mongoose, { Document, Schema } from 'mongoose';
import { Case } from '@/types/case';

export interface ICaseDocument extends Omit<Case, '_id'>, Document {}

const CaseSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  issueDescription: { type: String, required: true },
  partiesInvolved: { type: String, required: true },
  incidentLocation: { type: String, required: true },
  incidentDate: { type: Date, required: true, index: true },
  impact: { type: String, required: true },
  desiredOutcome: { type: String, required: true },
  documents: [{ type: String }],
  caseClassification: String,
  relevantLaws: [String],
  jurisdiction: String,
  recommendations: [String],
  deadlines: [String],
  strengthIndicators: String,
  supportingDocumentation: [String],
  draftedCommunication: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

CaseSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.models.Case || mongoose.model<ICaseDocument>('Case', CaseSchema);