'use client';

import React from 'react';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';

export default function LogoutBtn() {
  return (
    <form id='main-navbar-logout' action={() => { signOut({ callbackUrl: "/login" }); }}>
      <ul role="list" className="-mx-2 space-y-1">
        <button type='submit' className="w-full text-gray-400 hover:bg-gray-800 hover:text-white group flex gap-x-3 rounded-md p-2 
          text-sm font-semibold leading-6">
            <ArrowRightStartOnRectangleIcon className="h-6 w-6 shrink-0"/>
            Cerrar sesión
        </button>
      </ul>
    </form>
  );
}

