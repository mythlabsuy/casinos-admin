
import { apiFetchServer } from "../api";
import { Promotion } from "../definitions";
const ITEMS_PER_PAGE = 6;

export async function fetchParticipants(
    query?: string,
    id?: string,
): Promise<Promotion> {
    try {
        const response = await apiFetchServer({ method: 'GET', path: `promotion/${id}`, body: undefined, });

        return await response.json();
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch promotion by id.');
    }
}

export async function fetchParticipant(id: number) {
    try {
      const response = await apiFetchServer({method: 'GET', path: `participant/${id}`, body: undefined});
      return response;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error al obtener el participante seleccionado.');
    }
  }