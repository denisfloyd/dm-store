import React, { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Product } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (product: Product) => Promise<void>;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
  removeProduct: (productId: number) => void;
  clearCart: () => void;
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

  const updateProductAmount = async ({
    productId,
    amount: newAmount,
  }: UpdateProductAmount): Promise<void> => {
    try {
      if (newAmount <= 0) {
        return;
      }

      const currentCartToUpdate = [...cart];
      const productExists = currentCartToUpdate.find(
        product => product.id === productId,
      );

      if (productExists) {
        productExists.amount = newAmount;

        setCart(currentCartToUpdate);
        localStorage.setItem(
          '@dmstore:cart',
          JSON.stringify(currentCartToUpdate),
        );
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Erro na alteração de quantidade do produto!');
    }
  };

  const clearCart = (): void => {
    setCart([]);
    localStorage.removeItem('@dmstore:cart');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        updateProductAmount,
        removeProduct,
        clearCart,
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
