import { Menu, rem, Avatar, ActionIcon } from '@mantine/core';
import { CiLogout } from 'react-icons/ci';
import { GrDocumentTransfer } from 'react-icons/gr';
import { VscSettings } from 'react-icons/vsc';

export default function TopbarMenu() {
  return (
    <Menu shadow="md" width={200} arrowPosition="center" withArrow>
      <Menu.Target>
        <ActionIcon variant="transparent" radius="xl" size="xl">
          <Avatar src="https://randomuser.me/api/portraits/men/83.jpg" radius="xl">
            JD
          </Avatar>
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item leftSection={<VscSettings style={{ width: rem(14), height: rem(14) }} />}>Settings</Menu.Item>

        <Menu.Divider />

        <Menu.Label>Account</Menu.Label>
        <Menu.Item leftSection={<GrDocumentTransfer style={{ width: rem(14), height: rem(14) }} />}>
          Transfer my data
        </Menu.Item>
        <Menu.Item color="red" leftSection={<CiLogout style={{ width: rem(14), height: rem(14) }} />}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
