'use server';

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { apiFetchServer } from "../api";
import { Participant } from "../definitions";

export type ParticipantFormState = {
  errors?: {
    full_name?: string[];
    document_number?: string[];
    email?: string[];
    phone_number?: string[];
  };
  message?: string | null;
  formData?: any | null;
};

const PremiseFormSchema = z.object({
  full_name: z.string({
    required_error: 'Por favor ingrese un nombre.',
  }).min(1, { message: 'Por favor ingrese un nombre.' }),
  document_number: z.string({
    required_error: 'Por favor ingrese un documento.',
  }).min(1, { message: 'Por favor ingrese un documento.' }),
  email: z.string({
    required_error: 'Por favor ingrese un email.',
  }).min(1, { message: 'Por favor ingrese un email.' }),
  phone_number: z.string({
    required_error: 'Por favor ingrese un número de teléfono.',
  }).min(1, { message: 'Por favor ingrese un número de teléfono.' }),
});

export async function CreateOrUpdateParticipant(prevState: ParticipantFormState, formData: FormData) {
  const validatedFields = PremiseFormSchema.safeParse({
    participant_id: formData.get('participant_id'),
    full_name: formData.get('full_name'),
    document_number: formData.get('document_number'),
    email: formData.get('email'),
    phone_number: formData.get('phone_number'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Hay campos faltantes, por favor revise.',
      formData: Object.fromEntries(formData.entries()),
    };
  }

  const { full_name, document_number, email, phone_number } = validatedFields.data;

  try {
    const body = {
      full_name: full_name,
      document_number: document_number,
      email: email,
      phone_number: phone_number,
      accepts_terms_of_service: true,
      accepts_privacy_policy: true,
      over_18: true
    }

    const participantId = formData.get('participant_id'); //On add this will be null
    const method = participantId ? 'PUT' : 'POST';
    const path = participantId ? `participant/${participantId}` : 'participant/';

    const response = await apiFetchServer({ method: method, path: path, body: JSON.stringify(body) });
    const responseJson: Participant = await response.json();
    console.log("ADD OR UPDATE PARTICIPANT RESPONSE", responseJson);

    console.log("NEW/UPDATE PARTICIPANT RESPONSE: " + participantId, response);

  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Participant.',
      formData: Object.fromEntries(formData.entries()),
    };
  }

  revalidatePath('/welcome/participants');
  redirect('/welcome/participants');
}

// export async function disableParticipant(id: number) {
//   try {
//     const response = await apiFetchServer({ method: 'DELETE', path: `premise/${id}`, body: undefined });
//     revalidatePath('/welcome/premises');
//     return { message: 'Local deshabilitado.' };
//   } catch (error) {
//     return {
//       message: 'Error al deshabilitar el local.',
//     };
//   }
// }