import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Anchor, Button, Loader, Modal, NumberInput, TextInput, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';
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

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: email,
      payment: 0.0,
    },
  });

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
          <form onSubmit={form.onSubmit(async (values) => console.log(values))}>
            <div>
              <TextInput
                label="Email address"
                placeholder="test@test.com"
                leftSection={<CiAt size={16} />}
                value={email}
                onChange={(event) => {
                  setEmail(event.currentTarget.value);
                  form.getInputProps('email').onChange(event); // Trigger form change
                }}
                rightSection={
                  isValidEmail(email) &&
                  (status === 'pending' ? (
                    <Loader color="blue" size="sm" />
                  ) : (
                    status === 'success' && <LuUserRoundCheck color={theme.colors.blue[6]} size={20} />
                  ))
                }
                error={
                  status === 'error' && isValidEmail(email) ? (
                    <>
                      User with email doesn't exist{' '}
                      <Anchor size="xs" underline="always">
                        send email?
                      </Anchor>
                    </>
                  ) : null
                }
                key={form.key('email')}
              />
              <br />
            </div>
            <div>
              <NumberInput
                label="Payment"
                placeholder="Initial payment receivable"
                prefix="Rs. "
                defaultValue={100}
                mb="md"
                key={form.key('payment')}
                {...form.getInputProps('payment')}
              />
            </div>
            <Button type="submit" fullWidth mt="xl" size="md" disabled={status === 'error' || status === 'pending'}>
              Add General Client
            </Button>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
