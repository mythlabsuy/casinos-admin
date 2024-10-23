import { ButtonLink } from "./button-link";

interface Props {
  text: string,
  children?: React.ReactNode
}

export default async function TableCell({text, children} : Props) {
  return (
    <td className="whitespace-nowrap px-3 py-3">
      {text}
      {children}
    </td>
  );
}
