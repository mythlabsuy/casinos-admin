import DynamicHeroIcon from '../../dynamic-hero-icon';

interface Props {
  fileNames: string;
}

export default function FileChooserLabel({ fileNames }: Props) {
  return (
    <>
      <div className="flex flex-col items-center justify-center pb-6 pt-5">
        <DynamicHeroIcon
          icon="CloudArrowUpIcon"
          className="h-8 w-8 text-gray-500 dark:text-gray-400"
        />
        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click para subir</span> o arrastrar el
          archivo
        </p>
        {(() => {
          if (fileNames != '') {
            return (
              <>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Archivos seleccionados:
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
