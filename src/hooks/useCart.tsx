import React, { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Product } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface CartContextData {
  cart: Product[];
  addProduct: (product: Product) => Promise<void>;
  removeProduct: (productId: number) => void;
  // updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@dmstore:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productToAddToCart: Product): Promise<void> => {
    try {
      const currentCartToUpdate = [...cart];
      const productExists = currentCartToUpdate.find(
        product => product.id === productToAddToCart.id,
      );

      if (productExists) {
        productExists.amount += 1;
      } else {
        const productToAdd = { ...productToAddToCart, amount: 1 };
        currentCartToUpdate.push(productToAdd);
      }

      setCart(currentCartToUpdate);
      localStorage.setItem(
        '@dmstore:cart',
        JSON.stringify(currentCartToUpdate),
      );
    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number): void => {
    try {
      const currentCartToUpdate = [...cart];
      const productIndexToRemove = currentCartToUpdate.findIndex(
        product => product.id === productId,
      );

      if (productIndexToRemove >= 0) {
        currentCartToUpdate.splice(productIndexToRemove, 1);
        setCart(currentCartToUpdate);
        localStorage.setItem(
          '@dmstore:cart',
          JSON.stringify(currentCartToUpdate),
        );
        return;
      }
      throw new Error();
    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
