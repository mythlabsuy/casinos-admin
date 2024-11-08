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
  }).min(1, { message: 'Por favor ingrese un nombre para el local.' }),
  logoImage: z.instanceof(File),
  privacyImage: z.instanceof(File),
});

export async function CreateOrUpdatePremise(prevState: PremiseFormState, formData: FormData) {
  const validatedFields = PremiseFormSchema.safeParse({
    name: formData.get('name'),
    logoImage: formData.get('premise-logo-image'),
    privacyImage: formData.get('premise-privacy-image'),
  });
  var n = formData.get('name')
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      formData: Object.fromEntries(formData.entries()),
    };
  }

  const { name, logoImage, privacyImage } = validatedFields.data;

  try {
    const premiseId = formData.get('premise_id'); //On add this will be null
    const method = premiseId ? 'PUT' : 'POST';
    const path = premiseId ? `premise/${premiseId}` : 'premise/';

    const data: FormData = new FormData()
    data.append('name', name);

    if (logoImage.size > 0) {
      data.append('logo', logoImage);
    }

    if (privacyImage.size > 0) {
      data.append('privacy_policy', privacyImage);
    }

    // Log the FormData content for debugging
    for (const [key, value] of data.entries()) {
      console.log(key, value);
    }



    const response = await apiFetchServer({ method: method, path: path, body: data, isForm: true });
    const responseJson: Premise = await response.json();
    console.log("ADD OR UPDATE PREMISE RESPONSE", responseJson);



    console.log("NEW/UPDATE PREMISE RESPONSE: " + premiseId, response);

  } catch (error) {
    var errorText = 'Error inesperado';
    if (error instanceof Error) {
      errorText = error.message;
    }
    return {
      message: errorText, // Directly access 'error' or fallback
      formData: Object.fromEntries(formData.entries()),
    };
  }

  revalidatePath('/welcome/premises');
  redirect('/welcome/premises');
}

async function uploadCategoryImage(categoryId: number, file: File[]) {

  const formData = new FormData();
  for (let index = 0; index < file.length; index++) {
    const element = file[index];
    formData.append('files', element);
  }

  return await apiFetchServer({ method: 'POST', path: `category/${categoryId}/upload-file`, body: formData, isFileUpload: true });
}

async function removeCategoryImages(categoryId: number, imagesToRemove: string) {
  let imagesToRemoveArr = imagesToRemove.split(',');
  //TODO return responses from image removal
  for (let index = 0; index < imagesToRemoveArr.length; index++) {
    const imageRemoveResponse = await apiFetchServer({ method: 'DELETE', path: `category/${categoryId}/delete-file/` });
    console.log("IMAGE REMOVED: ", imageRemoveResponse.json());
  }
}

export async function disablePremise(id: number) {
  try {
    const response = await apiFetchServer({ method: 'DELETE', path: `premise/${id}`, body: undefined });
    revalidatePath('/welcome/premises');
    return { message: 'Local deshabilitado.' };
  } catch (error) {
    return {
      message: 'Error al deshabilitar el local.',
    };
  }
}