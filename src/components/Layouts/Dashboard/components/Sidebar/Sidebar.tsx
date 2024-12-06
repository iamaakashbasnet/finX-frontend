import { Link } from 'react-router-dom';
import { NavLink } from '@mantine/core';
import { TbUsersGroup } from 'react-icons/tb';
import { FaRegBuilding } from 'react-icons/fa';

const data = [
  {
    label: 'Clients',
    icon: <TbUsersGroup size="1rem" />,
    links: [
      { label: 'Review Clients', path: '/review-clients' },
      { label: 'Manage Clients', path: '/manage-clients' },
    ],
  },
  {
    label: 'Firm',
    icon: <FaRegBuilding size="1rem" />,
    links: [
      { label: 'Review Firm', path: '/review-firm' },
      { label: 'Manage Firm', path: '/manage-firm' },
    ],
  },
];

export default function Sidebar() {
  return (
    <>
      {data.map((singleData, index) => (
        <NavLink
          key={singleData.label}
          href="#required-for-focus"
          label={singleData.label}
          leftSection={singleData.icon}
          childrenOffset={28}
          fw="bold"
          defaultOpened={index == 0}
        >
          {singleData.links.map((subMenu) => (
            <NavLink
              key={subMenu.label}
              component={Link}
              to={subMenu.path}
              label={subMenu.label}
              style={{
                borderLeft: '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
              }}
            />
          ))}
        </NavLink>
      ))}
    </>
  );
}
