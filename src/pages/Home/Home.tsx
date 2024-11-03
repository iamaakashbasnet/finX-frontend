import { Flex, Container, Title, useMantineTheme, Box, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import FeaturesTitle from './components/FeaturesTitle';
import { Dots } from './components/Dots';

import classes from './Home.module.css';
import WhoWeServe from './components/WhoWeServe';
import FinxSteps from './components/FinxSteps';

export default function Home() {
  const theme = useMantineTheme();
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

  return (
    <>
      <Container fluid>
        <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
        <Dots className={classes.dots} style={{ right: 0, top: 60 }} />
        <section>
          <Flex justify="center" align="center" direction="column" gap="md" mt="lg" style={{ textAlign: 'center' }}>
            <Title order={1} size="h1" fw={300} px={isDesktop ? '15rem' : '1rem'}>
              Next generation cloud based multi asset complex portfolio and wealth management software platform
            </Title>
          </Flex>
        </section>

        <Box mt="10rem">
          <FeaturesTitle />
        </Box>

        <Box mt="10rem">
          <WhoWeServe />
        </Box>

        <Box mt="10rem" px="5rem">
          <Flex justify="center" align="center" direction="column" gap="md" mt="lg" style={{ textAlign: 'center' }}>
            <Text c="dimmed">Tailored Solutions</Text>
            <Title order={1} size="h1" fw={300} px={isDesktop ? '15rem' : '1rem'}>
              One size doesn't have to fit all
            </Title>
            <Text>
              It's easier than ever for firms to adopt finX. Whether you have limited resources or a broad array of
              advisor teams, we have a solution to meet your needs. We offer options that optimize for speedy
              implementation as well as the tools, templates, and training to quickly move you forward.
            </Text>
          </Flex>
        </Box>

        <Box mt="10rem">
          <FinxSteps />
        </Box>
      </Container>
    </>
  );
}
