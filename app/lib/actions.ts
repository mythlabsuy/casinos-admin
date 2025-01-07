'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { apiFetchServer } from './api';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/welcome/invoices');
  redirect('/welcome/invoices');
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
   
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Invoice.',
    };
  }
  revalidatePath('/welcome/invoices');
  redirect('/welcome/invoices');
}

export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/welcome/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Invoice.',
    };
  }
}

//HERMES
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    formData.append('redirectTo', '/welcome');
    formData.append('redirect', 'true');
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

const ArticleFormSchema = z.object({
  name: z.string({
    required_error: 'Por favor ingrese un nombre para el artículo.',
  }).min(1,{message: 'Por favor ingrese un nombre para el artículo.'}),
  categoryId: z.coerce.number({
    invalid_type_error: 'Por favor seleccione una categoría.',
  }),
  currency: z.string({
    invalid_type_error: 'Por favor seleccione una moneda.',
  }).min(1,{message: 'Por favor seleccione una moneda.'}),
  price: z.coerce
    .number()
    .gte(0, { message: 'Por favor ingrese un precio mayor o igual a $0.' })
    .min(1,{message: 'Por favor ingrese un precio.'}),
  currentStock: z.coerce
    .number()
    .gte(0, { message: 'Por favor ingrese un stock mayor o igual a $0.' })
    .min(1,{message: 'Por favor ingrese una cantidad.'}),
  internalCode: z.string(),
  // articleImages: z.instanceof(File),
  articleImages: z.array(z.instanceof(File)),
  imagesToRemove: z.string(),
});
// TODO Usar zod para validar los tipos de archivos, la cantidad y el tamaño de los archivos
// https://www.petermekhaeil.com/til/zod-validate-file/

export type ArticleFormState = {
  errors?: {
    name?: string[];
    categoryId?: string[];
    currency?: string[];
    price?: string[];
    currentStock?: string[];
    internalCode?: string[];
  };
  message?: string | null;
  formData?: any | null;
};

async function uploadArticleImages(articleId: number, file: File[]){
  
  const formData = new FormData();
  for (let index = 0; index < file.length; index++) {
    const element = file[index];
    formData.append('files', element);
  }

  return await apiFetchServer({method: 'POST', path: `article/${articleId}/upload-file`, body: formData, isFileUpload: true});
}

async function removeArticleImages(articleId: number, imagesToRemove: string){
    let imagesToRemoveArr = imagesToRemove.split(',');
    //TODO return responses from image removal
    for (let index = 0; index < imagesToRemoveArr.length; index++) {
      const element = imagesToRemoveArr[index];
      const imageRemoveResponse = await apiFetchServer({ method: 'DELETE', path: `article/${articleId}/delete-file/${element}`});
    }
}

export async function deleteArticle(id: number) {
  try {
    const response = await apiFetchServer({method: 'DELETE', path: `article/${id}`, body: undefined });
    revalidatePath('/welcome/articles');
    return { message: 'Articulo eliminado.' };
  } catch (error) {
    return {
      message: 'Error al aliminar el artículo',
    };
  }
} 