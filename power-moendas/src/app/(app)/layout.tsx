'use client';
import { ReactNode, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Logo from '../../../public/image/PM.jpg';

export default function SidebarLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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
      {/* Header com botão de menu */}
      <header className='bg-white shadow-sm border-b border-gray-200 px-4 py-3'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-semibold text-gray-800'>Dashboard</h1>
          <button
            onClick={toggleSidebar}
            className='p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer'
          >
            <Menu className='w-6 h-6 text-gray-600' />
          </button>
        </div>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black opacity-50 z-40 transition-opacity '
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
      >
        <div className='flex flex-col h-full'>
          {/* Header do Sidebar */}
          <div className='flex items-center justify-between p-4 border-b border-gray-200'>
            <h2 className='text-lg font-semibold text-gray-800'>Menu</h2>
            <button
              onClick={toggleSidebar}
              className='p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer'
            >
              <X className='w-5 h-5 text-gray-600 cursor-pointer' />
            </button>
          </div>

          {/* Logo da Empresa */}
          <div className='p-6 border-b border-gray-200'>
            <div className='flex items-center justify-center'>
              <div className='rounded-xl flex items-center justify-center'>
                <Image
                  src={Logo}
                  alt='Logo G-Tech'
                  className='w-32 h-auto rounded-lg'
                />
              </div>
            </div>
          </div>

          {/* Conteúdo do Sidebar */}
          <div className='flex-1 p-4'>
            <nav className='space-y-2'>
              <a
                href='/dashboards'
                className='flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors'
              >
                <span>Dashboard</span>
              </a>
              {/* <a
                href='#'
                className='flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors'
              >
                <span>Usuários</span>
              </a>
              <a
                href='#'
                className='flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors'
              >
                <span>Configurações</span>
              </a> */}
            </nav>
          </div>

          {/* Footer com botão de logout */}
          <div className='p-4 border-t border-gray-200'>
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <main className='p-6'>{children}</main>
    </div>
  );
}
