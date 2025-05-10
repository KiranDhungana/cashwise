// types/goal.ts
export interface Goal {
  id: string;
  title: string;
  description?: string;
  amountSaved: number;
  goalAmount: number;
  daysLeft: number;
  frequencyLabel?: string; // e.g. "$84 monthly", or "$20 weekly"
  progressColor?: string; // e.g. theme.colors.green[6]
}
