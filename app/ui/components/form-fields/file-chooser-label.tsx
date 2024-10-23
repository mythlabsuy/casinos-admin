import DynamicHeroIcon from "../../dynamic-hero-icon";

interface Props {
  fileNames: string;
}

export default function FileChooserLabel({ fileNames }: Props ) {
  return (
    <> 
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <DynamicHeroIcon icon='CloudArrowUpIcon' className='w-8 h-8 text-gray-500 dark:text-gray-400'/>
        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click para subir</span> o arrastrar el archivo</p>
        {(() => {
          if(fileNames != ""){
            return (
              <>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Archivos seleccionados:<br/>
                  {fileNames}</p>
              </>
            )
          } else {
            return (<p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>)
          }
        })()}
      </div>
    </>
  );
}
