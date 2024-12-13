import { useSelector } from 'react-redux';
import { Center, Divider, SimpleGrid, Skeleton } from '@mantine/core';
import { PieChart } from '@mantine/charts';

import StatsGrid from './components/StatsGrid';
import { RootState } from 'state/store';

const pieChartData = [
  { name: 'Commercial Banks', value: 400, color: 'indigo.6' },
  { name: 'Micro Finance', value: 300, color: 'yellow.6' },
  { name: 'Hydropower', value: 300, color: 'teal.6' },
  { name: 'Others', value: 200, color: 'gray.6' },
];

export default function Dashboard() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <>
      <h1>
        Welcome {user.first_name} {user.last_name}!
      </h1>
      <StatsGrid />
      <Divider my="md" />
      <h2>Portfolio Composition</h2>
      <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="md">
        <div>
          <Skeleton height={30} mt={20} radius="sm" />
          <Skeleton height={30} mt={20} radius="sm" />
          <Skeleton height={30} mt={20} radius="sm" />
          <Skeleton height={30} mt={20} radius="sm" />
          <Skeleton height={30} mt={20} radius="sm" />
        </div>
        <Center>
          <PieChart
            labelsPosition="outside"
            labelsType="percent"
            data={pieChartData}
            tooltipDataSource="segment"
            withLabelsLine
            withLabels
            withTooltip
            size={250}
          />
        </Center>
      </SimpleGrid>
    </>
  );
}
