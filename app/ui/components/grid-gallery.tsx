import { MediaFiles } from "@/app/lib/definitions";
import Image from 'next/image'
import { Button } from "./button";

interface Props {
  mediaFiles?: MediaFiles[];
  removeCallback?: Function;
  removeIcon?: string;
  iconBgColor?: string;
  iconColor?: string;
}

export default function GridGallery({ mediaFiles, removeCallback, removeIcon='XMarkIcon', iconBgColor='bg-primary-base', iconColor='text-white' }: Props ) {

  return (
    <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {mediaFiles ? mediaFiles.map((file) => (
        <li key={file.path} className="relative">
          <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
            { removeCallback ? 
            <div className="flex w-full h-6 justify-end absolute">
              <Button onClickCallback={() => removeCallback(file.id)} className={iconBgColor} icon={removeIcon} iconColor={iconColor} />
            </div> 
            : null}
            <Image alt="" src={file.path} className="pointer-events-none object-contain" width={300} height={300}/>
          </div>
        </li>
      )) : null }
    </ul>
  )
}
