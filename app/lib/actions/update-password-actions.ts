'use server';

import { z } from "zod";
import { apiFetchServer } from "../api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";

export type UpdatePasswordFormState = {
    errors?: {
        currentPassword?: string[];
        newPassword?: string[];
        repeatNewPassword?: string[];

    };
    message?: string | null;
    formData?: any | null;
};

const UpdatePasswordFormSchema = z.object({
    currentPassword: z.string({
    }).min(1, { message: 'Por favor ingrese la contraseña actual' }),
    newPassword: z.string({
    }).min(1, { message: 'Por favor ingrese la nueva contraseña' }),
    repeatNewPassword: z.string({
    }).min(1, { message: 'Por favor repita la nueva contraseña' }),
}).superRefine((data, ctx) => {
    if (data.newPassword !== data.repeatNewPassword) {
        ctx.addIssue({
            code: "custom",
            path: ["newPassword"],
            message: "Las contraseñas no coinciden",
        });
        ctx.addIssue({
            code: "custom",
            path: ["repeatNewPassword"],
            message: "Las contraseñas no coinciden",
        });
    }
});

export async function UpdatePassword(prevState: UpdatePasswordFormState, formData: FormData) {
    const validatedFields = UpdatePasswordFormSchema.safeParse({
        currentPassword: formData.get('currentPassword'),
        newPassword: formData.get('newPassword'),
        repeatNewPassword: formData.get('repeatNewPassword'),
    });
    if (!validatedFields.success) {
        return {
            message: null,
            errors: validatedFields.error.flatten().fieldErrors,
            formData: Object.fromEntries(formData.entries()),
        };
    }

    const { currentPassword, newPassword } = validatedFields.data;
    let success = false;
    try {
        const data: FormData = new FormData()
        data.append('previous_password', currentPassword);
        data.append('new_password', newPassword);

        const method = 'PUT';
        const path = 'user/update-password';
        const response = await apiFetchServer({ method: method, path: path, body: data, isForm: true });
        if (response) {
            success = true;
        }

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
    if (success) {
        await signOut({})
    }
    return { result: "OK" };
}