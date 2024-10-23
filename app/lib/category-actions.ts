'use server';

import { z } from "zod";
import { apiFetchServer } from "./api";
import { Category } from "./definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CategoryFormState = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
  formData?: any | null;
};

const CategoryFormSchema = z.object({
  name: z.string({
    required_error: 'Por favor ingrese un nombre para el artículo.',
  }).min(1,{message: 'Por favor ingrese un nombre para el artículo.'}),
  categoryImages: z.array(z.instanceof(File)),
  imagesToRemove: z.string(),
});

export async function createOrUpdateCategory(prevState: CategoryFormState, formData: FormData) {
  const validatedFields = CategoryFormSchema.safeParse({
    name: formData.get('name'),
    categoryImages: formData.getAll('category-images'),
    imagesToRemove: formData.get('images-to-remove'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Hay campos faltantes, por favor revise.',
      formData: Object.fromEntries(formData.entries()),
    };
  }
  
  const { name, categoryImages, imagesToRemove } = validatedFields.data;

  try {
    const body = {
      name: name
    }

    const categoryId = formData.get('category_id'); //On add this will be null
    const method = categoryId ? 'PUT' : 'POST';
    const path = categoryId ? `category/${categoryId}` : 'category';
    
    const response = await apiFetchServer({method: method, path: path, body: JSON.stringify(body)});
    const responseJson: Category = await response.json();
    console.log("ADD CATEGORY RESPONSE", responseJson);

    if(categoryImages[0].name != 'undefined'){
      const mediaResponse = await uploadCategoryImage(responseJson.id, categoryImages);
      let mediaResponseJson: Category;
      if(mediaResponse){
        mediaResponseJson = await mediaResponse.json();
        console.log("ADD CATEGORY MEDIA RESPONSE", mediaResponseJson);
      } else {
        console.log("NO IMAGE TO UPLOAD OR INPUT NOT FOUND");
      }
    } else {
      console.log("NO IMAGES ADDED");
    }

    if(imagesToRemove.length != 0){
      await removeCategoryImages(responseJson.id, imagesToRemove);
    }

    console.log("NEW/UPDATE CATEGORY RESPONSE: " + categoryId, response);

    //TODO mostrar error del response
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Category.',
      formData: Object.fromEntries(formData.entries()),
    };
  }

  revalidatePath('/welcome/categories');
  redirect('/welcome/categories');
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

export async function deleteCategory(id: number) {
  try {
    const response = await apiFetchServer({method: 'DELETE', path: `category/${id}`, body: undefined });
    revalidatePath('/welcome/categories');
    return { message: 'Categoria eliminada.' };
  } catch (error) {
    return {
      message: 'Error al eliminar la categoria',
    };
  }
}