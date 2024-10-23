import React from "react";

interface Props {
  titles: string[],
  withActions?: boolean,
  children: React.ReactNode | React.ReactNode[]
}

export default function Table({titles, children, withActions = true} : Props) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-100 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr key="table-titles">
                {titles.map((title: string, index: number) => (
                  <th scope="col" className="px-6 py-5 font-medium" key={`title-${index}`}>
                    {title}
                  </th>
                ))}
                { withActions ? <th scope="col" className="px-3 py-5 font-medium" key="actions">
                  <span className="sr-only">Edit</span>
                </th> : null}
              </tr>
            </thead>
            <tbody className="bg-white">
              {children}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
