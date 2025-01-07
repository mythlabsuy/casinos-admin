'use client';

import { Promotion } from '@/app/lib/definitions';
import Link from 'next/link';
import { useActionState, useEffect, useRef, useState } from 'react';
import { NumberInput, TextInput } from '../components/form-fields/input';
import {
  CreateOrUpdatePromotion,
  FormDataValues,
  PromotionFormState,
} from '@/app/lib/actions/promotion-actions';
import { DateTimePicker } from '@/components/ui/datetime-picker';
import { es } from 'date-fns/locale';
import SwitchWithIcon from '../components/form-fields/switch';
import Select from '../components/form-fields/select';
import { DateTime } from 'luxon';
import FullScreenLoading from '../components/fullScreenLoading';
import FormSubmitButtonWithLoading from '../components/formSubmitButtonWithLoading';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CustomButton } from '../customButton';
import FileChooser from '../components/form-fields/file-chooser';
import clsx from 'clsx';
interface Props {
  promotion?: Promotion;
}

export default function PromotionForm({ promotion }: Props) {
  const initialState: PromotionFormState = {
    message: null,
    errors: {},
    formData: {},
  };
  const [state, formAction, isPending] = useActionState(
    CreateOrUpdatePromotion,
    initialState,
  );
  const [startDate, setStartDate] = useState<Date | undefined>(
    promotion?.start_date
      ? DateTime.fromISO(promotion.start_date).toJSDate()
      : undefined,
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    promotion?.end_date
      ? DateTime.fromISO(promotion.end_date).toJSDate()
      : undefined,
  );
  const [formData, setFormData] = useState<Partial<any>>({});

  useEffect(() => {
    if (state?.errors) {
      setFormData((prevFormData) => ({ ...prevFormData, ...state?.formData }));
    }
  }, [state]);

  const [frecuency, setFrecuency] = useState(
    promotion ? promotion?.frequency.toString() : '0',
  );

  const [isOnlyOnce, setIsOnlyOnce] = useState(
    formData.onlyOnce || promotion?.just_once || false,
  );
  const [isActive, setIsActive] = useState(
    formData.isActive || promotion?.is_active || false,
  );

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
  const formRef = useRef<HTMLFormElement>(null);
  const handleDialogConfirm = () => {
    // Trigger form validation programmatically
    if (formRef.current?.checkValidity()) {
      setIsDialogOpen(true);
      // formRef.current?.requestSubmit(); // Submits the form if valid
    } else {
      formRef.current?.reportValidity(); // Shows validation messages
    }
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const maximumParticipationsDefault = formData.maximumParticipations
    ? parseInt(formData.maximumParticipations, 10) || 0
    : promotion?.maximum_participations || 0;

  return (
    <form id="promotionsForm" ref={formRef} action={formAction}>
      <FullScreenLoading isLoading={isPending} />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Hidden input with promotion id for the edit */}
        {promotion ? (
          <input
            type="hidden"
            value={promotion.id}
            id="promotion_id"
            name="promotion_id"
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
              required={true}
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
              required={true}
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
              required={true}
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
            <FileChooser
              id="termsAndConditionsFile"
              fileWeight="1.5 Mb"
              fileTypes="pdf"
              allowedFileTypes={['application/pdf']}
              removeMediaCallback={() => {}}
              required={!promotion}
              mediaFiles={[
                ...(formData?.termsAndConditionsFile
                  ? [formData.termsAndConditionsFile]
                  : []),
                ...(promotion?.terms_and_conditions
                  ? [promotion.terms_and_conditions]
                  : []),
              ]}
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
              required={true}
              locale={es}
              name="startDate"
              errors={state?.errors ? state?.errors.startDate : undefined}
            />
            <input
              type="hidden"
              name="startDate"
              value={startDate?.toISOString()}
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
              required={true}
              timeZone="America/Montevideo"
              locale={es}
              name="endDate"
              errors={state?.errors ? state?.errors.endDate : undefined}
            />
            <input
              type="hidden"
              name="endDate"
              value={endDate?.toISOString()}
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
          <div
            className={clsx('mb-4', {
              hidden: isOnlyOnce,
            })}
          >
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

          <div
            className={clsx('mb-4', {
              hidden: isOnlyOnce,
            })}
          >
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
              label="Cantidad máxima de participación por frecuencia seleccionada"
              step={1}
              min={0}
              required={!isOnlyOnce}
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
            <FileChooser
              id="firstPageFile"
              fileWeight="10 Mb"
              fileTypes="avif, jpeg, png, webp, gif"
              fileSize="9:16 (Ej: 1080x1920 px, 768x1366 px). Orientación vertical."
              allowedFileTypes={[
                'image/avif',
                'image/gif',
                'image/jpeg',
                'image/png',
                'image/webp',
              ]}
              maxFileSizeBytes={10485760}
              name="firstPageFile"
              required={!promotion}
              removeMediaCallback={() => {}}
              mediaFiles={[
                ...(formData?.firstPageFile ? [formData.firstPageFile] : []),
                ...(promotion?.welcome_background
                  ? [promotion.welcome_background]
                  : []),
              ]}
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
            <FileChooser
              id="backgroundFile"
              fileWeight="1.5 Mb"
              fileTypes="avif, jpeg, png, webp"
              fileSize="9:16 (Ej: 1080x1920 px, 768x1366 px). Orientación vertical."
              allowedFileTypes={[
                'image/avif',
                'image/jpeg',
                'image/png',
                'image/webp',
              ]}
              required={!promotion}
              removeMediaCallback={() => {}}
              mediaFiles={[
                ...(formData?.backgroundFile ? [formData.backgroundFile] : []),
                ...(promotion?.background ? [promotion.background] : []),
              ]}
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
        <CustomButton type="button" onClick={handleDialogConfirm}>
          Guardar
        </CustomButton>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Atención</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              La promoción está {isActive ? 'activa' : 'inactiva'}. ¿Está seguro
              que desea continuar?
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <button className="px-4">Cancelar</button>
              </DialogClose>
              <DialogClose asChild>
                <FormSubmitButtonWithLoading
                  isPending={false}
                  form={'promotionsForm'}
                >
                  Guardar
                </FormSubmitButtonWithLoading>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </form>
  );
}
