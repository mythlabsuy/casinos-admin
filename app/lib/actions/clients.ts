import { apiFetchServer } from "../api";
import { Client } from "../definitions";

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredClients(
  query: string,
  currentPage: number,
) : Promise<{ clients: Client[]}> {
  const offset = currentPage > 0 ? (currentPage - 1) * ITEMS_PER_PAGE : 0;
  const limit = currentPage > 0 ? ITEMS_PER_PAGE : 1000;

  try {
    const searchParams = new URLSearchParams({ skip: offset.toString(), limit: limit.toString(), query: query })
    const response = await apiFetchServer({method: 'GET', path: 'client', body: undefined, query: searchParams});

    console.log("Clients RESP", response);
    
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch clients.');
  }
}