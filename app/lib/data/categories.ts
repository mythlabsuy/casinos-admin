import { apiFetchServer } from "../api";
import { Category } from "../definitions";
import { CategoriesResponse } from "../responses";

const ITEMS_PER_PAGE = 6;

export async function fetchActiveCategories(
  query?: string,
  currentPage?: number,
) : Promise<Category[]> {
  const skip = currentPage ? ((currentPage - 1) * ITEMS_PER_PAGE) : 0;
  const limit = currentPage ? ITEMS_PER_PAGE : 100;

  try {
    const query = new URLSearchParams({ skip: skip.toString(), limit: limit.toString(), show_all: "True" })
    const response = await apiFetchServer({method: 'GET', path: 'category', body: undefined, query: query});

    console.log("CATEGORIES RESP", response);

    const categories: CategoriesResponse = await response.json();
    
    return categories.category.filter((c) => c.disabled == false);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch active categories.');
  }
}

export async function fetchCategory(id: number) {
  try {
    const response = await apiFetchServer({method: 'GET', path: `category/${id}`, body: undefined});
    return response;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch selected category.');
  }
}