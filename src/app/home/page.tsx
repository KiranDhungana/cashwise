"use client";
import Gaugechart from "@/components/shared/Gaugechart";
import { Badge, Card, Avatar, Indicator } from "@mantine/core";
import { Bell, BuildingBank, CreditCard, Wallet, PigMoney } from "tabler-icons-react";
import { Menu, Button } from "@mantine/core";
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconUser,
} from "@tabler/icons-react";
import Bottomnavigation from "@/components/layout/Bottomnavigation";
import { useRouter } from "next/navigation";
import Topnav from "@/components/layout/Topnav";
import Balanceoverview from "@/components/shared/Balanceoverview";

const Home = () => {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      {/* Top Navigation */}
      {/* Monthly Overview Card */}
      <Card shadow="sm" padding="lg" radius="md" className="max-w-md mx-auto bg-white mb-8 p-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-md text-gray-600">Monthly Overview</h2>
            <p className="text-sm text-gray-500">February 2025</p>
          </div>
          <Badge color="green" variant="light" radius="sm">
            $870 saved
          </Badge>
        </div>
        <div className="flex flex-row justify-center">
          <Gaugechart></Gaugechart>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center mt-14">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-800 font-semibold">Income</p>
            <p className="text-lg font-bold text-green-900">$9,000</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-red-800 font-semibold">Expenses</p>
            <p className="text-lg font-bold text-red-900">$8,130</p>
          </div>
        </div>

        <div className="mt-4 bg-green-50 text-green-700 text-sm rounded-md p-2 text-center">
          ✅ On track to save $870 this month!
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8">
        <Balanceoverview
          icon={<BuildingBank size={20} />}
          title="Checking"
          amount="$2,458.32"
          description="•••• 4567"
        />
        <Balanceoverview
          icon={<CreditCard size={20} />}
          title="Credit Card"
          amount="$1,243.67"
          description="•••• 4567"
          amountColor="text-red-700"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto ">
        <Balanceoverview icon={<Wallet size={20} />} title="Net Cash" amount="$1,243.67" description="•••• 4567" />
        <Balanceoverview icon={<PigMoney size={20} />} title="Saving" amount="$1,243.67" description="•••• 4567" />
      </div>
      <div className="h-[50px]"></div>
      <Bottomnavigation></Bottomnavigation>
    </main>
  );
};

export default Home;
