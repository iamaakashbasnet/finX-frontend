import { Outlet } from 'react-router-dom';
import { AppShell, Burger, Group, Image, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import logo from 'assets/logo.png';
import Sidebar from './components/Sidebar';

export default function BasicAppShell() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Image src={logo} h={40} w="auto" fit="contain" />
          <Text fw="900">{window.location.hostname.split('.')[0].toUpperCase()}</Text>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
