import { ModuleEnum, ActionEnum } from '@/app/lib/enums/authActionModule';
import AuthWrapper from '@/components/authWrapper';
import { ButtonLink } from './button-link';

interface Props {
  path: string;
  id: number;
  children?: React.ReactNode;
  module: ModuleEnum;
  removeEditButton?: boolean;
  className?: string;
}

export default async function TableActionsCell({
  id,
  path,
  children,
  module,
  removeEditButton,
  className
}: Props) {
  return (
    <td className={`whitespace-nowrap py-3 pl-6 pr-3 ${className}`}>
      <div className="flex justify-end gap-3">
        <AuthWrapper module={module} action={ActionEnum.UPDATE}>
        {removeEditButton ? null : (
          <ButtonLink
            href={`${path}/${id}/edit`}
            icon="PencilIcon"
            className="rounded-md border p-2 hover:bg-gray-100"
          />
        )}
        </AuthWrapper>
        {children}
      </div>
    </td>
  );
}
