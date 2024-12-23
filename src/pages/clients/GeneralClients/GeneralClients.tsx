import { useQuery } from '@tanstack/react-query';
import { Space, Table, Text, Modal, Paper } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { LuUserRoundCheck, LuUserRoundX } from 'react-icons/lu';

import { fetchGeneralClients } from './api';

export default function GeneralClients() {
  const [opened, { open, close }] = useDisclosure(false);

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
              <Table.Tr key={client.user.id} onClick={open} style={{ cursor: 'pointer' }}>
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

      <Modal
        opened={opened}
        onClose={close}
        title="Clients Details"
        size="xl"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Text>This modal will contain a form for updating clients data</Text>
      </Modal>
    </>
  );
}
