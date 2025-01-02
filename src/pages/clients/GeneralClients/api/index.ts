import apiClient from 'api/apiClient';

interface GeneralClientI {
  id: number;
  user: { id: number; first_name: string; last_name: string; username: string; email: string };
  is_active: boolean;
}

interface GeneralClientsResponseI {
  count: number;
  next: string | null;
  results: GeneralClientI[];
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

export const fetchGeneralClients = async (): Promise<GeneralClientI[]> => {
  const data = await fetchData<GeneralClientsResponseI>(`/clients/general`);
  return data.results;
};

export const fetchGeneralClientDetails = async (id: number | null): Promise<GeneralClientI> => {
  const data = await fetchData<GeneralClientI>(`/clients/general/${id}`);
  return data;
};

export const checkUserEmailExist = async (body: { email: string }) => {
  const data = await apiClient.post(`/users/user-with-email-check/`, body);
  console.log(data);
  return data;
};
