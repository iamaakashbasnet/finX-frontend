import apiClient from 'api/apiClient';

interface GeneralClientI {
  user: { id: number; first_name: string; last_name: string; username: string; email: string };
  is_active: boolean;
}

interface GeneralClientsResponseI {
  count: number;
  next: string | null;
  results: GeneralClientI[];
}

export const fetchGeneralClients = async () => {
  try {
    const res = await apiClient.get<GeneralClientsResponseI>(`/clients/general`);
    return res.data.results;
  } catch (err) {
    console.error('Something went wrong:', err);
    throw err;
  }
};
