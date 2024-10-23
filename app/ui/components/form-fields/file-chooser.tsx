'use client';

import { MediaFiles } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import Modal, { ModalType } from "../modal";
import GridGallery from "../grid-gallery";
import FileChooserLabel from "./file-chooser-label";
import { ALLOWED_IMAGE_TYPES, MAX_ALLOWED_FILES_AMOUNT, MAX_IMAGE_SIZE_IN_BYTES_ALLOWED } from "@/app/lib/constants";

interface Props {
  id: string;
  name?: string;
  removeMediaCallback: Function;
  allowedFileTypes?: string[];
  maxFileSizeBytes?: number;
  maxFilesAmount?: number;
  mediaFiles?: MediaFiles[];
}

export default function FileChooser({ id, allowedFileTypes = ALLOWED_IMAGE_TYPES, removeMediaCallback , maxFileSizeBytes = MAX_IMAGE_SIZE_IN_BYTES_ALLOWED, maxFilesAmount = MAX_ALLOWED_FILES_AMOUNT, mediaFiles = [], name }: Props ) {
  const [fileNames, setFileNames] = useState<string>("");
  const [formMediaFiles, setFormMediaFiles] = useState<MediaFiles[] | undefined>(mediaFiles.filter(mf => !mf.disabled));

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>('');
  
  const handleFileInput = (e: { target: HTMLInputElement; }) => {
    if(e.target && e.target.files){
      let fileNames = '';
      let files: FileList = e.target.files;
      if(files.length > maxFilesAmount){
        setModalOpen(true);
        setModalText(`Demasiada cantidad de archivos. Máximo permitido de ${maxFilesAmount}`);
        return;
      }
      for (let index = 0; index < files.length; index++) {
        const element: File = files[index];
        fileNames += `${element.name}, `;
        if(!allowedFileTypes.find(f => f == element.type)){
          e.target.value = ''
          fileNames = ''
          setModalOpen(true);
          setModalText('Tipo de archivo no permitido.');
          return;
        }
        if(element.size >= maxFileSizeBytes){
          e.target.value = ''
          fileNames = ''
          setModalOpen(true);
          setModalText('Archivo demasiado grande. Peso máximo permitido 1.5 MB');
          return;
        }
      }
      setFileNames(fileNames);
    }
  }

  // setFormMediaFiles(mediaFiles.filter(mf => !mf.disabled));
  // useEffect(() => {
  // }, [mediaFiles]);
  
  function confirmRemoveMediaFile(mediaId: number){
    //TODO add confirm dialog
    removeMediaCallback(mediaId);

    setFormMediaFiles((prevFiles) => {
      if (!prevFiles) return prevFiles; // If the array is undefined, return it as is.
      let newFilesList = prevFiles.filter((file) => file.id != mediaId);
      return newFilesList;
    });
  }

  return (
    <>
      <Modal open={modalOpen} setOpen={setModalOpen} 
        onConfirm={() => {setModalOpen(false)}}
        confirmText='Cerrar'
        type={ModalType.Warn}
        hideCancelBtn = {true}
        icon = 'ExclamationTriangleIcon'
        title='Error al incluir archivo' 
        text={modalText}/>
      
        <div className="flex items-center justify-center sm:col-span-12">
          <label htmlFor={id} className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 
            border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 
            dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <FileChooserLabel fileNames={fileNames}/>
            <input id={id} name={ name ? name : id } type="file" className="hidden" onChange={handleFileInput} multiple/>
          </label>
        </div> 

        <div className="flex items-center justify-center sm:col-span-12">
          <div className="w-full py-8 relative">
            <GridGallery mediaFiles={ formMediaFiles } removeCallback={confirmRemoveMediaFile} removeIcon="TrashIcon" iconBgColor="bg-gray-200" iconColor="text-red-700"/>
          </div>
        </div>
    </>
  );
}
