// src/components/dashboard/CaseItem.tsx
import { motion } from 'framer-motion';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Case } from '@/types/case';

interface CaseItemProps {
  caseItem: Case;
}

const CaseStatusBadge = ({ classification }: { classification?: string }) => {
  const getStatusColor = (status: string) => {
    const colors = {
      'Civil': 'bg-blue-100 text-blue-800',
      'Criminal': 'bg-red-100 text-red-800',
      'Family': 'bg-green-100 text-green-800',
      'Corporate': 'bg-purple-100 text-purple-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || colors.default;
  };

  return classification ? (
    <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(classification)}`}>
      {classification}
    </span>
  ) : null;
};

const CaseItem = ({ caseItem }: CaseItemProps) => {
  const formattedDate = caseItem.incidentDate 
    ? formatDistanceToNow(new Date(caseItem.incidentDate), { addSuffix: true })
    : 'Date not specified';

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
    >
      <Link href={`/case/${caseItem._id}`} className="block p-6">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-space_cadet-700 mb-2 truncate">
              {caseItem.issueDescription}
            </h3>
            
            <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
              <div className="col-span-2">
                <span className="font-medium">Incident Date:</span>{' '}
                <span>{formattedDate}</span>
              </div>
              
              {caseItem.partiesInvolved && (
                <div className="col-span-2">
                  <span className="font-medium">Parties:</span>{' '}
                  <span className="truncate">{caseItem.partiesInvolved}</span>
                </div>
              )}
              
              {caseItem.impact && (
                <div className="col-span-2">
                  <span className="font-medium">Impact:</span>{' '}
                  <span className="truncate">{caseItem.impact}</span>
                </div>
              )}
            </div>
          </div>

          <CaseStatusBadge classification={caseItem.caseClassification} />
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Created {formatDistanceToNow(new Date(caseItem.createdAt), { addSuffix: true })}
          </span>
          {caseItem.documents?.length > 0 && (
            <span className="text-space_cadet-600">
              {caseItem.documents.length} document{caseItem.documents.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </Link>
    </motion.li>
  );
};

export default CaseItem;