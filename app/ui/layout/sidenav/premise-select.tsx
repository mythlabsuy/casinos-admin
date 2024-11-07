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
  console.log(`Selected premise ID: ${value}`);
}

export default function PremiseSelect({ premises }: Props) {
  const premiseMap = new Map();
  
  // Populate the premiseMap with premise names and ids
  premises.map((premise) => premiseMap.set(premise.name, premise.id));

  // Default state is the first premise's id or 0 if no premises are available
  const [premise, setPremise] = useState(
    premises.length > 0 ? premises[0].id : 0
  );

  useEffect(() => {
    // Check for selected premise cookie on component mount
    const selectedPremise = Cookies.get('selectedPremise');

    if (selectedPremise) {
      setPremise(parseInt(selectedPremise, 10)); // Set premise from cookie
    } else {
      if (premises.length > 0) {
        setStoreCookie(premises[0].id.toString()); // Set the default premise cookie
      }
    }
  }, [premises]); // Runs when premises list changes

  const handlePremiseChange = (e: any) => {

    setPremise(e as number); // Update state when select value changes
    setStoreCookie(e); // Set cookie when the user selects a new premise
  };

  return (
    <>
      <div className="flex items-center gap-x-4 py-3 text-sm font-semibold text-white">
        <Select
          id="store"
          icon="BuildingStorefrontIcon"
          value={premise}
          values={premiseMap}
          onChange={handlePremiseChange} // Ensure handlePremiseChange is used
        />
      </div>
    </>
  );
}

