import { Modal, Text, Avatar, Badge, Space, Flex, Center } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { fetchGeneralClientDetails } from './../../GeneralClients/api';

interface ClientModalProps {
  opened: boolean;
  close: () => void;
  title: string;
  clientId: number | null;
}

export default function ClientModal({ opened, close, title, clientId }: ClientModalProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['fetch-general-client-detail'],
    queryFn: () => fetchGeneralClientDetails(clientId),
    enabled: opened && clientId !== null,
  });

  return (
    <Modal.Root opened={opened} onClose={close} fullScreen>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title fw="bold">{title}</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <>
              <Center>
                <Avatar size="xl" radius="xl" color="blue">
                  {data?.user.first_name[0]}
                  {data?.user.last_name[0]}
                </Avatar>
              </Center>
              <Space h="md" />
              <Flex align="center" direction="column" gap={5}>
                <Text size="lg" fw={500}>
                  {data?.user.first_name} {data?.user.last_name}
                </Text>
                <Text size="sm">{data?.user.email}</Text>
                <Badge color={data?.is_active ? 'green' : 'red'}>{data?.is_active ? 'Active' : 'Inactive'}</Badge>
              </Flex>
            </>
          )}
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
