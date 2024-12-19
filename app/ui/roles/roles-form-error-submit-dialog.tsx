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
import React from 'react';
import { CustomButton } from '../customButton';
import { de } from 'date-fns/locale';

export interface props {
  description: string;
  missingPerms: string[];
}

const RolesFormErrorSubmitDialog = ({ missingPerms, description }: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CustomButton className="bg-blue-500 hover:bg-blue-600">
          Guardar
        </CustomButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atención</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="mb-2">{description}</div>
          <div>
            {missingPerms.map((perm, index) => (
              <div key={index}>
                <div className="font-bold mb-2">{perm}</div>
              </div>
            ))}
          </div>
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <button className="px-4">Aceptar</button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RolesFormErrorSubmitDialog;
