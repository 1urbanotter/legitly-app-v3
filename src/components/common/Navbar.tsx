// src/components/common/Navbar.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import NavLinks from './NavLinks';
import MobileMenu from './MobileMenu';

interface NavItem {
  href: string;
  label: string;
}

const authenticatedNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/case/new', label: 'New Case' },
  { href: '/contact', label: 'Contact' },
];

const publicNavItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cookies] = useCookies(['token']);

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
          <NavLinks isLoggedIn={isLoggedIn} authenticatedNavItems={authenticatedNavItems} publicNavItems={publicNavItems} />
        </div>

        <AnimatePresence>
          {isOpen && (
            <MobileMenu
              isLoggedIn={isLoggedIn}
              authenticatedNavItems={authenticatedNavItems}
              publicNavItems={publicNavItems}
              setIsOpen={setIsOpen}
            />
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;