import { useState } from 'react';
import { Container, Group, Burger, Image, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import logo from 'assets/logo.png';
import classes from './Header.module.css';

const links = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/clients', label: 'Clients' },
];

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Group>
          <Image src={logo} h={40} w="auto" fit="contain" />
          <Text>finX</Text>
        </Group>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
