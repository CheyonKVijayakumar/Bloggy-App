
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const chartData = [
  { name: "Jan", credits: 4000 },
  { name: "Feb", credits: 3000 },
  { name: "Mar", credits: 2000 },
  { name: "Apr", credits: 2780 },
  { name: "May", credits: 1890 },
  { name: "Jun", credits: 2390 },
];

export function CreditsChart() {
  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>Credits Minted Overview</CardTitle>
        <CardDescription>
          A look at carbon credits minted over the last 6 months.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
              }}
            />
            <Legend />
            <Bar dataKey="credits" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
