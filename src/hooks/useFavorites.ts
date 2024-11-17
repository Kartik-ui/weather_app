import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./useLocalStorage";

interface FavoriteCity {
  id: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  addedAt: number;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage<FavoriteCity[]>(
    "favorites",
    []
  ) as [FavoriteCity[], React.Dispatch<React.SetStateAction<FavoriteCity[]>>];

  const queryClient = useQueryClient();

  const favoriteQuery = useQuery({
    queryKey: ["favorites"],
    queryFn: () => favorites,
    initialData: favorites,
    staleTime: Infinity,
  });

  const addToFavorites = useMutation({
    mutationFn: async (city: Omit<FavoriteCity, "id" | "addedAt">) => {
      const newFavorite: FavoriteCity = {
        ...city,
        id: `${city.lat}-${city.lon}`,
        addedAt: Date.now(),
      };

      const exists = (favorites as FavoriteCity[]).some(
        (item: FavoriteCity) => item.id === newFavorite.id
      );

      if (exists) return favorites;

      const newFavorites = [...favorites, newFavorite].slice(0, 10);

      setFavorites(newFavorites);
      return newFavorites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
  });

  const removeFavorite = useMutation({
    mutationFn: async (cityId: string) => {
      const newFavorites = favorites.filter(
        (item: FavoriteCity) => item.id !== cityId
      );
      setFavorites(newFavorites);
      return newFavorites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
  });

  return {
    favorites: favoriteQuery.data ?? [],
    addToFavorites,
    removeFavorite,
    isFavorite: (lat: number, lon: number) =>
      (favorites as FavoriteCity[]).some(
        (item: FavoriteCity) => item.lat === lat && item.lon === lon
      ),
  };
};
