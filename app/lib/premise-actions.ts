'use server';

import { z } from "zod";
import { apiFetchServer } from "./api";
import { Premise } from "./definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type PremiseFormState = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
  formData?: any | null;
};

const PremiseFormSchema = z.object({ 
  name: z.string({
    required_error: 'Por favor ingrese un nombre para el local.',
  }).min(1,{message: 'Por favor ingrese un nombre para el local.'}),
  // logoImages: z.array(z.instanceof(File)),
  // privacyImages: z.array(z.instanceof(File)),
  // imagesToRemove: z.string(),
});

export async function CreateOrUpdatePremise(prevState: PremiseFormState, formData: FormData) {
  const validatedFields = PremiseFormSchema.safeParse({
    //TODO ADD DISABLE
    name: formData.get('name'),
    // logoImages: formData.getAll('logo-images'),
    // privacyImages: formData.getAll('privacy-images'),
    // imagesToRemove: formData.get('images-to-remove'),
  });
  var n = formData.get('name')
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Hay campos faltantes, por favor revise.',
      formData: Object.fromEntries(formData.entries()),
    };
  }
  
  const { name, } = validatedFields.data;

  try {
    const body = {
    //TODO ADD DISABLE
      name: name
    }

    const premiseId = formData.get('premise_id'); //On add this will be null
    const method = premiseId ? 'PUT' : 'POST';
    const path = premiseId ? `premise/${premiseId}` : 'premise';
    const query = new URLSearchParams({ name: name })
    const response = await apiFetchServer({method: method, path: path, body: undefined, query: query});
    const responseJson: Premise = await response.json();
    console.log("ADD OR UPDATE PREMISE RESPONSE", responseJson);

    // if(logoImages[0].name != 'undefined'){
    //   const mediaResponse = await uploadCategoryImage(responseJson.id, categoryImages);
    //   let mediaResponseJson: Category;
    //   if(mediaResponse){
    //     mediaResponseJson = await mediaResponse.json();
    //     console.log("ADD CATEGORY MEDIA RESPONSE", mediaResponseJson);
    //   } else {
    //     console.log("NO IMAGE TO UPLOAD OR INPUT NOT FOUND");
    //   }
    // } else {
    //   console.log("NO IMAGES ADDED");
    // }

    // if(imagesToRemove.length != 0){
    //   await removeCategoryImages(responseJson.id, imagesToRemove);
    // }

    console.log("NEW/UPDATE CATEGORY RESPONSE: " + premiseId, response);

    //TODO mostrar error del response
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Category.',
      formData: Object.fromEntries(formData.entries()),
    };
  }

  revalidatePath('/welcome/premises');
  redirect('/welcome/premises');
}

async function uploadCategoryImage(categoryId: number, file: File[]){
  
  const formData = new FormData();
  for (let index = 0; index < file.length; index++) {
    const element = file[index];
    formData.append('files', element);
  }

  return await apiFetchServer({method: 'POST', path: `category/${categoryId}/upload-file`, body: formData, isFileUpload: true});
}

async function removeCategoryImages(categoryId: number, imagesToRemove: string){
  let imagesToRemoveArr = imagesToRemove.split(',');
  //TODO return responses from image removal
  for (let index = 0; index < imagesToRemoveArr.length; index++) {
    const imageRemoveResponse = await apiFetchServer({ method: 'DELETE', path: `category/${categoryId}/delete-file/`});
    console.log("IMAGE REMOVED: ", imageRemoveResponse.json());
  }
}

export async function disablePremise(id: number) {
  try {
    const response = await apiFetchServer({method: 'DELETE', path: `premise/${id}`, body: undefined });
    revalidatePath('/welcome/premises');
    return { message: 'Local deshabilitado.' };
  } catch (error) {
    return {
      message: 'Error al deshabilitar el local.',
    };
  }
}