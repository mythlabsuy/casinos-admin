// app/components/DatePicker.tsx
'use client';

import { Button } from '@/components/ui/button';
import { DateTimePicker } from '@/components/ui/datetime-picker';
import { es } from 'date-fns/locale';
import React, { useState, createContext, useContext } from 'react';
import { ExcelExportActionButton } from './excel-export-action-button';

// Create context for the date
const DateContext = createContext<{
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
}>({
  startDate: '',
  endDate: '',
  setStartDate: () => {},
  setEndDate: () => {},
});

export const useDate = () => useContext(DateContext);

const ClientSideExcelFilters = ({
  children,
  exportAllButton,
  noPermissionText,
}: {
  children?: React.ReactNode;
  exportAllButton?: React.ReactNode | undefined;
  noPermissionText?: string;
}) => {
  const [startDate, setStartDate] = useState<string>(''); // Store the date in ISO format
  const [endDate, setEndDate] = useState<string>('');

  const handleStartDateChange = (date: Date | undefined) => {
    if (date) {
      const isoDate = date.toISOString();
      setStartDate(isoDate);
    }
  };
  const handleEndDateChange = (date: Date | undefined) => {
    if (date) {
      const isoDate = date.toISOString();
      setEndDate(isoDate);
    }
  };

  return (
    <DateContext.Provider
      value={{ startDate, endDate, setStartDate, setEndDate }}
    >
      <div className="rounded-lg bg-gray-50 p-4">
        <div className="my-4 grid grid-cols-2 items-end gap-4 sm:grid-cols-4">
          <div className="col-span-1 mb-5">
            <label
              htmlFor="startDate"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Fecha de inicio
            </label>
            <DateTimePicker
              value={startDate ? new Date(startDate) : undefined} // Convert ISO to Date for the picker
              onChange={(date) => handleStartDateChange(date)}
              required
              timeZone="America/Montevideo"
              locale={es}
              name="startDate"
              hideTime={true}
            />
            <input type="hidden" name="startDate" value={startDate} />
          </div>
          <div className="col-span-1 mb-5">
            <label
              htmlFor="startDate"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Fecha fin
            </label>
            <DateTimePicker
              value={endDate ? new Date(endDate) : undefined} // Convert ISO to Date for the picker
              onChange={(date) => handleEndDateChange(date)}
              required
              timeZone="America/Montevideo"
              locale={es}
              name="endDate"
              hideTime={true}
            />
            <input type="hidden" name="endDate" value={endDate} />
          </div>
          <div className="col-span-1 mb-5 flex gap-4">
            <Button
              className="bg-gray-500 hover:bg-gray-600"
              onClick={() => {
                setStartDate('');
                setEndDate('');
              }}
            >
              Limpiar filtros
            </Button>
            {exportAllButton}
          </div>
        </div>
        <div className="text-sm text-red-600">
          Nota: Los filtros seleccionados aplican también al exportar del Excel
          de cada promoción en particular{' '}
        </div>
      </div>
      {!exportAllButton && (
        <div className="my-2 rounded border border-red-500 bg-red-100 p-4 text-red-700">
          {noPermissionText}
        </div>
      )}

      {children}
    </DateContext.Provider>
  );
};

export default ClientSideExcelFilters;
