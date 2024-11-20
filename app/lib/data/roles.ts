import { apiFetchServer } from "../api";
import { Premise } from "../definitions";
import { PremisesResponse } from "../responses";
const ITEMS_PER_PAGE = 6;

export async function fetchRoles(
    query?: string,
    currentPage?: number,
): Promise<Premise[]> {
    const skip = currentPage ? ((currentPage - 1) * ITEMS_PER_PAGE) : 0;
    const limit = currentPage ? ITEMS_PER_PAGE : 100;

    try {
        const query = new URLSearchParams({ skip: skip.toString(), limit: limit.toString() })
        const response = await apiFetchServer({ method: 'GET', path: 'premise/', body: undefined, query: query });
        const premisesResp: PremisesResponse = await response?.json();
        return premisesResp.premises.filter((s) => s.disabled == false);
    } catch (error) {
        // console.error('error in fetchActivePremises', error);
        throw error;
    }
}

export async function fetchRoleById(
    query?: string,
    id?: string,
): Promise<Premise> {
    try {
        const response = await apiFetchServer({ method: 'GET', path: `role/${id}`, body: undefined, });
        return await response.json();
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch role by Id.');
    }
}