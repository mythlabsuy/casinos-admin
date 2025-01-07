import { lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};
 
export default async function Page() {
  return (
    <main className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Bienvenido al administrador
        </h1>
      </div>
    </main>
  );
}