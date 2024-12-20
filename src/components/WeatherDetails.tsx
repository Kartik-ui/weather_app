import type { WeatherData } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePreferences } from "@/context/usePreference";
import { format } from "date-fns";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const {
    state: { timeFormat },
  } = usePreferences();
  const { wind, main, sys } = data;

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return timeFormat === "12-hour"
      ? format(date, "hh:mm a")
      : timeFormat === "24-hour"
      ? format(date, "HH:mm")
      : null;
  };

  const getWindDirection = (degree: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      Icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      Icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      Icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      Icon: Gauge,
      color: "text-purple-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map(({ title, value, Icon, color }) => (
            <div
              key={title}
              className="flex items-center gap-3 rounded-lg border p-4"
            >
              {<Icon className={`h-5 w-5 ${color}`} />}
              <div>
                <p className="text-sm font-medium leading-none">{title}</p>
                <p className="text-sm text-muted-foreground">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
