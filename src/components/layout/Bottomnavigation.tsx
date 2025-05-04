"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Tabs, Box, useMantineTheme } from "@mantine/core";
import { IconHome, IconChartBar, IconTarget, IconPackage, IconUsers } from "@tabler/icons-react";

const Bottomnavigation: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useMantineTheme();

  const currentTab = pathname === "/" ? "home" : pathname.slice(1);

  const handleChange = (value: string | null) => {
    const tab = value ?? "home";
    router.push(tab === "home" ? "/home" : `/${tab}`);
  };

  const tabs = [
    { value: "home", icon: <IconHome size={24} />, label: "Home" },
    { value: "insights", icon: <IconChartBar size={24} />, label: "Insights" },
    { value: "goals", icon: <IconTarget size={24} />, label: "Goals" },
    { value: "groupvault", icon: <IconPackage size={24} />, label: "GroupVault" },
    { value: "social", icon: <IconUsers size={24} />, label: "Social" },
  ];

  return (
    <Box
      component="footer"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        display: "flex",
        borderTop: `1px solid ${theme.colors.gray[3]}`,
        backgroundColor: theme.white,
        zIndex: 100,
      }}
    >
      <Tabs
        value={currentTab}
        onChange={handleChange}
        variant="unstyled"
        keepMounted={false}
        style={{ display: "flex", flex: 1 }}
      >
        <Tabs.List style={{ display: "flex", width: "100%", padding: 0, margin: 0 }}>
          {tabs.map((tab) => (
            <Tabs.Tab
              key={tab.value}
              value={tab.value}
              leftSection={tab.icon}
              style={{
                flex: 1,
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {tab.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    </Box>
  );
};

export default Bottomnavigation;
