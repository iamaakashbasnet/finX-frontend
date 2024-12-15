import { Text } from '@mantine/core';

import { fetchGeneralClients } from './api';
import { useEffect } from 'react';

export default function GeneralClients() {
  useEffect(() => {
    fetchGeneralClients();
  });

  return (
    <>
      <Text size="lg">General Clients</Text>
    </>
  );
}
