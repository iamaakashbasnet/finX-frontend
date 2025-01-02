import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Anchor, Button, Loader, Modal, NumberInput, TextInput, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import { CiAt } from 'react-icons/ci';
import { LuUserRoundCheck } from 'react-icons/lu';

import { checkUserEmailExist, createGeneralClient } from './api';
import { notifications } from '@mantine/notifications';

interface ClientModalProps {
  opened: boolean;
  close: () => void;
  title: string;
}

export default function GeneralClientCreateModal({ opened, close, title }: ClientModalProps) {
  const theme = useMantineTheme();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      user_email: email,
      payments: 0.0,
    },
  });

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const { mutateAsync: checkUserEmailExistMutation, status: checkUserEmailExistStatus } = useMutation({
    mutationFn: (email: string) => checkUserEmailExist({ email: email }),
  });

  const { mutateAsync: createClientMutation } = useMutation({
    mutationFn: (body: { user_email: string; payments: number }) => createGeneralClient(body),
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'General client successfully created.',
      });
      close();
      queryClient.invalidateQueries({ queryKey: ['fetch-general-clients'] });
    },
  });

  useEffect(() => {
    const checkEmail = async () => {
      if (isValidEmail(email)) {
        await checkUserEmailExistMutation(email);
      }
    };
    checkEmail();
  }, [email, checkUserEmailExistMutation]);

  return (
    <Modal.Root opened={opened} onClose={close} size="lg">
      <Modal.Overlay backgroundOpacity={0.55} blur={3} />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title fw="bold">{title}</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={form.onSubmit(async (values) => await createClientMutation(values))}>
            <div>
              <TextInput
                label="Email address"
                placeholder="test@test.com"
                leftSection={<CiAt size={16} />}
                value={email}
                onChange={(event) => {
                  setEmail(event.currentTarget.value);
                  form.getInputProps('user_email').onChange(event); // Trigger form change
                }}
                rightSection={
                  isValidEmail(email) &&
                  (checkUserEmailExistStatus === 'pending' ? (
                    <Loader color="blue" size="sm" />
                  ) : (
                    checkUserEmailExistStatus === 'success' && (
                      <LuUserRoundCheck color={theme.colors.blue[6]} size={20} />
                    )
                  ))
                }
                error={
                  checkUserEmailExistStatus === 'error' && isValidEmail(email) ? (
                    <>
                      User with email doesn't exist{' '}
                      <Anchor size="xs" underline="always">
                        send email?
                      </Anchor>
                    </>
                  ) : null
                }
                key={form.key('user_email')}
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
                key={form.key('payments')}
                {...form.getInputProps('payments')}
              />
            </div>
            <Button
              type="submit"
              fullWidth
              mt="xl"
              size="md"
              disabled={checkUserEmailExistStatus === 'error' || checkUserEmailExistStatus === 'pending'}
            >
              Add General Client
            </Button>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
