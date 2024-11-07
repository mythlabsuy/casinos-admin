'use client';

import { MediaFile, Promotion } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useActionState, useEffect, useState } from 'react';
import { NumberInput, TextInput } from '../components/form-fields/input';
import FileChooser from '../components/form-fields/file-chooser';
import {
  CreateOrUpdatePromotion,
  FormDataValues,
  PromotionFormState,
} from '@/app/lib/promotion-actions';
import SingleFileChooser from '../components/form-fields/single-file-chooser';
import { DateTimePicker } from '@/components/ui/datetime-picker';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import SwitchWithIcon from '../components/form-fields/switch';
import Select from '../components/form-fields/select';
interface Props {
  promotion?: Promotion;
}

export default function PromotionForm({ promotion }: Props) {
  const initialState: PromotionFormState = {
    message: null,
    errors: {},
    formData: {},
  };
  const [state, formAction] = useActionState(
    CreateOrUpdatePromotion,
    initialState,
  );
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState<Partial<FormDataValues>>({});

  useEffect(() => {
    if (state?.errors) {
      setFormData((prevFormData) => ({ ...prevFormData, ...state?.formData }));
    }
  }, [state]);

  const [frecuency, setFrecuency] = useState(
    promotion ? promotion?.frequency.toString() : '0',
  );

  const [isOnlyOnce, setIsOnlyOnce] = useState(formData.onlyOnce || false);
  const [isActive, setIsActive] = useState(formData.isActive || false);

  useEffect(() => {
    if (isOnlyOnce) {
      if (frecuency != '0') setFrecuency('0');
    }
  }, [isOnlyOnce]);

  useEffect(() => {
    if (frecuency !== '0') {
      setIsOnlyOnce(false);
    }
  }, [frecuency]);

  const frecuencies = new Map([
    ['SIN SELECCIONAR', '0'],
    ['DIARIA', '1'],
    ['SEMANAL', '2'],
    ['MENSUAL', '3'],
  ]);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Hidden input with category id for the edit */}
        {promotion ? (
          <input
            type="hidden"
            value={promotion.id}
            id="premise_id"
            name="premise_id"
          />
        ) : null}
        <div className="grid grid-cols-2 gap-4">
          {/* Name */}
          <div className="col-span-2 mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <TextInput
              id="name"
              defaultValue={formData.name || promotion?.name || ''}
              errors={state?.errors ? state?.errors.name : undefined}
            />
          </div>

          {/* Description */}
          <div className="col-span-2 mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descripción
            </label>
            <TextInput
              id="description"
              defaultValue={
                formData.description || promotion?.description || ''
              }
              errors={state?.errors ? state?.errors.description : undefined}
              multiline={true}
            />
          </div>

          {/* Instructions */}
          <div className="mb-4">
            <label
              htmlFor="participationInstructions"
              className="block text-sm font-medium text-gray-700"
            >
              Instrucciones de participación
            </label>
            <TextInput
              id="participationInstructions"
              defaultValue={
                formData.participationInstructions ||
                promotion?.participation_instructions ||
                ''
              }
              errors={
                state?.errors
                  ? state?.errors.participationInstructions
                  : undefined
              }
              multiline={true}
            />
          </div>

          {/* Extra ticket data */}
          <div className="mb-4">
            <label
              htmlFor="ticketExtraData"
              className="block text-sm font-medium text-gray-700"
            >
              Datos extra ticket
            </label>
            <TextInput
              id="ticketExtraData"
              defaultValue={
                formData.ticketExtraData || promotion?.ticket_extra_data || ''
              }
              errors={state?.errors ? state?.errors.ticketExtraData : undefined}
              multiline={true}
            />
          </div>

          {/* Terms and conditions */}
          <div className="col-span-2 mb-4">
            <label
              htmlFor="promotionTermsAndConditionsFile"
              className="block text-sm font-medium text-gray-700"
            >
              Términos y condiciones
            </label>
            <SingleFileChooser
              id="termsAndConditionsFile"
              removeMediaCallback={() => {}}
              mediaFile={
                state?.formData.termsAndConditionsFile ||
                promotion?.terms_and_conditions
              }
              errors={
                state?.errors ? state?.errors.termsAndConditionsFile : undefined
              }
            />
          </div>

          <div className="col-span-2 mb-4">
            <div className="block text-xl font-medium text-gray-700">
              Configuraciones de participación
            </div>
          </div>

          {/* Start date */}
          <div className="mb-5">
            <label
              htmlFor="startDate"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Fecha de inicio
            </label>
            <DateTimePicker
              value={startDate}
              onChange={setStartDate}
              timeZone="America/Montevideo"
              locale={es}
              name="startDate"
              errors={state?.errors ? state?.errors.startDate : undefined}
            />
            <input
              type="hidden"
              name="startDate"
              value={
                startDate
                  ?.toLocaleString('sv-SE', {
                    timeZone: 'America/Montevideo',
                    hour12: false,
                  })
                  .replace(' ', 'T') + '.000'
              }
            />
          </div>

          {/* End date */}
          <div className="mb-5">
            <label
              htmlFor="endDate"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Fecha de fin
            </label>
            <DateTimePicker
              value={endDate}
              onChange={setEndDate}
              timeZone="America/Montevideo"
              locale={es}
              name="endDate"
              errors={state?.errors ? state?.errors.endDate : undefined}
            />
            <input
              type="hidden"
              name="endDate"
              value={
                endDate
                  ?.toLocaleString('sv-SE', {
                    timeZone: 'America/Montevideo',
                    hour12: false,
                  })
                  .replace(' ', 'T') + '.000'
              }
            />
          </div>

          <div className="mb-4">
            <SwitchWithIcon
              id={'onlyOnce'}
              label="Participación por única vez"
              value={isOnlyOnce}
              onChange={setIsOnlyOnce}
            />
          </div>

          <div className="mb-4">
            <SwitchWithIcon
              id={'isActive'}
              label="Promoción activa"
              value={isActive}
              onChange={setIsActive}
            />
          </div>

          <div className="mb-4">
            <Select
              id="frecuency"
              label="Frecuencia"
              icon="ChevronUpDownIcon"
              value={frecuency}
              onChange={(e) => setFrecuency(e as string)}
              values={frecuencies}
              errors={state?.errors ? state?.errors.frecuency : undefined}
            />
          </div>

          {/* Maximum */}
          <div className="mb-4">
            <NumberInput
              id="maximumParticipations"
              defaultValue={
                formData.maximumParticipations
                  ? isNaN(parseInt(formData.maximumParticipations, 10))
                    ? 0
                    : parseInt(formData.maximumParticipations, 10)
                  : promotion?.maximum_participations || 0
              }
              errors={
                state?.errors ? state?.errors.maximumParticipations : undefined
              }
              icon="UserIcon"
              label="Cantidad máxima"
              step={1}
              min={0}
            />
          </div>

          <div className="col-span-2 mb-4">
            <div className="block text-xl font-medium text-gray-700">
              Imágenes
            </div>
          </div>

          {/* First page image */}
          <div className="mb-4">
            <label
              htmlFor="firstPageFile"
              className="block text-sm font-medium text-gray-700"
            >
              Primer página
            </label>
            <SingleFileChooser
              id="firstPageFile"
              name="firstPageFile"
              removeMediaCallback={() => {}}
              mediaFile={
                formData.firstPageFile || promotion?.welcome_background
              }
              errors={state?.errors ? state?.errors.firstPageFile : undefined}
            />
          </div>
          {/* background image */}
          <div className="mb-4">
            <label
              htmlFor="backgroundFile"
              className="block text-sm font-medium text-gray-700"
            >
              Fondo general
            </label>
            <SingleFileChooser
              id="backgroundFile"
              removeMediaCallback={() => {}}
              mediaFile={formData.backgroundFile || promotion?.background}
              errors={state?.errors ? state?.errors.backgroundFile : undefined}
            />
          </div>
        </div>
      </div>
      {state?.message && (
        <div className="my-2 rounded border border-red-500 bg-red-100 p-4 text-red-700">
          {state?.message}
        </div>
      )}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/welcome/promotions"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
}
