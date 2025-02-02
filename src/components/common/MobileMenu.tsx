import Link from 'next/link';
import SignOutButton from './SignOutButton';
import { motion } from 'framer-motion';

interface NavItem {
  href: string;
  label: string;
}

interface MobileMenuProps {
  isLoggedIn: boolean;
  authenticatedNavItems: NavItem[];
  publicNavItems: NavItem[];
  setIsOpen: (isOpen: boolean) => void;
}

const MobileMenu = ({ isLoggedIn, authenticatedNavItems, publicNavItems, setIsOpen }: MobileMenuProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 right-0 bg-white shadow-xl lg:hidden"
    >
      <div className="container mx-auto py-4 px-6">
        {isLoggedIn ? (
          <div className="flex flex-col space-y-4">
            {authenticatedNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-old_gold-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <SignOutButton />
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            {publicNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-old_gold-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/signup"
              className="bg-old_gold-500 hover:bg-old_gold-600 text-white px-6 py-2 rounded-lg transition-all text-center"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MobileMenu;