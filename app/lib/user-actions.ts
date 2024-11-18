'use server';

import { z } from "zod";
import { apiFetchServer } from "./api";
import { Premise } from "./definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type UserFormState = {
    errors?: {
        username?: string[];
        password?: string[];
        email?: string[];
        role?: string[];
        premises?: string[];
    };
    message?: string | null;
    formData?: any | null;
};

const optionSchema = z.object({
    label: z.string(),
    value: z.string(),
});
type Option = z.infer<typeof optionSchema>;

const UserFormSchema = z.object({
    username: z.string({
    }).min(1, { message: 'Por favor ingrese el nombre de usuario.' }),
    password: z.string({
    }),
    email: z.string().email({
    }).min(1, { message: 'Por favor ingrese el correo' }),
    role: z.string(),
    premises: z
        .string()
        .min(1, { message: 'Por favor seleccione al menos un local.' })
        .refine((val) => {
            try {
                const parsed = JSON.parse(val);
                return Array.isArray(parsed) && parsed.length > 0 && parsed.every((item) => optionSchema.safeParse(item).success);
            } catch {
                return false;
            }
        }, { message: 'Por favor seleccione al menos un local válido.' }).transform((val) => JSON.parse(val)),
});

export async function CreateOrUpdateUser(prevState: UserFormState, formData: FormData) {
    const userId = formData.get('user_id');
    let schema = UserFormSchema;
    if (!userId) {
        // If user_id is null, make password required and non-empty
        schema = schema.extend({
            password: z.string().min(1, { message: 'Por favor ingrese la contraseña.' }),
        });
    }

    const validatedFields = schema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
        email: formData.get('email'),
        premises: formData.get('premises'),
        role: formData.get('role'),
    });
    if (!validatedFields.success) {
        return {
            message: null,
            errors: validatedFields.error.flatten().fieldErrors,
            formData: Object.fromEntries(formData.entries()),
        };
    }

    const { username, password, email, role, premises } = validatedFields.data;

    try {
        const transformedPremises = premises.map((item: Option) => parseInt(item.value, 10));

        const body = {
            username: username,
            password: password,
            email: email,
            role_id: role,
            premises: transformedPremises,

        }
        const method = userId ? 'PUT' : 'POST';
        const path = userId ? `user/${userId}` : 'auth/register/';
        const response = await apiFetchServer({ method: method, path: path, body: JSON.stringify(body) });

    } catch (error) {
        var errorText = 'Error inesperado';
        if (error instanceof Error) {
            errorText = error.message;
        }
        return {
            message: errorText,
            formData: Object.fromEntries(formData.entries()),
        };
    }

    revalidatePath('/welcome/users');
    redirect('/welcome/users');
}

export async function disableUser(id: number) {
    try {
        const response = await apiFetchServer({ method: 'DELETE', path: `user/${id}`, body: undefined });
        revalidatePath('/welcome/users');
        return { message: 'Usuario deshabilidado.' };
    } catch (error) {
        return {
            message: 'Error al deshabilitar el usuario.',
        };
    }
}