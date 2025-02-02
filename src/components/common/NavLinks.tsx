import Link from 'next/link';
import SignOutButton from './SignOutButton';

interface NavItem {
  href: string;
  label: string;
}

interface NavLinksProps {
  isLoggedIn: boolean;
  authenticatedNavItems: NavItem[];
  publicNavItems: NavItem[];
}

const NavLinks = ({ isLoggedIn, authenticatedNavItems, publicNavItems }: NavLinksProps) => {
  return (
    <>
      {isLoggedIn ? (
        <>
          {authenticatedNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white hover:text-old_gold-500 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <SignOutButton />
        </>
      ) : (
        <>
          <div className="flex items-center space-x-6">
            {publicNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-old_gold-500 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/signup"
              className="bg-old_gold-500 hover:bg-old_gold-600 text-white px-6 py-2 rounded-lg transition-all hover:shadow-lg"
            >
              Sign Up
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default NavLinks;