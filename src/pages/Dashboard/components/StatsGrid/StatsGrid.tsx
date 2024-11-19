import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
import { FaRegUserCircle } from 'react-icons/fa';
import { CiDiscount1 } from 'react-icons/ci';
import { TbBrandCashapp } from 'react-icons/tb';
import { GiCoinflip } from 'react-icons/gi';
import { PiArrowCircleUpRightDuotone } from 'react-icons/pi';
import { PiArrowCircleDownLeftDuotone } from 'react-icons/pi';

import classes from './StatsGrid.module.css';

const icons = {
  user: FaRegUserCircle,
  discount: CiDiscount1,
  receipt: TbBrandCashapp,
  coin: GiCoinflip,
};

const data = [
  { title: 'Revenue', icon: 'receipt', value: 'Rs.13,456', diff: 34 },
  { title: 'Profit', icon: 'coin', value: 'Rs.4,145', diff: -13 },
  { title: 'New Clients', icon: 'user', value: '188', diff: -30 },
] as const;

export default function StatsGrid() {
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? PiArrowCircleUpRightDuotone : PiArrowCircleDownLeftDuotone;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          <Text c={stat.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" />
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });

  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>{stats}</SimpleGrid>
    </div>
  );
}
