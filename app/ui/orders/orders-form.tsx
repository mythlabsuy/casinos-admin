'use client';

import { Client, Order } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useActionState, useEffect, useState } from 'react';
import { TextInput } from '../components/form-fields/input';
import { OrderFormState, createOrUpdateOrder } from '@/app/lib/actions/orders'
import Select from '../components/form-fields/select';
import { getOrderStatusMap } from '@/app/lib/enums/order-status';
import SwitchWithIcon from '../components/form-fields/switch';

interface Props {
  clients: Client[];
  order?: Order;
}

export default function OrderForm({ order, clients }: Props ) {
  const initialState: OrderFormState = { message: null, errors: {}, formData: {} };
  const [state, formAction] = useActionState(createOrUpdateOrder, initialState);
  const [formData, setFormData] = useState<any>({});
  const [isPickup, setIsPickup] = useState<boolean>(state.formData.is_store_pickup || order?.is_store_pickup || false);
  const [status, setStatus] = useState( order ? order?.status : '');
  const [client, setClient] = useState( order ? order?.client_id : clients[0].id);

  useEffect(() => {
    if (state.errors) {
      setFormData(state.formData || {});
      setIsPickup(state.formData.is_store_pickup || order?.is_store_pickup || false);
    }
  }, [state]);

  const clientsMap = new Map();
  clients.map((client) => (
    clientsMap.set(`${client.full_name}${client.document_number ? ` (${client.document_number})`: ''}`, client.id)
  ));
  
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Hidden input with order id for the edit */}
        {order ? <input type='hidden' value={order.id} id="order_id" name='order_id'/> : null}
        <div className="grid grid-cols-[1fr_2fr_2fr] gap-4">
          {/* Status */}
          <div className="mb-4">
            <Select 
            id='status' 
            label='Estado de la orden'
            icon='QueueListIcon' 
            value={status}
            onChange={(e) => setStatus(e as string)}
            values={getOrderStatusMap('es')} 
            errors={state.errors ? state.errors.status : undefined} 
            />
          </div>
          {/* Numero de telefono */}
          <div className="mb-4">
            <TextInput 
              id='phone_number'
              defaultValue={formData.phone_number || order?.phone_number || ''}
              errors={state.errors ? state.errors.phone_number : undefined} 
              icon='DevicePhoneMobileIcon' 
              label='Número de teléfono' />
          </div>
          {/* Client Name */}
          <div className="mb-4">
            <Select 
              id='client' 
              label='Seleccione un cliente'
              icon='UserIcon'
              value={client}
              onChange={(e) => setClient(e as number)}
              values={clientsMap} 
              errors={state.errors ? state.errors.clientId : undefined} />
          </div>
        </div>
        <div className="grid grid-cols-[1fr_2fr_2fr] gap-4">
          {/* Direccion de entrega */}
          <div className="mb-4">
            <SwitchWithIcon id={'is_pickup'} label='Entrega/Retiro' 
            defaultEnabled={ formData.is_pickup || order?.is_store_pickup || false } onChange={() => setIsPickup(!isPickup)}/>
          </div>
          {/* Direccion de entrega */}
          { !isPickup ? <div className="mb-4">
            <TextInput 
              id='delivery_address'
              defaultValue={formData.delivery_address || order?.delivery_address || ''}
              errors={state.errors ? state.errors.delivery_address : undefined} 
              icon='TruckIcon' 
              label='Dirección de entrega' />
          </div> : null }
          {/* Direccion de facturacion */}
          <div className="mb-4">
            <TextInput 
              id='billing_address'
              defaultValue={formData.billing_address || order?.billing_address || ''}
              errors={state.errors ? state.errors.billing_address : undefined} 
              icon='DocumentTextIcon' 
              label='Dirección de facturación' />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Order number */}
          { order ? <div className="mb-4">
            <TextInput 
              id='order_number'
              defaultValue={formData.order_number || order?.order_number || ''}
              disabled = {true}
              icon='TagIcon' 
              label='Identificador de la orden' />
          </div> : null }
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/welcome/orders"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
}
