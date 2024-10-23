import { ButtonLink } from "./button-link";

interface Props {
  path: string
  id: number
  children?: React.ReactNode
}

export default async function TableActionsCell({id, path, children} : Props) {
  return (
    <td className="whitespace-nowrap py-3 pl-6 pr-3">
      <div className="flex justify-end gap-3">
        <ButtonLink href={`${path}/${id}/edit`} icon='PencilIcon' className='rounded-md border p-2 hover:bg-gray-100'/>
        {children}
      </div>
    </td>
  );
}
