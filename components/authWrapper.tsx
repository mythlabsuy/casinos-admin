'use server'
import { ActionEnum, ModuleEnum } from '@/app/lib/enums/authActionModule';
import { userHasPermission } from '@/app/lib/utils/permissions/userHasPermissions';
import { auth } from '@/auth';
import { GetServerSideProps } from 'next';
interface AuthWrapperProps {
  children: React.ReactNode;
  module: ModuleEnum;
  action: ActionEnum;
}

const AuthWrapper = async ({  children, module, action }: AuthWrapperProps) => {
  const session = await auth();
  const hasAccess = await userHasPermission(module, action, session);
  if(!hasAccess || !session){
    return null;
  }

  // If session exists, render the children (wrapped component)
  return <>{children}</>;
};


export default AuthWrapper;