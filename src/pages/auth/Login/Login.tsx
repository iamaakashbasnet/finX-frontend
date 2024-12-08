import { Paper, TextInput, PasswordInput, Checkbox, Button, Title, Text, Anchor } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useForm } from '@mantine/form';

import { AppDispatch, RootState } from 'state/store';
import { loginAsync } from 'state/user/userSlice';
import classes from './Login.module.css';

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const state = location.state as { next: string };
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
    },
  });

  if (isAuthenticated) {
    if (location.state) {
      return <Navigate to={state.next} />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          finX
        </Title>

        <form onSubmit={form.onSubmit(async (values) => await dispatch(loginAsync(values)))}>
          <TextInput
            label="Username or Email address"
            placeholder="hello@gmail.com or username"
            size="md"
            key={form.key('username')}
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button type="submit" fullWidth mt="xl" size="md">
            Login
          </Button>
        </form>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor<'a'> href="#" fw={700} onClick={(event) => event.preventDefault()}>
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
