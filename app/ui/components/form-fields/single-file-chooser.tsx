'use client';

import { MediaFile } from '@/app/lib/definitions';
import { useEffect, useState } from 'react';
import Modal, { ModalType } from '../modal';
import GridGallery from '../grid-gallery';
import FileChooserLabel from './file-chooser-label';
import {
  ALLOWED_IMAGE_TYPES,
  MAX_ALLOWED_FILES_AMOUNT,
  MAX_IMAGE_SIZE_IN_BYTES_ALLOWED,
} from '@/app/lib/constants';

interface Props {
  id: string;
  name?: string;
  removeMediaCallback: Function;
  allowedFileTypes?: string[];
  maxFileSizeBytes?: number;
  maxFilesAmount?: number;
  mediaFile?: MediaFile | File;
  errors?: string[];
  required?: boolean,
  fileTypes?: string;
  fileSize?: string;
  fileWeight?: string;
}

export default function SingleFileChooser({
  id,
  allowedFileTypes = ALLOWED_IMAGE_TYPES,
  fileTypes='', 
  fileSize='', 
  fileWeight='',
  maxFileSizeBytes = MAX_IMAGE_SIZE_IN_BYTES_ALLOWED,
  maxFilesAmount = MAX_ALLOWED_FILES_AMOUNT,
  name,
  mediaFile,
  errors,
  required = false,
}: Props) {
  const [fileNames, setFileNames] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>('');

      // If mediaFile is present, decide how to display it
      useEffect(() => {
        if (mediaFile) {
          if ('path' in mediaFile) {
            setFileNames(mediaFile.name || '');
          } else {
            // If mediaFile is a File, show the file's name
            setFileNames(mediaFile.name);
          }
        }
      }, [mediaFile]);

  const handleFileInput = (e: { target: HTMLInputElement }) => {
    if (e.target && e.target.files) {
      let fileNames = '';
      let files: FileList = e.target.files;
      if (files.length > maxFilesAmount) {
        setModalOpen(true);
        setModalText(
          `Demasiada cantidad de archivos. Máximo permitido de ${maxFilesAmount}`,
        );
        return;
      }
      for (let index = 0; index < files.length; index++) {
        const element: File = files[index];
        fileNames += `${element.name}, `;
        if (!allowedFileTypes.find((f) => f == element.type)) {
          e.target.value = '';
          fileNames = '';
          setModalOpen(true);
          setModalText('Tipo de archivo no permitido.');
          return;
        }
        if (element.size >= maxFileSizeBytes) {
          e.target.value = '';
          fileNames = '';
          setModalOpen(true);
          setModalText(
            'Archivo demasiado grande. Peso máximo permitido ' + fileSize,
          );
          return;
        }
      }
      setFileNames(fileNames);
    }
  };
  return (
    <>
      <Modal
        open={modalOpen}
        setOpen={setModalOpen}
        onConfirm={() => {
          setModalOpen(false);
        }}
        confirmText="Cerrar"
        type={ModalType.Warn}
        hideCancelBtn={true}
        icon="ExclamationTriangleIcon"
        title="Error al incluir archivo"
        text={modalText}
      />

      <div className="flex items-center justify-center sm:col-span-12 relative w-full">
        <label
          htmlFor={id}
          className="dark:hover:bg-bray-800 flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-50 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <FileChooserLabel fileNames={fileNames} fileTypes={fileTypes} fileSize={fileSize} fileWeight={fileWeight}/>
          <input
            id={id}
            name={name ? name : id}
            type="file"
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileInput}
            required={required}
          />
        </label>
      </div>
      <div id={`${id}-error`} aria-live="polite" aria-atomic="true">
        {errors &&
          errors.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </>
  );
}
