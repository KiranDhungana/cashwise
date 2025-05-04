import { ReactNode } from "react";
import { BackgroundImage, Card } from "@mantine/core";

type BalanceoverviewProps = {
  icon: ReactNode;
  title: string;
  amount: string;
  amountColor?: string; // optional custom color class like "text-green-700"
  description?: string;
};

const Balanceoverview = ({
  icon,
  title,
  amount,
  amountColor = "text-green-700",
  description,
}: BalanceoverviewProps) => {
  return (
    <Card withBorder padding="md" className="bg-white p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-700">
          {icon}
          <span className="text-sm font-semibold">{title}</span>
        </div>
        <span className={`font-bold ${amountColor}`}>{amount}</span>
      </div>
      {description && <p className="text-xs text-gray-400">{description}</p>}
    </Card>
  );
};
export default Balanceoverview;
