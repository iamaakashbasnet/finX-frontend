import { Image, Flex, Container, Button, Text, Title } from '@mantine/core';

import logo from 'assets/logo.png';

const Home = () => {
  return (
    <Container>
      <Flex
        justify="center"
        align="center"
        direction="column"
        gap="md"
        style={{ height: '100vh', textAlign: 'center' }}
      >
        <Image radius="md" h={200} w="auto" fit="contain" src={logo} />
        <Title order={1} size="h1">
          finX
        </Title>
        <Text>Next generation cloud based complex portfolio and wealth management software platform</Text>
        <Button>Get Started</Button>
      </Flex>
    </Container>
  );
};

export default Home;
