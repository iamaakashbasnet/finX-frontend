import apiClient from 'api/apiClient';

interface PoolClientI {
  id: number;
  user: { id: number; first_name: string; last_name: string; username: string; email: string };
  is_active: boolean;
  shares_amount: number;
  nav_value: number;
}

interface PoolClientsResponseI {
  count: number;
  next: string | null;
  results: PoolClientI[];
}

const fetchData = async <T>(endpoint: string): Promise<T> => {
  try {
    const res = await apiClient.get<T>(endpoint);
    return res.data;
  } catch (err) {
    console.error('Something went wrong:', err);
    throw err;
  }
};

export const fetchPoolClients = async (): Promise<PoolClientI[]> => {
  const data = await fetchData<PoolClientsResponseI>(`/clients/pool`);
  return data.results;
};

export const fetchPoolClientDetails = async (id: number | null): Promise<PoolClientI> => {
  const data = await fetchData<PoolClientI>(`/clients/pool/${id}`);
  return data;
};
