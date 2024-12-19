'use server';
import { ActionEnum, ModuleEnum } from '@/app/lib/enums/authActionModule';
import { userHasPermission } from '@/app/lib/utils/permissions/userHasPermissions';
import { auth } from '@/auth';
interface AuthWrapperProps {
  children: React.ReactNode;
  module: ModuleEnum;
  action: ActionEnum;
  fallbackComponent?: React.ReactNode | undefined;
}

const AuthWrapper = async ({
  children,
  module,
  action,
  fallbackComponent,
}: AuthWrapperProps) => {
  const session = await auth();
  const hasAccess = await userHasPermission(module, action, session);
  if (!hasAccess || !session) {
    return <> {fallbackComponent} </>;
  }

  // If session exists, render the children (wrapped component)
  return <>{children}</>;
};

export default AuthWrapper;
