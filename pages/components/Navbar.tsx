import React, { useState } from 'react';
import { DarkModeSwitch } from '@/pages/components/DarkModeSwitch';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { signIn, signOut, useSession } from 'next-auth/react';

import { useTranslation } from 'next-i18next';

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const { data: session, status } = useSession();
  const { t } = useTranslation('common');

  console.log('Session User Name: ' + JSON.stringify(session));
  console.log('Session User Status: ' + JSON.stringify(status));

  return (
    //   navbar goes here
    <nav className="bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* logo */}
            <div>
              <a href="/" className="flex items-center py-5 px-2 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-bold">Enjoydev.NET</span>
              </a>
            </div>
            {/* primary nav  */}
            <div className="hidden md:flex items-center space-x-1">
              <a href="#" className="py-5 px-3 text-gray-700 hover:text-gray-900">
                메뉴1
              </a>
              <a href="#" className="py-5 px-3 text-gray-700 hover:text-gray-900">
                메뉴2
              </a>
            </div>
          </div>
          {/* secondary nav */}
          {status === 'authenticated' ? (
            <div className="hidden md:flex items-center space-x-1">
              <div className="py-5 px-3 text-gray-700 hover:text-gray-900">{session.user?.name}</div>
              <button className="py-5 px-3" onClick={() => signOut()}>
                {t('Logout')}
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-1">
              <a href="/api/auth/signin" className="py-5 px-3">
                {t('Login')}
              </a>
              <a href="/signup" className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300">
                {t('Signup')}
              </a>
            </div>
          )}
          {/* mobile menu */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuToggle(!menuToggle)}>{menuToggle ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}</button>
          </div>
        </div>
      </div>

      {/* mobile menu items */}
      <div className={`${!menuToggle ? 'hidden' : ''} md:hidden`}>
        {status === 'authenticated' ? (
          <div>
            <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
              Menu1
            </a>
            <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
              Menu2
            </a>
            <button className="block py-2 px-4 text-sm hover:bg-gray-200" onClick={() => signOut()}>
            {t('Logout')}
            </button>
          </div>
        ) : (
          <div>
            <a href="/api/auth/signin" className="block py-2 px-4 text-sm hover:bg-gray-200">
              {t('Login')}
            </a>
            <a href="/signup" className="block py-2 px-4 text-sm hover:bg-gray-200">
            {t('Signup')}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
