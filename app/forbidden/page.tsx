import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

 
export default function Forbidden() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="flex items-center mb-6">
        <ExclamationCircleIcon className="w-16 h-16 text-red-600 mr-4" />
        <h1 className="text-4xl">¡Acceso Denegado!</h1>
      </div>
      <p className="text-xl">
        No tienes los permisos necesarios para ver este recurso.
      </p>
    </div>
  );
}