import type { ForecastData } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePreferences } from "@/context/usePreference";
import { correctTempUnits } from "@/lib/utils";
import { format } from "date-fns";
import { useMemo } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface HourlyTemperatureProps {
  data: ForecastData;
}

const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
  const {
    state: { timeFormat, unit },
  } = usePreferences();

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return timeFormat === "12-hour"
      ? format(date, "hh:mm a")
      : timeFormat === "24-hour"
      ? format(date, "HH:mm")
      : null;
  };

  const chartData = data.list.slice(0, 8).map((item) => ({
    time: formatTime(item.dt),
    temp: Math.round(item.main.temp),
    feelsLike: Math.round(item.main.feels_like),
  }));

  const yAxisDomain = useMemo(() => {
    if (unit === "standard") {
      const minTemp = Math.min(
        ...chartData.map((item) => Math.min(item.temp, item.feelsLike))
      );
      const maxTemp = Math.max(
        ...chartData.map((item) => Math.max(item.temp, item.feelsLike))
      );
      const padding = (maxTemp - minTemp) * 0.1; // 10% padding
      return [Math.floor(minTemp - padding), Math.ceil(maxTemp + padding)];
    }
    return undefined; // default auto scaling for Celsius and Fahrenheit
  }, [chartData, unit]);

  // const { yAxisTicks, yAxisDomain } = useMemo(() => {
  //   const temps = chartData.flatMap((item) => [item.temp, item.feelsLike]);
  //   const minTemp = Math.min(...temps);
  //   const maxTemp = Math.max(...temps);
  //   const range = maxTemp - minTemp;
  //   const step = Math.ceil(range / 4); // We want 5 ticks, so 4 intervals

  //   const ticks = [];
  //   const start = Math.floor(minTemp / step) * step; // Round down to nearest multiple of step
  //   for (let i = 0; i < 5; i++) {
  //     ticks.push(start + i * step);
  //   }

  //   return {
  //     yAxisTicks: ticks,
  //     yAxisDomain: [ticks[0], ticks[ticks.length - 1]],
  //   };
  // }, [chartData]);

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Today's Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[12.5rem] w-full">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart data={chartData}>
              <XAxis
                dataKey={"time"}
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={unit === "standard" ? yAxisDomain : undefined}
                tickFormatter={(value) => {
                  const formattedValue = correctTempUnits(value, unit);
                  return formattedValue !== null ? formattedValue : "";
                }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length > 0) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Temperature
                            </span>
                            <span className="font-bold">
                              {correctTempUnits(payload?.[0].value, unit)}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Feels Like
                            </span>
                            <span className="font-bold">
                              {correctTempUnits(payload?.[1].value, unit)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type={"monotone"}
                dataKey={"temp"}
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type={"monotone"}
                dataKey={"feelsLike"}
                stroke="#64748b"
                strokeWidth={2}
                dot={false}
                strokeDasharray={"5 5"}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyTemperature;
