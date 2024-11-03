import { Text, Container, ActionIcon, Group, rem, Image, Flex } from '@mantine/core';
import { FaXTwitter, FaInstagram } from 'react-icons/fa6';
import { FaYoutube } from 'react-icons/fa';

import logo from 'assets/logo.png';
import classes from './Footer.module.css';

const data = [
  {
    title: 'About',
    links: [
      { label: 'Features', link: '#' },
      { label: 'Pricing', link: '#' },
      { label: 'Support', link: '#' },
      { label: 'Forums', link: '#' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Clients', link: '#' },
      { label: 'Partners', link: '#' },
      { label: 'Product Ideas', link: '#' },
    ],
  },
  {
    title: 'Legal and Privacy',
    links: [
      { label: 'Terms of Use', link: '#' },
      { label: 'Privacy Policy', link: '#' },
      { label: 'Changelog', link: '#' },
      { label: 'Releases', link: '#' },
    ],
  },
];

export default function Footer() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
        c="dimmed"
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title} fw="bold">
          {group.title}
        </Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Flex align="center" gap={5} mb={5}>
            <Image src={logo} h={40} w="auto" fit="contain" />
            <Text>finX</Text>
          </Flex>
          <Text size="xs" c="dimmed" className={classes.description}>
            Next generation cloud based multi asset complex portfolio and wealth management software platform
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © {new Date().getFullYear()} finX. All rights reserved.
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <FaXTwitter style={{ width: rem(18), height: rem(18) }} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <FaYoutube style={{ width: rem(18), height: rem(18) }} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <FaInstagram style={{ width: rem(18), height: rem(18) }} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
