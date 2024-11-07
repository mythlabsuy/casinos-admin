'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import DynamicHeroIcon from '../../../dynamic-hero-icon'
import { signOut } from "next-auth/react";
import MobileNavLinks from './mobile-nav-links'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'

interface props {
  topNavigation: any[],
//  bottomNavigation: any[],
  topNavTitle?: string,
  bottomNavTitle?: string,
  userName?: string
}

export default function MobileSideNav({ topNavigation, topNavTitle, bottomNavTitle, userName }: props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div>
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative flex w-full flex-1 transform transition duration-300 ease-in-out 
              data-[closed]:-translate-x-full">
              <TransitionChild>
                <div className="absolute right-0 top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                    <span className="sr-only">Close sidebar</span>
                    <DynamicHeroIcon icon='XMarkIcon' aria-hidden="true" className="h-6 w-6 text-white"/>
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow w-full flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                <div className="flex h-16 flex-col items-center border-b border-dotted">
                  <div className="flex h-16 items-center gap-x-4 px-6 py-3 text-sm 
                    font-semibold leading-6 text-white ">
                    <span aria-hidden="true">Bienvenido {userName}</span>
                  </div>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <MobileNavLinks 
                    topNavigation={topNavigation} 
                    //bottomNavigation={bottomNavigation} 
                    topNavTitle={topNavTitle} 
                    bottomNavTitle={bottomNavTitle}/>
                  </ul>
                </nav>
                <div className='flex grow'></div>
                <div className="flex space-x-2 md:flex-col md:space-x-0 md:space-y-2 mb-4">
                  <form  action={() => { signOut({ callbackUrl: "/login" }); }} className='w-full'>
                      <ul role="list" className="-mx-2">
                        <button className="w-full text-gray-400 hover:bg-gray-800 hover:text-white group flex gap-x-3 rounded-md p-2 
                          text-sm font-semibold leading-6">
                            <ArrowRightStartOnRectangleIcon className="h-6 w-6 shrink-0"/>
                            Cerrar sesión
                        </button>
                      </ul>
                  </form>
                </div>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-400 lg:hidden">
            <span className="sr-only">Open sidebar</span>
            <DynamicHeroIcon icon='Bars3Icon' aria-hidden="true" className="h-6 w-6"/>
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-white">Dashboard</div>
          <div className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800">
            <span aria-hidden="true">{userName}</span>
          </div>
        </div>
      </div>
    </>
  )
}
