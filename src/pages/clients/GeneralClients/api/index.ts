import apiClient from 'api/apiClient';

export const fetchGeneralClients = () => {
  apiClient
    .get(`/clients/general`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
