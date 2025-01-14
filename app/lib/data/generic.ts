import { apiFetchServer } from "../api";

//TODO remove limit on out of page list
const ITEMS_PER_PAGE = 6;

/**
 * GET METHOD
 * Obtains the amount of results for the search query and calculates the amount of pages.
 * 
 * @param path Path to the count endpoint. Ex: 'articles/count'.
 * @param search_query Search query typed by the user.
 * @returns Amount of pages to display in the pagination.
 */
export async function fetchPagesAmount(path: string, search_query: string) {
  try {
    const query = new URLSearchParams({ query: search_query })
    const response = await apiFetchServer({ method: 'GET', path: path, body: undefined, query: query });
    const amount = await response.data;

    const totalPages = Math.ceil(amount / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch pages amount from ${path}.`);
  }
}

export function getPagesAmount(amount: number) {
  const totalPages = Math.ceil(amount / ITEMS_PER_PAGE);
  return totalPages;
}

export async function fetchFilteredData({
  path,
  query,
  currentPage = 1,
  urlParams,
  addPremiseQuery = false,
  unlimited = false,
}: {
  path: string;
  query: string;
  currentPage?: number;
  urlParams?: URLSearchParams;
  addPremiseQuery?: boolean;
  unlimited?: boolean;
}): Promise<any> {
  const offset = unlimited ? 0 : (currentPage - 1) * ITEMS_PER_PAGE;
  const limit = unlimited ? '100' : ITEMS_PER_PAGE.toString()
  //TODO Filter articles using search bar text
  try {
    let searchParams = urlParams;

    if (urlParams) {
      searchParams?.append('skip', offset.toString());
      searchParams?.append('limit', limit);
      if (query) {
        searchParams?.append('query', query);
      }
    } else {
      searchParams = new URLSearchParams({ skip: offset.toString(), limit: limit, query: query, });
    }
    const response = await apiFetchServer({ method: 'GET', path: path, body: undefined, query: searchParams, addPremiseQuery: addPremiseQuery });
    const responseJson = await response.data;

    return responseJson;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch data from ${path}.`);
  }
}