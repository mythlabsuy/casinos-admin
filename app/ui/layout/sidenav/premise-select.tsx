'use client';

import React, { useEffect, useState } from 'react';
import { Premise } from '../../../lib/definitions';
import Select from '../../components/form-fields/select';
import Cookies from 'js-cookie';

interface Props {
  premises: Premise[];
}

/**
 * Set or update a cookie with the selected store value
 * @param value Store ID
 */

function setStoreCookie(value: string | number) {
  Cookies.set('selectedPremise', value.toString(), { expires: 60 }); // Expires in 60 days
}

export default function PremiseSelect({ premises }: Props) {
  const premiseMap = new Map();

  // Populate the premiseMap with premise names and ids
  premises.map((premise) => premiseMap.set(premise.name, premise.id));

  // Default state is the first premise's id or 0 if no premises are available
  const [premiseId, setPremiseId] = useState(
    premises.length > 0 ? premises[0].id : 0,
  );

  useEffect(() => {
    const selectedPremiseId = Cookies.get('selectedPremise');
    if (selectedPremiseId) {
      const isPremiseIdInList = premises.some(
        (premise) => premise.id.toString() === selectedPremiseId,
      );
      if (isPremiseIdInList) {
        setPremiseId(parseInt(selectedPremiseId, 10));
      }
    } else {
      if (premises.length > 0) {
        setStoreCookie(premises[0].id.toString());
      }
    }
  }, [premises]);

  const handlePremiseChange = (e: any) => {
    setPremiseId(e as number);
    setStoreCookie(e);
  };

  return (
    <>
      <div className="flex items-center gap-x-4 text-sm font-semibold text-white">
        <Select
          id="store"
          icon="BuildingStorefrontIcon"
          value={premiseId}
          values={premiseMap}
          onChange={handlePremiseChange} // Ensure handlePremiseChange is used
        />
      </div>
    </>
  );
}
