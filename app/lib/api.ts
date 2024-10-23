import { API_HOST } from "@/app/lib/env";
import { auth } from '@/auth';
import { Session } from "next-auth";
import { cookies } from 'next/headers';

interface Props {
  path?: string,
  method?: string,
  body?: string | FormData,
  query?: URLSearchParams,
  isForm?: boolean
  isFileUpload?: boolean
  withAuth?: boolean
}

// const getCookieValue = (name: string) => {
//   const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
//   return match ? match[2] : '';
// };

export async function apiFetch({method = 'GET', path = '/', query, body, isForm = false, isFileUpload = false, withAuth = true}: Props){
  var headers = new Headers({
    'Accept': 'application/json',
  },);

  if(!isForm && !isFileUpload){
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

export async function apiFetchServer({method = 'GET', path = '/', query, body, isForm = false, isFileUpload = false, withAuth = true}: Props){
  const cookieStore = cookies();
  
  var headers = new Headers({
    'Accept': 'application/json'
  },);

  let selStore = cookieStore.get('selectedStore')?.value;
  if(selStore){
    headers.append('store-id', selStore);
  }

  if(!isForm && !isFileUpload){
    headers.append('Content-type', 'application/json')
  }

  if(withAuth){
    const session = await auth();
    // If user is not logged in session will be null
    if(session){
      headers.append('Authorization', session.accessToken ?? '');
    }
  }
    
  const response = await fetch(getFullPath(path) + (query ? (`?${query}`) : ''), 
    {
      method: method,
      headers: headers,
      body: body
    }
  );
  // .then((res) => {
  //   //TODO handle status errors and trigger a dialog and log errors
  //   console.info("FETCH SERVER RESPONSE", res);
  //   return res.json()
  // });

  return response
}

export function getFullPath(path?: string){
  return API_HOST + (path ? path : '');
}