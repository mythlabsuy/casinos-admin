'use server';

import { z } from "zod";
import { apiFetchServer } from "../api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type RoleFormState = {
    errors?: {
        name?: string[];
    };
    message?: string | null;
    formData?: any | null;
};

const optionSchema = z.object({
    id: z.string(),
    label: z.string(),
    selected: z.boolean(),
});
type Option = z.infer<typeof optionSchema>;

const RoleFormSchema = z.object({
    name: z.string({
    }).min(1, { message: 'Por favor ingresa un nombre' }),
    perms: z
        .string().transform((val) => JSON.parse(val)),
});

export async function CreateOrUpdateRole(prevState: RoleFormState, formData: FormData) {
    const roleId = formData.get('role_id');

    const validatedFields = RoleFormSchema.safeParse({
        name: formData.get('name'),
        perms: formData.get('perms'),
    });
    if (!validatedFields.success) {
        return {
            message: null,
            errors: validatedFields.error.flatten().fieldErrors,
            formData: Object.fromEntries(formData.entries()),
        };
    }

    const { name, perms } = validatedFields.data;

    try {
        const selectedPerms = perms
            .filter((item: Option) => item.selected)
            .map((item: Option) => parseInt(item.id, 10));
        let body;
        let query;

        if (roleId) {
            body = selectedPerms;
            query = new URLSearchParams({ name: name })
        } else {
            body = {
                name: name,
                perms: selectedPerms,
            }
        }

        const method = roleId ? 'PUT' : 'POST';
        const path = roleId ? `role/${roleId}` : 'role/';
        const response = await apiFetchServer({ method: method, query: query, path: path, body: JSON.stringify(body) });

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

    revalidatePath('/welcome/roles');
    redirect('/welcome/roles');
}

export async function disableRole(id: number) {
    try {
        const response = await apiFetchServer({ method: 'DELETE', path: `role/${id}`, body: undefined });
        revalidatePath('/welcome/roles');
        return { message: 'Rol deshabilidado.' };
    } catch (error) {
        return {
            message: 'Error al deshabilitar el rol.',
        };
    }
}