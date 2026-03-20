/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMemo } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";

interface TotalsData {
    name: string;
    value: number;
    fill: string;
}

export default function TotalsPie({ totalsData }: { totalsData: TotalsData[] }) {
    const totalValue = useMemo(
        () => totalsData.reduce((acc, curr) => acc + curr.value, 0),
        [totalsData]
    );

    return (
        <Card className="shadow-md hover:shadow-xl transition-all duration-300 border-none bg-white dark:bg-slate-900">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-slate-700 dark:text-slate-200">
                    Overall Totals
                </CardTitle>
            </CardHeader>
            <CardContent className="h-[350px] w-full relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none">
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                        Total Items
                    </p>
                    <p className="text-3xl font-black text-slate-800 dark:text-white">
                        {totalValue.toLocaleString()}
                    </p>
                </div>

                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Tooltip
                            contentStyle={{
                                background: "hsl(var(--background))",
                                borderColor: "hsl(var(--border))",
                                borderRadius: "12px",
                                fontSize: "12px"
                            }}
                        />
                        <Pie
                            data={totalsData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius="65%"
                            outerRadius="90%"
                            paddingAngle={5}
                            stroke="none"
                        >
                            {totalsData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.fill}
                                    className="hover:opacity-80 transition-opacity outline-none"
                                />
                            ))}
                        </Pie>

                        <Legend
                            verticalAlign="bottom"
                            align="center"
                            iconType="circle"
                            layout="horizontal"
                            formatter={(value, entry: any) => {
                                const { value: val } = entry.payload;
                                const percent = ((val / totalValue) * 100).toFixed(1);
                                return (
                                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 ml-1">
                                        {value} ({percent}%)
                                    </span>
                                );
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}