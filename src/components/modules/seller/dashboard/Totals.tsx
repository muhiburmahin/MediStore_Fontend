/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMemo } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";

interface TotalsData {
    name: string;
    value: number;
    fill: string;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    value,
    percent,
}: any) => {
    const radius = outerRadius + 35;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            <path d={`M${sx},${sy}L${x},${y}`} stroke="#999" fill="none" />
            <circle cx={x} cy={y} r={2} fill="#999" stroke="none" />
            <text
                x={x + (cos >= 0 ? 1 : -1) * 12}
                y={y}
                textAnchor={textAnchor}
                fill="#333"
                dominantBaseline="central"
                className="text-sm"
            >
                {`${value} (${(percent * 100).toFixed(1)}%)`}
            </text>
        </g>
    );
};

export default function TotalsPie({ totalsData }: { totalsData: TotalsData[] }) {
    const totalValue = useMemo(
        () => totalsData.reduce((acc, curr) => acc + curr.value, 0),
        [totalsData]
    );

    return (
        <Card className="shadow-md hover:shadow-2xl">
            <CardHeader>
                <CardTitle>Overall Totals</CardTitle>
            </CardHeader>
            <CardContent className="h-96 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-sm text-muted-foreground">Total Items</p>
                    <p className="text-3xl font-bold">
                        {totalValue.toLocaleString()}
                    </p>
                </div>

                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Tooltip
                            cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1 }}
                            contentStyle={{
                                background: "hsl(var(--background))",
                                borderColor: "hsl(var(--border))",
                                borderRadius: "var(--radius)",
                            }}
                        />
                        <Pie
                            data={totalsData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={110}
                            paddingAngle={3}
                            labelLine={false}
                            label={renderCustomizedLabel}
                        >
                            {totalsData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>

            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 p-4">
                {totalsData.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2">
                        <span
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: entry.fill }}
                        />
                        <span className="text-sm text-muted-foreground">
                            {entry.name}
                        </span>
                    </div>
                ))}
            </div>
        </Card>
    );
}