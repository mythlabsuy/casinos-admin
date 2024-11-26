
import { apiFetchServer } from "../api";
import { SystemUser } from "../definitions";
const ITEMS_PER_PAGE = 6;

export async function fetchUserById(
    query?: string,
    id?: string,
): Promise<SystemUser> {
    try {
        const response = await apiFetchServer({ method: 'GET', path: `user/${id}`, body: undefined, });
        return await response.data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch user by id.');
    }
}