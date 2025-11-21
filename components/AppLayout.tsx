import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/manufacturer', label: 'Manufacturer' },
  { href: '/scan', label: 'Scan / Verify' },
  { href: '/customer', label: 'Customer' },
  { href: '/admin', label: 'Admin' },
  { href: '/ai-verify', label: 'AI Verify' },
];

export function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter();

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="app-header-inner">
          <Link href="/" className="app-logo">
            <span className="app-logo-mark">SS</span>
            <span className="app-logo-text">ScanSafe</span>
          </Link>
          <nav className="app-nav">
            {navItems.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    'app-nav-link' + (isActive ? ' app-nav-link--active' : '')
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="app-main">
        <div className="page">{children}</div>
      </main>
    </div>
  );
}
