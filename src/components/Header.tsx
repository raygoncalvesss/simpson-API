'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'API Info', href: '/apiinfo' },
    { name: 'Personagens', href: '/characters' },
    { name: 'Criar Personagem', href: '/characters/create' },
  ];

  return (
    <header className="bg-yellow-400 shadow-lg border-b-4 border-yellow-500">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-800">
              🍩 Simpsons API
            </div>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-800 hover:bg-blue-100 hover:text-blue-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Menu mobile */}
          <div className="md:hidden">
            <details className="relative">
              <summary className="list-none cursor-pointer">
                <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                  <span className="w-4 h-0.5 bg-blue-800"></span>
                  <span className="w-4 h-0.5 bg-blue-800"></span>
                  <span className="w-4 h-0.5 bg-blue-800"></span>
                </div>
              </summary>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                      pathname === item.href
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;