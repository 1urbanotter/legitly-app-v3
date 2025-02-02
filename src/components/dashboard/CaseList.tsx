'use client';

import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Case } from '@/types/case';
import CaseItem from './CaseItem';
import CaseFilter from './CaseFilter';
import ErrorBoundary from '@/components/ErrorBoundary';

interface CaseListProps {
  cases: Case[];
}

const FILTER_OPTIONS = [
  { value: 'all', label: 'All Cases' },
  { value: 'Civil', label: 'Civil Cases' },
  { value: 'Criminal', label: 'Criminal Cases' },
  { value: 'Family', label: 'Family Law' },
  { value: 'Corporate', label: 'Corporate Law' }
];

export default function CaseList({ cases }: CaseListProps) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'status'>('date');
  
  const filteredAndSortedCases = useMemo(() => {
    let result = [...cases];
    
    // Apply filter
    if (filter !== 'all') {
      result = result.filter(c => c.caseClassification === filter);
    }
    
    // Apply sort
    result.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return (a.caseClassification || '').localeCompare(b.caseClassification || '');
    });
    
    return result;
  }, [cases, filter, sortBy]);

  return (
    <ErrorBoundary>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-space_cadet-700">
            Your Cases ({filteredAndSortedCases.length})
          </h2>
          <div className="flex gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'status')}
              className="rounded-md border-gray-300 shadow-sm focus:border-space_cadet-500 focus:ring-space_cadet-500"
            >
              <option value="date">Sort by Date</option>
              <option value="status">Sort by Status</option>
            </select>
            <CaseFilter 
              options={FILTER_OPTIONS}
              currentFilter={filter} 
              onFilterChange={setFilter} 
            />
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {filteredAndSortedCases.length > 0 ? (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredAndSortedCases.map((caseItem) => (
                <CaseItem 
                  key={caseItem._id} 
                  caseItem={caseItem} 
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">
                {filter === 'all' 
                  ? "No cases found. Create your first case to get started!" 
                  : `No ${filter} cases found.`}
              </p>
              {filter === 'all' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 px-6 py-2 bg-space_cadet-600 text-white rounded-lg shadow hover:bg-space_cadet-700 transition-colors"
                  onClick={() => window.location.href = '/case/new'}
                >
                  Create New Case
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </ErrorBoundary>
  );
}