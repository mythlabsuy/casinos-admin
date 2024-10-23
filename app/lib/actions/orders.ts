'use server';

import { z } from "zod";
import { apiFetchServer } from "../api";
import { Order } from "../definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type OrderFormState = {
  errors?: {
    delivery_address?: string[];
    billing_address?: string[];
    phone_number?: string[];
    status?: string[];
    is_pickup?: string[];
    clientId?: string[];
  };
  message?: string | null;
  formData?: any | null;
};

const OrderFormSchema = z.object({
  delivery_address: z.string().nullish(),
  clientId: z.coerce.number({
    invalid_type_error: 'Por favor seleccione un cliente.',
  }),
  billing_address: z.string({
    required_error: 'Por favor ingrese una dirección.',
  }).min(1,{message: 'Por favor ingrese una dirección.'}),
  phone_number: z.string({
    required_error: 'Por favor ingrese un número de teléfono.',
  }).min(1,{message: 'Por favor ingrese un número de teléfono.'}),
  status: z.string({
    invalid_type_error: 'Por favor seleccione un estado.',
  }).min(1,{message: 'Por favor seleccione un estado.'}),
  is_pickup: z.boolean(),
}).refine((data) => { 
  const isPickup = data.is_pickup;
  const deliveryAddress = data.delivery_address;
  return isPickup || (deliveryAddress && deliveryAddress.length > 0);
}, {
  message: 'Por favor ingrese una dirección.',
  path: ['delivery_address'], // This tells Zod where the error should appear
});

export async function createOrUpdateOrder(prevState: OrderFormState, formData: FormData) {
  const validatedFields = OrderFormSchema.safeParse({
    delivery_address: formData.get('delivery_address'),
    billing_address: formData.get('billing_address'),
    phone_number: formData.get('phone_number'),
    status: formData.get('status'),
    clientId: formData.get('client'),
    is_pickup: formData.get('is_pickup_switch') === 'on',
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Hay campos faltantes, por favor revise.',
      formData: Object.fromEntries(formData.entries()),
    };
  }
  
  const { delivery_address, billing_address, phone_number, status, is_pickup, clientId } = validatedFields.data;

  try {
    const body = {
      delivery_address: delivery_address ? delivery_address : '',
      billing_address: billing_address,
      phone_number: phone_number,
      status: Number(status),
      is_store_pickup: is_pickup,
      client_id: clientId
    }

    const orderId = formData.get('order_id'); //On add this will be null
    const method = orderId ? 'PUT' : 'POST';
    const path = orderId ? `order/admin/${orderId}` : 'order/admin/';
    
    const response = await apiFetchServer({method: method, path: path, body: JSON.stringify(body)});
    const responseJson: Order = await response.json();
    console.log("ADD ORDER RESPONSE", responseJson);

    console.log("NEW/UPDATE ORDER RESPONSE: " + orderId, response);

    //TODO mostrar error del response
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Order.',
      formData: Object.fromEntries(formData.entries()),
    };
  }

  revalidatePath('/welcome/orders');
  redirect('/welcome/orders');
}

export async function deleteOrder(id: number) {
  try {
    const response = await apiFetchServer({method: 'DELETE', path: `order/${id}`, body: undefined });
    revalidatePath('/welcome/orders');
    return { message: 'Orden eliminada.' };
  } catch (error) {
    return {
      message: 'Error al eliminar la orden',
    };
  }
}