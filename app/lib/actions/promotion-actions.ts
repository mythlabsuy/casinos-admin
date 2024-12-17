'use server';

import { z } from "zod";
import { apiFetchServer } from "../api";
import { Promotion } from "../definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DateTime } from "luxon";
import { cookies } from 'next/headers';

export type PromotionFormState = {
    errors?: {
        name?: string[];
        description?: string[];
        participationInstructions?: string[];
        ticketExtraData?: string[];
        frecuency?: string[];
        maximumParticipations?: string[];
        termsAndConditionsFile?: string[];
        firstPageFile?: string[];
        backgroundFile?: string[];
        startDate?: string[];
        endDate?: string[];
    };
    message?: string | null;
    formData?: any | null;
};

export type FormDataValues = {
    name: string;
    description: string;
    participationInstructions: string;
    ticketExtraData: string;
    startDate: string;
    endDate: string;
    onlyOnce: boolean;
    isActive: boolean;
    frecuency: string;
    maximumParticipations: string;
    firstPageFile: any | null;          // Required file
    backgroundFile: any | null;        // Required file
    termsAndConditionsFile: any | null;    // Added the missing terms and conditions file
}


const PromotionFormSchema = z.object({
    name: z.string().min(1, { message: 'Por favor ingrese un nombre.' }),
    description: z.string().min(1, { message: 'Por favor ingrese una descripción.' }),
    participationInstructions: z.string().min(1, { message: 'Por favor ingresa instrucciones.' }),
    ticketExtraData: z.string(),

    termsAndConditionsFile: z.instanceof(File),

    startDate: z.string().min(1, { message: 'Por favor ingresa la fecha de inicio.' }),

    endDate: z.string().min(1, { message: 'Por favor ingresa la fecha de fin.' }),

    onlyOnce: z.boolean(),

    isActive: z.boolean(),

    frecuency: z.string().min(1, { message: 'Por favor ingrese la frecuencia.' }),

    maximumParticipations: z.string(),

    firstPageFile: z.instanceof(File),

    backgroundFile: z.instanceof(File),
})
    .refine(data => {
        return !data.onlyOnce || data.frecuency === "0"; 
    }, {
        message: 'Si es de una sola vez, no puede haber frecuencia.',
        path: ['frecuency'],
    }).refine(data => {
        if (data.onlyOnce) return true; 
        const num = Number(data.maximumParticipations);
        return Number.isInteger(num) && num > 0;
    }, {
        message: 'El máximo de participaciones debe ser un número natural mayor a 0 cuando no es "solo una vez".',
        path: ['maximumParticipations'],
    }).refine(data => {
        return data.onlyOnce || data.frecuency !== "0"; 
    }, {
        message: 'Si no es de una sola vez, debe seleccionar una frecuencia.',
        path: ['frecuency'],
    });

export async function CreateOrUpdatePromotion(prevState: PromotionFormState, formData: FormData) {
    const cookieStore = await cookies();

    let selectedPremise = cookieStore.get('selectedPremise')?.value;

    const validatedFields = PromotionFormSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        participationInstructions: formData.get('participationInstructions'),
        ticketExtraData: formData.get('ticketExtraData'),
        termsAndConditionsFile: formData.get('termsAndConditionsFile') as File,
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        onlyOnce: formData.get('onlyOnce') === 'true',
        isActive: formData.get('isActive') === 'true',

        frecuency: formData.get('frecuency'),
        maximumParticipations: formData.get('maximumParticipations'),
        firstPageFile: formData.get('firstPageFile') as File,
        backgroundFile: formData.get('backgroundFile') as File,
    });
    if (!validatedFields.success) {
        return {
            ...prevState,
            message: null,
            errors: validatedFields.error.flatten().fieldErrors,
            formData: Object.fromEntries(formData.entries()),
        };
    }

    const { name, description, participationInstructions, ticketExtraData, maximumParticipations, isActive, termsAndConditionsFile, firstPageFile, backgroundFile, startDate, endDate, onlyOnce, frecuency } = validatedFields.data;

    try {

        const data: FormData = new FormData()
        data.append('name', name);
        data.append('is_active', String(isActive)); //boolean
        data.append('description', description);
        data.append('participation_instructions', participationInstructions);

        const startDateMontevideo = DateTime.fromISO(startDate, { zone: 'UTC' }).setZone('America/Montevideo');
        const endDateMontevideo = DateTime.fromISO(endDate, { zone: 'UTC' }).setZone('America/Montevideo');
        data.append('start_date', startDateMontevideo.toISO()!);
        data.append('end_date', endDateMontevideo.toISO()!);

        data.append('just_once', String(onlyOnce)); // boolean
        data.append('frequency', frecuency); //int
        data.append('maximum_participations', maximumParticipations); //integer
        data.append('ticket_extra_data', ticketExtraData);


        if (termsAndConditionsFile.size > 0) {
            data.append('terms_and_conditions', termsAndConditionsFile);
        }
        if (firstPageFile.size > 0) {
            data.append('welcome_background', firstPageFile);
        }
        if (backgroundFile.size > 0) {
            data.append('background', backgroundFile);
        }

        const promotionId = formData.get('promotion_id'); //On add this will be null
        const method = promotionId ? 'PUT' : 'POST';
        const path = promotionId ? `promotion/${promotionId}` : `promotion/${selectedPremise}`;

        const response = await apiFetchServer({ method: method, path: path, body: data, isForm: true, addPremisePath: false });
        const responseJson: Promotion = await response.data;
    } catch (error) {
        var errorText = 'Error inesperado';
        if (error instanceof Error) {
            errorText = error.message;
        }
        return {
            ...prevState,
            message: errorText, // Directly access 'error' or fallback
            formData: Object.fromEntries(formData.entries()),
        };
    }

    revalidatePath('/welcome/promotions');
    redirect('/welcome/promotions');
}

export async function softDeletePromotion(id: number) {
    try {
        const response = await apiFetchServer({ method: 'DELETE', path: `promotion/${id}`, body: undefined });
        revalidatePath('/welcome/promotion');
        return { message: 'Promocion borrada.' };
    } catch (error) {
        return {
            message: 'Error al borrar la promoción.',
        };
    }
}