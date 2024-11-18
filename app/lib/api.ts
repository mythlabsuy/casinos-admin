'only server'
import { API_HOST } from "@/app/lib/env";
import { auth, signOut } from '@/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { CustomError } from "./definitions";

interface Props {
  path?: string,
  method?: string,
  body?: string | FormData,
  query?: URLSearchParams,
  isForm?: boolean
  isFileUpload?: boolean
  withAuth?: boolean,
  isMultipartForm?: boolean,
  addPremisePath?: boolean,
  addPremiseQuery?: boolean,
}

export async function apiFetch({ method = 'GET', path = '/', query, body, isForm = false, isFileUpload = false, withAuth = true, addPremisePath = false, }: Props) {
  var headers = new Headers({
    'Accept': 'application/json',
  },);

  if (!isForm && !isFileUpload) {
    headers.append('Content-type', 'application/json')
  }

  // if(withAuth){
  //   headers.append('Authorization', token ?? '');
  // }

  const response = await fetch(getFullPath(path) + (query ? ('?' + query) : ''),
    {
      method: method,
      headers: headers,
      body: body,
      cache: 'force-cache'
    }
  );
  //TODO handle status errors and trigger a dialog and log errors
  console.info("FETCH RESPONSE", response);

  return response.json()
}

export async function apiFetchServer({ method = 'GET', path = '/', query, body, isForm = false, isFileUpload = false, withAuth = true, addPremisePath = false, addPremiseQuery= false }: Props) {
  const cookieStore = cookies();

  var headers = new Headers({
    'Accept': 'application/json'
  },);

  if (!isForm && !isFileUpload) {
    headers.append('Content-type', 'application/json')
  } else {
  }

  if (withAuth) {
    const session = await auth();
    // If user is not logged in session will be null
    if (session) {
      headers.append('Authorization', session.accessToken ?? '');
    }
  }

  if (addPremisePath) {
    let premiseId = cookieStore.get('selectedPremise')?.value;
    if (premiseId) {
      path = path + `${premiseId}`
    } else {
    }
  }

  if (addPremiseQuery) {
    let premiseId = cookieStore.get('selectedPremise')?.value;
    if (premiseId) {
      query?.set('premise_id', premiseId);
    } else {
    }
  }
  try {
    const response = await fetch(getFullPath(path) + (query ? (`?${query}`) : ''), {
      method: method,
      headers: headers,
      body: body
    });
    if (!response.ok) {
      if(response.status === 401 && path != 'auth/login'){
        throw new CustomError('Unauthorized access', 401);
      }
      const errorResponse = await response.json();
      const errorDetail = errorResponse.detail || 'Ha ocurrido un error inesperado.';
      throw new Error(errorDetail); 
    }

    return response; // Return the successful response

  } catch (error) {
    if (error instanceof Error || error instanceof CustomError) {
      console.log('apiFetchServer', error)
      throw error;
    }
    throw  new Error('Error inesperado')
  }
}

export function getFullPath(path?: string) {
  return API_HOST + (path ? path : '');
}




