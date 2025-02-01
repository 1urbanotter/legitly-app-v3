'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import SignOutButton from './SignOutButton';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import image from 'next/image';

interface NavItem {
  href: string;
  label: string;
}

const authenticatedNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/case/new', label: 'New Case' },
  { href: '/contact', label: 'Contact' }
];

const publicNavItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cookies] = useCookies(['token']);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoggedIn(!!cookies.token);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [cookies.token]);

  const navClasses = `fixed mx-auto w-[95%] top-6 left-0 right-0 z-50 py-2 px-4 rounded-xl transition-all duration-300 ${
    isScrolled ? 'bg-legally_red-500/80 backdrop-blur-sm' : 'bg-legally_red'
  }`;

  return (
    <nav className={navClasses}>
      <div className="container flex items-center justify-between py-0 px-0">
          <Link href="/">
            <Image
              className="object-fit hover:opacity-90 transition-opacity"
              src="/images/logo-2.png"
              alt="Legitly Logo"
              width={150}
              height={50}
            />
          </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden relative z-10 p-2 hover:bg-space_cadet-600 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`w-6 h-0.5 bg-white my-1 ${isOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>

        <div className="hidden lg:flex lg:items-center lg:space-x-8">
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
        </div>

        <AnimatePresence>
          {isOpen && (
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
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;