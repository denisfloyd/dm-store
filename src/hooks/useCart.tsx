import React, { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Product } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  // updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
  addProductToFavorites: (id: number) => void;
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

  const addProduct = async (productId: number) => {
    try {
      const currentCartToUpdate = [...cart];
      const productExists = currentCartToUpdate.find(
        (product) => product.id === productId
      );

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
      const favotitesStorage = localStorage.getItem("@dmstore:favotites");
      let favotires: number[] = [];

      if (favotitesStorage) {
        favotires = JSON.parse(favotitesStorage);
      }

      const favotiteExistsIndex = favotires.findIndex(favorite => {
        return favorite === id
      });

      if(favotiteExistsIndex) {
        favotires.splice(favotiteExistsIndex, 1);
      } else {
        favotires.push(id);
      }

      localStorage.setItem("@dmstore:favotites", JSON.stringify(favotires));
    } catch {
      toast.error('Erro ao adicionar/remover produto favorito');
    }
  }

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, addProductToFavorites }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
