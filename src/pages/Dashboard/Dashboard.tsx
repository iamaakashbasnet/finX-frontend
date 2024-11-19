import { Divider } from '@mantine/core';
import { PieChart } from '@mantine/charts';

import StatsGrid from './components/StatsGrid';

const pieChartData = [
  { name: 'Commercial Banks', value: 400, color: 'indigo.6' },
  { name: 'Micro Finance', value: 300, color: 'yellow.6' },
  { name: 'Hydropower', value: 300, color: 'teal.6' },
  { name: 'Others', value: 200, color: 'gray.6' },
];

export default function Dashboard() {
  return (
    <>
      <h1>Welcome John Doe!</h1>
      <StatsGrid />
      <Divider my="md" />
      <h2>Portfolio Composition</h2>
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
    </>
  );
}
