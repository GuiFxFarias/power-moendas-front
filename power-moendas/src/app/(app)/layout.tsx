'use client';
import { ReactNode, useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Logo from '../../../public/image/PM.jpg';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

export default function SidebarLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const LogoutButton = ({ className = '' }) => (
    <Button
      variant='destructive'
      className={`w-full ${className}`}
      onClick={async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
          method: 'POST',
          credentials: 'include',
        });
        sessionStorage.clear();
        window.location.href = '/';
      }}
    >
      Logout
    </Button>
  );

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Fixed Top Navbar */}
      <header className='fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-50'>
        <div className='w-full px-4 py-3 flex items-center justify-between'>
          <h1 className='text-xl font-semibold text-gray-800'>
            PPCP{' '}
            <span className='max-md:hidden'>
              - Planejamento Programação Controle Produção
            </span>
          </h1>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className='p-2 rounded-lg hover:bg-gray-100 transition-colors'
                aria-label='Open menu'
              >
                <Menu className='w-6 h-6 text-gray-700' />
              </button>
            </SheetTrigger>

            {/* Right drawer; Radix handles overlay, ESC close, focus, and scroll lock */}
            <SheetContent side='right' className='w-80 p-0'>
              <SheetHeader className='p-4 border-b'>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              {/* Logo */}
              <div className='p-6 border-b'>
                <div className='flex items-center justify-center'>
                  <Image
                    src={Logo}
                    alt='Logo G-Tech'
                    className='w-32 h-auto rounded-lg'
                  />
                </div>
              </div>

              {/* Nav */}
              <nav className='p-4 space-y-2'>
                <SheetClose asChild>
                  <a
                    href='/dashboards'
                    className='block px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700'
                  >
                    Dashboard
                  </a>
                </SheetClose>
                {/* Add more links here */}
              </nav>

              {/* Footer */}
              <div className='p-4 border-t mt-auto'>
                <LogoutButton />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Page content (offset for fixed navbar height ~64px) */}
      <main className='pt-16 p-6'>{children}</main>
    </div>
  );
}
