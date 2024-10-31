import LoginForm from '@/app/ui/login-form';
import React from 'react'
import Image from 'next/image';
 
export default function LoginPage() {
  return (
    <div className="grid grid-cols-2 grid-rows-1 gap-2" style={{ "height": "calc(100vh - 88px)" }}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600' alt={'Logo'} className="mx-auto h-10 w-auto" width={0} height={0} sizes='100vw'/>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-200">
            Inicio de sesión
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm/>
        </div>
      </div>
      <div className='overflow-hidden'>
        <Image src='https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1908&amp;q=80' 
          alt={'Login splash image'} className="h-full w-full object-fill object-center" width={0} height={0} sizes='100vw'/>
      </div>
    </div>
  )
}