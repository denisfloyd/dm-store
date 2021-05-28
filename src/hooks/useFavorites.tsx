import React, { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';

interface FavoritesProviderProps {
  children: ReactNode;
}

interface FavoriteContextData {
  favorites: number[];
  addProductToFavorites: (id: number) => boolean;
}

const FavoriteContext = createContext<FavoriteContextData>(
  {} as FavoriteContextData,
);

export function FavoritesProvider({
  children,
}: FavoritesProviderProps): JSX.Element {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const favoritesStorage = localStorage.getItem('@dmstore:favorites');

    if (favoritesStorage) {
      return JSON.parse(favoritesStorage);
    }

    return [];
  });

  const addProductToFavorites = (id: number): boolean => {
    try {
      const favoritesToUpdate = [...favorites];
      const favoriteExistsIndex = favoritesToUpdate.findIndex(favorite => {
        return favorite === id;
      });

      if (favoriteExistsIndex >= 0) {
        favoritesToUpdate.splice(favoriteExistsIndex, 1);
      } else {
        favoritesToUpdate.push(id);
      }

      localStorage.setItem(
        '@dmstore:favorites',
        JSON.stringify(favoritesToUpdate),
      );
      setFavorites(favoritesToUpdate);
      toast.success(
        `Produto ${favoriteExistsIndex >= 0 ? 'des' : ''}favoritado!`,
      );

      return true;
    } catch {
      toast.error('Erro ao adicionar/remover produto favorito');
      return false;
    }
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addProductToFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites(): FavoriteContextData {
  const context = useContext(FavoriteContext);

  return context;
}
