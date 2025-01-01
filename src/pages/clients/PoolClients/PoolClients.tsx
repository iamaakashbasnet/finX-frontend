import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Space, Table, Text, Paper } from '@mantine/core';
import { LuUserRoundCheck, LuUserRoundX } from 'react-icons/lu';

import ClientModal from './PoolClientModal';
import { fetchPoolClients } from './api';

export default function PoolClients() {
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
    queryKey: ['fetch-pool-clients'],
    queryFn: () => fetchPoolClients(),
  });

  return (
    <>
      <Text size="lg" fw="bold">
        Pool Clients
      </Text>
      <Text size="sm" c="dimmed" pl="sm">
        Pool client's portfolio are managed together and treated as a single entity or pool.
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
              <Table.Th>Shares</Table.Th>
              <Table.Th>NAV Value</Table.Th>
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
                <Table.Td>{client.shares_amount}</Table.Td>
                <Table.Td>{client.nav_value}</Table.Td>
                <Table.Td>
                  {client.is_active ? <LuUserRoundCheck color="green" /> : <LuUserRoundX color="red" />}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>

      <ClientModal opened={opened} close={close} clientId={selectedClientId} title="Pool Client Details" />
    </>
  );
}
