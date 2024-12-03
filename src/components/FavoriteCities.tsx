import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePreferences } from "@/context/usePreference";
import { useFavorites } from "@/hooks/useFavorites";
import { useWeatherQuery } from "@/hooks/useWeather";
import { formatTemp } from "@/lib/utils";
import { Loader2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface FavoriteCityTabletProps {
  id: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
  onRemove: (id: string) => void;
}

const FavoriteCities = () => {
  const { favorites, removeFavorite } = useFavorites();

  if (!favorites.length) return null;

  return (
    <>
      <h1 className="text-xl font-bold tracking-tight">Favorites</h1>
      <ScrollArea className="w-full pb-4">
        <div className="flex gap-4">
          {favorites.map((item) => (
            <FavoriteCityTablet
              key={item.id}
              {...item}
              onRemove={() => removeFavorite.mutate(item.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

const FavoriteCityTablet = ({
  id,
  name,
  lat,
  lon,
  country,
  onRemove,
}: FavoriteCityTabletProps) => {
  const {
    state: { unit },
  } = usePreferences();
  const navigate = useNavigate();
  const { data: weatherData, isLoading } = useWeatherQuery({ lat, lon }, unit);

  return (
    <div
      onClick={() =>
        navigate(`/city/${name}?lat=${lat}&lon=${lon}&country=${country}`)
      }
      role="button"
      tabIndex={0}
      className="relative flex min-w-[12.5rem] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8
      shadow-sm transition-all hover:shadow-md"
    >
      <Button
        variant={"ghost"}
        size={"icon"}
        className="absolute right-1 top-1 h-6 w-6 rounded-full p-0 hover:text-destructive-foreground group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`Removed ${name} from favorites`);
        }}
      >
        <X className="h-4 w-4" />
      </Button>

      {isLoading ? (
        <div className="flex h-8 items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : weatherData ? (
        <>
          <div className="flex items-center gap-2">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
              className="h-8 w-8"
              alt={weatherData.weather[0].description}
            />
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">
                {weatherData.sys.country}
              </p>
            </div>
          </div>
          <div className="text-right ml-auto">
            <p className="text-xl font-bold">
              {formatTemp(weatherData.main.temp, unit)}
            </p>
            <p className="text-sx capitalize text-muted-foreground">
              {weatherData.weather[0].description}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default FavoriteCities;
