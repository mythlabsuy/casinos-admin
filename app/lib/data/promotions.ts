
import { apiFetchServer } from "../api";
import { Promotion } from "../definitions";
const ITEMS_PER_PAGE = 6;

export async function fetchPromotionById(
    query?: string,
    id?: string,
): Promise<Promotion> {
    try {
        const response = await apiFetchServer({ method: 'GET', path: `promotion/${id}`, body: undefined, });

        console.log("Promotion response", response);

        return await response.json();
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch promotion by id.');
    }
}