interface Props {
  id: string,
  text?: string,
  tooltip?: string,
  deleteAction: any,
  children: React.ReactNode
}

export function IconButton({id, text, tooltip, deleteAction, children}: Props) {
  return (
    <form action={deleteAction} className="inline-block">
      <button className="rounded-md border p-2 hover:bg-gray-100 relative group" name={`iconbtn_${id}`} id={`iconbtn_${id}`}>
        <span className="sr-only">{text}</span>
          {children}
          {tooltip && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm bg-gray-700 
              text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              {tooltip}
            </div>
          )}
      </button>
    </form>
  );
}