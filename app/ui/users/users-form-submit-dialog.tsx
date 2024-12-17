import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import { CustomButton } from '../customButton'

const UserFormSubmitDialog = () => {
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
        El rol seleccionado solo permite un local por usuario.
      </DialogDescription>
      <DialogFooter>
        <DialogClose asChild>
          <button className="px-4">Aceptar</button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default UserFormSubmitDialog