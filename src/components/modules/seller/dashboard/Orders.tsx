/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface OrderStatusData {
    name: string;
    value: number;
    fill: string;
}

export default function OrderStatusPie({
    orderStatusData,
}: {
    orderStatusData: OrderStatusData[];
}) {
    const totalValue = useMemo(
        () => orderStatusData.reduce((acc, curr) => acc + curr.value, 0),
        [orderStatusData],
    );

    return (
        <Card className="shadow-md hover:shadow-xl transition-all duration-300 border-none bg-white dark:bg-slate-900">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-slate-700 dark:text-slate-200">
                    Order Success Rate
                </CardTitle>
            </CardHeader>
            <CardContent className="h-[350px] w-full relative p-0">
                {/* চার্টের মাঝখানে টোটাল নাম্বার */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none">
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest leading-none">
                        Total Orders
                    </p>
                    <p className="text-3xl font-black text-slate-800 dark:text-white mt-1">
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
                            data={orderStatusData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius="65%"  // ডোনাট স্টাইল
                            outerRadius="90%"
                            paddingAngle={5}   // স্লাইসগুলোর মধ্যে গ্যাপ
                            stroke="none"
                        >
                            {orderStatusData.map((entry, index) => (
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
                                const percent = totalValue > 0 ? ((val / totalValue) * 100).toFixed(1) : 0;
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