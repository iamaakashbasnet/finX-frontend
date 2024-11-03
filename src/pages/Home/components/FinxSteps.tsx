import { Timeline, Text, Grid, Title, Space, Center } from '@mantine/core';
import { PiHandshakeDuotone } from 'react-icons/pi';
import { TbWorldWww } from 'react-icons/tb';
import { FcTemplate } from 'react-icons/fc';

import featureTitleClasses from './FeaturesTitle/FeaturesTitle.module.css';

export default function FinxSteps() {
  return (
    <div className={featureTitleClasses.wrapper}>
      <Grid gutter={40}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Center>
            <Timeline active={1} bulletSize={24} lineWidth={2}>
              <Timeline.Item bullet={<PiHandshakeDuotone size={12} />} title="Meet">
                <Text c="dimmed" size="sm">
                  Contact us with your requirements
                </Text>
                <Text size="xs" mt={4}>
                  1st step
                </Text>
              </Timeline.Item>

              <Timeline.Item bullet={<TbWorldWww size={12} />} title="Platform Creation">
                <Text c="dimmed" size="sm">
                  Creation of your own custom software platform with custom domain
                </Text>
                <Text size="xs" mt={4}>
                  2nd step
                </Text>
              </Timeline.Item>

              <Timeline.Item title="Your own finX" bullet={<FcTemplate size={12} />} lineVariant="dashed">
                <Text c="dimmed" size="sm">
                  Ready to use platform
                </Text>
                <Text size="xs" mt={4}>
                  Voilà. You are all set!
                </Text>
              </Timeline.Item>
            </Timeline>
          </Center>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title order={2}>Steps To Get Started</Title>
          <Space h="md" />
          <Text c="dimmed">
            finX is a single source based platform but with multi tenancy approach meaning all your data are safe and
            secure with complete isolation with other companies. We listen to your feedbacks and make continuous
            development to our platform
          </Text>
        </Grid.Col>
      </Grid>
    </div>
  );
}
