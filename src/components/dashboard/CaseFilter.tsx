import { motion } from 'framer-motion';

interface FilterOption {
  value: string;
  label: string;
}

interface CaseFilterProps {
  options: FilterOption[];
  currentFilter: string;
  onFilterChange: (value: string) => void;
}

const CaseFilter = ({ options, currentFilter, onFilterChange }: CaseFilterProps) => {
  return (
    <div>
      <label htmlFor="case-filter" className="sr-only">Filter Cases</label>
      <motion.select
        id="case-filter"
        value={currentFilter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="rounded-lg border-gray-300 shadow-sm 
                   focus:border-space_cadet-500 focus:ring-space_cadet-500
                   bg-white px-4 py-2 text-sm font-medium text-gray-700
                   hover:bg-gray-50 transition-colors duration-200"
        whileTap={{ scale: 0.98 }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </motion.select>
    </div>
  );
};

export default CaseFilter;