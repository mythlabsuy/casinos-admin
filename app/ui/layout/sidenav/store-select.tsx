'use client'

import React, { useEffect, useState } from 'react';
import { Premise } from '../../../lib/definitions';
import Select from '../../components/form-fields/select';
import Cookies from 'js-cookie';

interface Props {
  stores: Premise[]
}

/**
 * Set or update a cookie with the selected store value
 * @param value Store ID
 */
function setStoreCookie(value: string | number){
  Cookies.set('selectedStore', value.toString(), { expires: 60 }); // Expires in 60 days
  console.log(`Selected store ID: ${value}`);
}

export default function StoreSelect({ stores }: Props) {
  const storesMap = new Map();
  stores.map((store) => (
    storesMap.set(store.name, store.id)
  ));

  const [defaultStore, setDefaultStore] = useState<string | number | undefined>();

  const handleStoreChange = (value: string | number) => {
    setStoreCookie(value);
    window.location.reload()
  };

  useEffect(() => {
    const selectedStore = Cookies.get('selectedStore');
    console.log("SELECTED STORE", selectedStore)
    if (selectedStore) {
      setDefaultStore(selectedStore);
    } else {
      setStoreCookie(stores[0].id.toString());
    }
  }, [stores]);
  
  return (
    <>
      <div className="flex items-center gap-x-4 py-3 text-sm font-semibold text-white">
        <Select 
          id='store'
          icon='BuildingStorefrontIcon' 
          value={defaultStore}
          values={storesMap}
          onChange={handleStoreChange}/>
      </div>
    </>
  )
}
