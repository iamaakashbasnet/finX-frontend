import { Title, SimpleGrid, Text, Button, Grid, Space } from '@mantine/core';

import features from './data.json';
import classes from './FeaturesTitle.module.css';

export default function FeaturesTitle() {
  const items = features.map((feature) => (
    <div key={feature.title}>
      <Text fz="lg" mt="sm" fw={500}>
        {feature.title}
      </Text>
      <Text c="dimmed" fz="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <div className={classes.wrapper}>
      <Grid gutter={80}>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Title className={classes.title} order={2}>
            A platform built to simplify complexity
          </Title>
          <Space h="md" />
          <Text c="dimmed">
            finX empowers investment professionals with data, insights and cutting-edge technology so that you can do
            what you do best—even better.
          </Text>

          <Button size="lg" radius="md" mt="xl">
            Connect With Us
          </Button>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
            {items}
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </div>
  );
}
