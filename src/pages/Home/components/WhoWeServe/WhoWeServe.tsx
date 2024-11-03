import { Accordion, Box, Grid, Space, Text, Title } from '@mantine/core';
import { FcManager } from 'react-icons/fc';
import { GiFamilyHouse } from 'react-icons/gi';
import { FcDepartment } from 'react-icons/fc';

import featureTitleClasses from './../FeaturesTitle/FeaturesTitle.module.css';
import classes from './WhoWeServe.module.css';

const groceries = [
  {
    emoji: <FcManager size="1.5rem" />,
    value: 'Individuals',
    description:
      'Take control of your financial future. finX empowers individual investors with tools to manage personal portfolios effectively, ensuring you have the insights needed for informed decision-making.',
  },
  {
    emoji: <FcDepartment size="1.5rem" />,
    value: 'Institutions',
    description:
      'Optimize your operations with finXs robust platform. Designed for investment firms, our solution provides seamless asset management, compliance tracking, and advanced analytics to enhance client services.',
  },
  {
    emoji: <GiFamilyHouse size="1.5rem" />,
    value: 'Family Offices',
    description:
      'Ultra-high-net-worth families invest with sophistication. We’re here to help you serve their unique needs. No two family offices are alike. Whatever your strategy, finXs family office software helps you handle complexity efficiently — preserving family wealth for generations to come.',
  },
];

const WhoWeServe = () => {
  return (
    <div className={featureTitleClasses.wrapper}>
      <Grid gutter={40}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title order={2}>Who we serve?</Title>
          <Space h="md" />
          <Text c="dimmed">
            A complete, transformative technology and data platform. Work without limits: any data, unlimited scale,
            tailored to your needs and your clients expectations. All delivered in a single platform that’s powerful yet
            simple to use.
          </Text>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <WhoWeServeAccordion />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default WhoWeServe;

function WhoWeServeAccordion() {
  const items = groceries.map((item) => (
    <Accordion.Item key={item.value} value={item.value} classNames={classes}>
      <Accordion.Control icon={item.emoji}>
        <Text fw={800}>{item.value}</Text>
      </Accordion.Control>
      <Accordion.Panel>
        <Box p="sm">
          <Text size="sm">{item.description}</Text>
        </Box>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion variant="filled" defaultValue="Institutions">
      {items}
    </Accordion>
  );
}
