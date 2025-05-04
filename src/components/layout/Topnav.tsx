"use client";
import { Indicator } from "@mantine/core";
import { Bell, PigMoney } from "tabler-icons-react";
import { Menu } from "@mantine/core";
import { IconSettings, IconSearch, IconUser } from "@tabler/icons-react";
const Topnav = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-3">
        <div className="bg-green-100 text-green-800 rounded-lg p-2">
          <PigMoney size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CashWise</h1>
          <p className="text-sm text-gray-600 -mt-1">Grow Your Financial Journey</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Indicator inline color="red" size={8}>
          <Bell className="text-gray-600 cursor-pointer" />
        </Indicator>

        <Menu shadow="md" width={200}>
          <Menu.Target>
            <IconUser className="text-gray-600  cursor-pointer"></IconUser>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>General</Menu.Label>
            <Menu.Item leftSection={<IconUser size={14} />}>Profile</Menu.Item>
            <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
            <Menu.Item leftSection={<IconSearch size={14} />}>Search</Menu.Item>

            <Menu.Divider />
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
};
export default Topnav;
