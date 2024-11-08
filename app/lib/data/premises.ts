import { apiFetchServer } from "../api";
import { Premise } from "../definitions";
import { PremiseResponse, PremisesResponse } from "../responses";
const ITEMS_PER_PAGE = 6;

export async function fetchActivePremises(
    query?: string,
    currentPage?: number,
): Promise<Premise[]> {
    const skip = currentPage ? ((currentPage - 1) * ITEMS_PER_PAGE) : 0;
    const limit = currentPage ? ITEMS_PER_PAGE : 100;

    try {
        const query = new URLSearchParams({ skip: skip.toString(), limit: limit.toString() })
        const response = await apiFetchServer({ method: 'GET', path: 'premise', body: undefined, query: query });

        console.log("Premises response", response);

        const premisesResp: PremisesResponse = await response.json();

        return premisesResp.premises.filter((s) => s.disabled == false);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch active premises.');
    }
}

export async function fetchPremiseById(
    query?: string,
    id?: string,
): Promise<Premise> {
    try {
        const response = await apiFetchServer({ method: 'GET', path: `premise/${id}`, body: undefined, });

        console.log("Premises response", response);

        return await response.json();
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch premise by Id.');
    }
}