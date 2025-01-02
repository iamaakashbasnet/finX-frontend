import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Anchor, Button, Loader, Modal, Text, TextInput, useMantineTheme } from '@mantine/core';
import { CiAt } from 'react-icons/ci';
import { LuUserRoundCheck } from 'react-icons/lu';

import { checkUserEmailExist } from './api';

interface ClientModalProps {
  opened: boolean;
  close: () => void;
  title: string;
}

export default function GeneralClientCreateModal({ opened, close, title }: ClientModalProps) {
  const theme = useMantineTheme();
  const [email, setEmail] = useState('');

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const { mutateAsync, status } = useMutation({
    mutationFn: (email: string) => checkUserEmailExist({ email: email }),
  });

  useEffect(() => {
    const checkEmail = async () => {
      if (isValidEmail(email)) {
        await mutateAsync(email);
      }
    };
    checkEmail();
  }, [email, mutateAsync]);

  return (
    <Modal.Root opened={opened} onClose={close} size="lg">
      <Modal.Overlay backgroundOpacity={0.55} blur={3} />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title fw="bold">{title}</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <form>
            <div>
              <TextInput
                label="Email address"
                placeholder="test@test.com"
                leftSection={<CiAt size={16} />}
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
                rightSection={
                  isValidEmail(email) &&
                  (status === 'pending' ? (
                    <Loader color="blue" size="sm" />
                  ) : (
                    status === 'success' && <LuUserRoundCheck color={theme.colors.blue[6]} size={20} />
                  ))
                }
              />
              <br />
              {status === 'error' && isValidEmail(email) && (
                <Text size="sm" c="dimmed">
                  User with email doesn't exist, <Anchor>send email?</Anchor>
                </Text>
              )}
            </div>
            <Button type="submit" fullWidth mt="xl" size="md">
              Add General Client
            </Button>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
