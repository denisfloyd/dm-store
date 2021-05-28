import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../api/api';
import { Product } from '../types';
import { formatPrice } from '../utils/format';

interface CartProviderProps {
  children: ReactNode;
}

interface CartContextData {
  cart: Product[];
  favorites: number[];
  addProduct: (product: Product) => Promise<void>;
  removeProduct: (productId: number) => void;
  // updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
  addProductToFavorites: (id: number) => boolean;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem("@dmstore:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const [favorites, setFavorites] = useState<number[]>(() => {
    const favoritesStorage = localStorage.getItem("@dmstore:favorites");

    if (favoritesStorage) {
      return JSON.parse(favoritesStorage);
    }

    return [];
  });

  const addProduct = async (productToAddToCart: Product) => {
    try {
      const currentCartToUpdate = [...cart];
      const productExists = currentCartToUpdate.find(
        (product) => product.id === productToAddToCart.id
      );

      if (productExists) {
        productExists.amount = productExists.amount + 1;
      } else {
        const productToAdd = { ...productToAddToCart, amount: 1 };
        currentCartToUpdate.push(productToAdd);
      }

      setCart(currentCartToUpdate);
      localStorage.setItem(
        "@dmstore:cart",
        JSON.stringify(currentCartToUpdate)
      );
    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const currentCartToUpdate = [...cart];
      const productIndexToRemove = currentCartToUpdate.findIndex(
        (product) => product.id === productId
      );

      if (productIndexToRemove >= 0) {
        currentCartToUpdate.splice(productIndexToRemove, 1);
        setCart(currentCartToUpdate);
        localStorage.setItem("@dmstore:cart", JSON.stringify(currentCartToUpdate));
        return;
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const addProductToFavorites = (id: number) => {
    try {
      const favoritesToUpdate = [...favorites];
      const favoriteExistsIndex = favoritesToUpdate.findIndex(favorite => {
        return favorite === id
      });

      if(favoriteExistsIndex >= 0) {
        favoritesToUpdate.splice(favoriteExistsIndex, 1);
      } else {
        favoritesToUpdate.push(id);
      }

      localStorage.setItem("@dmstore:favorites", JSON.stringify(favoritesToUpdate));
      setFavorites(favoritesToUpdate);
      toast.success(`Produto ${favoriteExistsIndex >= 0 ? 'des': ''}favoritado!`);

      return true;
    } catch {
      toast.error('Erro ao adicionar/remover produto favorito');
      return false;
    }
  }

  return (
    <CartContext.Provider
      value={{ cart, favorites, addProduct, removeProduct, addProductToFavorites }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
