'use server';

import { z } from "zod";
import { apiFetchServer } from "./api";
import { Promotion } from "./definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
    firstPageFile: File;          // Required file
    backgroundFile: File;        // Required file
    termsAndConditionsFile: File;    // Added the missing terms and conditions file
}


const PromotionFormSchema = z.object({
    name: z.string().min(1, { message: 'Por favor ingrese un nombre.' }),
    description: z.string().min(1, { message: 'Por favor ingrese una descripción.' }),
    participationInstructions: z.string().min(1, { message: 'Por favor ingresa instrucciones.' }),
    ticketExtraData: z.string().min(1, { message: 'Por favor ingrese datos para el ticket.' }),

    termsAndConditionsFile: z.instanceof(File).refine(file => file !== null && file.size > 0, {
        message: 'Por favor sube el archivo de términos y condiciones.'
    }),

    startDate: z.string()
        .min(1, { message: 'Por favor ingrese una fecha de inicio.' })
        .refine(date => !isNaN(Date.parse(date)), { message: 'Fecha de inicio inválida.' }),

    endDate: z.string()
        .min(1, { message: 'Por favor ingrese una fecha de fin.' })
        .refine(date => !isNaN(Date.parse(date)), { message: 'Fecha de fin inválida.' }),

    onlyOnce: z.boolean(),

    isActive: z.boolean(),

    frecuency: z.string().min(1, { message: 'Por favor ingrese la frecuencia.' }),

    maximumParticipations: z.string()
        .min(1, { message: 'Por favor ingrese el máximo de participaciones.' })
        .refine(value => {
            const num = Number(value);
            return Number.isInteger(num) && num > 0; // Validate natural number greater than 0
        }, { message: 'El máximo de participaciones debe ser un número natural mayor a 0.' }),

    firstPageFile: z.instanceof(File).refine(file => file !== null && file.size > 0, {
        message: 'Por favor sube el archivo de la primera página.'
    }),

    backgroundFile: z.instanceof(File).refine(file => file !== null && file.size > 0, {
        message: 'Por favor sube el archivo de fondo.'
    }),
})
    .refine(data => {
        // Check if startDate is before or equal to endDate
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);
        return startDate <= endDate;
    }, {
        message: 'La fecha de inicio no puede ser mayor a la fecha de fin.',
        path: ['startDate'], // Optional, specify the path for the error message
    })
    .refine(data => {
        // Validate `frecuency` when `onlyOnce` is true
        return !data.onlyOnce || data.frecuency === "0"; // Or the "SIN SELECCIONAR" value
    }, {
        message: 'Si es de una sola vez, no puede haber frecuencia.',
        path: ['frecuency'],
    });

export async function CreateOrUpdatePromotion(prevState: PromotionFormState, formData: FormData) {
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
        data.append('terms_and_conditions', termsAndConditionsFile);
        data.append('welcome_background', firstPageFile);
        data.append('background', backgroundFile);
        data.append('name', name);
        data.append('is_active', String(isActive)); //boolean
        data.append('description', description);
        data.append('participation_instructions', participationInstructions);
        data.append('start_date', startDate);
        data.append('end_date', endDate);
        data.append('just_once', String(onlyOnce)); // boolean
        data.append('frequency', frecuency); //int
        data.append('maximum_participations', maximumParticipations); //integer
        data.append('ticket_extra_data', ticketExtraData);

        const promotionId = formData.get('promotion_id'); //On add this will be null
        const method = promotionId ? 'PUT' : 'POST';
        const path = promotionId ? `promotion/${promotionId}` : 'promotion/';

        const response = await apiFetchServer({ method: method, path: path, body: data, isForm: true, addPremisePath: true });
        const responseJson: Promotion = await response.json();

        console.log("ADD OR UPDATE PROMOTION RESPONSE", responseJson);
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
    redirect('/welcome/promotions/create');
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