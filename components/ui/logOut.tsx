'use client'

import { userSignOut } from "@/app/lib/sign-out";



interface Props {
  status: number,
}

//TODO Se que esto es una cerdada, hay que ver una mejor forma de lograr esto
export function LogOut({status}: Props) {

  if(status === 401){
    userSignOut();
  }

  return (
    <></>
  );
}