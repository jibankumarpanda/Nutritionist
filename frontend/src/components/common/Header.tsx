'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '../ui/AppIcon';

interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const pathname = usePathname();

  const primaryNavItems = [
    { label: 'Dashboard', href: '/dashboard', icon: 'ChartBarIcon' },
    { label: 'Food Verification', href: '/food-verification-hub', icon: 'MagnifyingGlassIcon' },
    { label: 'Recipes', href: '/recipe-discovery', icon: 'BookOpenIcon' },
    { label: 'Community', href: '/community-forum', icon: 'UserGroupIcon' },
  ];

  const secondaryNavItems = [
    { label: 'Profile', href: '/personal-profile', icon: 'UserCircleIcon' },
  ];

  const isActivePath = (href: string) => pathname === href;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMoreMenuOpen(false);
  };

  const toggleMoreMenu = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-card shadow-md ${className}`}>
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          <Link 
            href="/homepage" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
              >
                <path
                  d="M20 8C13.373 8 8 13.373 8 20C8 26.627 13.373 32 20 32C26.627 32 32 26.627 32 20C32 13.373 26.627 8 20 8Z"
                  fill="white"
                  opacity="0.2"
                />
                <path
                  d="M20 12C15.582 12 12 15.582 12 20C12 24.418 15.582 28 20 28C24.418 28 28 24.418 28 20C28 15.582 24.418 12 20 12Z"
                  fill="white"
                />
                <circle cx="20" cy="20" r="3" fill="currentColor" className="text-primary" />
                <path
                  d="M20 16L22 18L20 20L18 18L20 16Z"
                  fill="currentColor"
                  className="text-primary"
                />
                <path
                  d="M20 24L18 22L20 20L22 22L20 24Z"
                  fill="currentColor"
                  className="text-primary"
                />
              </svg>
            </div>
            <span className="text-xl font-headline font-bold text-foreground">
              NutriIntel
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {primaryNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActivePath(item.href)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-surface hover:text-primary'
                }`}
              >
                <Icon name={item.icon as any} size={20} />
                <span>{item.label}</span>
              </Link>
            ))}

            <div className="relative">
              <button
                onClick={toggleMoreMenu}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isMoreMenuOpen
                    ? 'bg-surface text-primary' :'text-foreground hover:bg-surface hover:text-primary'
                }`}
              >
                <Icon name="EllipsisHorizontalIcon" size={20} />
                <span>More</span>
              </button>

              {isMoreMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-brand-lg border border-border">
                  {secondaryNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMoreMenuOpen(false)}
                      className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                        isActivePath(item.href)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-surface hover:text-primary'
                      }`}
                    >
                      <Icon name={item.icon as any} size={20} />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md text-foreground hover:bg-surface transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border">
            <nav className="px-4 py-4 space-y-1">
              {[...primaryNavItems, ...secondaryNavItems].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActivePath(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-surface hover:text-primary'
                  }`}
                >
                  <Icon name={item.icon as any} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;