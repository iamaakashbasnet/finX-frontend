import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Space, Table, Text, Paper } from '@mantine/core';
import { LuUserRoundCheck, LuUserRoundX } from 'react-icons/lu';

import ClientModal from './GeneralClientModal';
import { fetchGeneralClients } from './api';

const GeneralClients = () => {
  const [opened, setOpened] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  const open = (clientId: number) => {
    setSelectedClientId(clientId);
    setOpened(true);
  };

  const close = () => {
    setOpened(false);
    setSelectedClientId(null);
  };

  const { data, isLoading } = useQuery({
    queryKey: ['fetch-general-clients'],
    queryFn: () => fetchGeneralClients(),
  });

  return (
    <>
      <Text size="lg" fw="bold">
        General Clients
      </Text>
      <Text size="sm" c="dimmed" pl="sm">
        General client's portfolio are managed separately from pool investments
      </Text>
      <Space h="lg" />
      {isLoading && <Text>Loading...</Text>}
      <Paper
        style={{
          borderRadius: '.3rem',
          overflow: 'hidden',
        }}
        shadow="sm"
        withBorder
      >
        <Table style={{ borderRadius: '2.5rem' }} striped withTableBorder withColumnBorders highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data?.map((client) => (
              <Table.Tr key={client.id} onClick={() => open(client.id)} style={{ cursor: 'pointer' }}>
                <Table.Td>
                  {client.user.first_name} {client.user.last_name}
                </Table.Td>
                <Table.Td>{client.user.email}</Table.Td>
                <Table.Td>
                  {client.is_active ? <LuUserRoundCheck color="green" /> : <LuUserRoundX color="red" />}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>

      <ClientModal opened={opened} close={close} clientId={selectedClientId} title="General Client Details" />
    </>
  );
};

export default GeneralClients;
