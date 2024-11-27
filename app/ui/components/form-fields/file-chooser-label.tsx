import DynamicHeroIcon from '../../dynamic-hero-icon';

interface Props {
  fileNames: string;
  fileTypes: string;
  fileSize: string;
  fileWeight: string;
}

export default function FileChooserLabel({ fileNames, fileTypes, fileSize, fileWeight }: Props) {
  return (
    <>
      <div className="flex flex-col pb-6 pt-5">
        <div className='flex items-center justify-center'>
          <DynamicHeroIcon
            icon="CloudArrowUpIcon"
            className="h-8 w-8 text-gray-500 dark:text-gray-400"
          />
        </div>
        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click para subir</span> o arrastrar el
          archivo
          {(() => {
            if (fileTypes && fileTypes != '') {
              return <>
                <br/>
                <span className="font-semibold">Tipos de archivo soportados: </span>{fileTypes}
              </>
            }
            return null;
          })()}
          {(() => {
            if (fileSize && fileSize != '') {
              return <>
                <br/>
                <span className="font-semibold">Relación de aspecto: </span>{fileSize}
              </>
            }
            return null;
          })()}
          {(() => {
            if (fileWeight && fileWeight != '') {
              return <>
                <br/>
                <span className="font-semibold">Peso máximo: </span>{fileWeight}
              </>
            }
            return null;
          })()}
        </p>
        {(() => {
          if (fileNames != '') {
            return (
              <>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  { fileNames?.split(',').length > 2 ? <span>Archivos seleccionados:</span> : <span>Archivo seleccionado: </span> }
                  <br />
                  {fileNames}
                </p>
              </>
            );
          } else {
            return <></>;
          }
        })()}
      </div>
    </>
  );
}
