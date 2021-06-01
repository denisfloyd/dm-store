import React, { useState } from 'react';
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

import { CircularProgress } from '@material-ui/core';

import { api } from '../../api/api';

import { useCart } from '../../hooks/useCart';
import { Product } from '../../types';
import { formatPrice } from '../../utils/format';

import {
  Container,
  ProductTable,
  NoProductText,
  CheckoutButton,
  Total,
} from './styles';
import { useAuth } from '../../hooks/useAuth';

interface ProductFormatted extends Product {
  priceFormatted: string;
  totalFormatted: string;
}

const Cart = (): JSX.Element => {
  const { cart, updateProductAmount, removeProduct, clearCart } = useCart();
  const { user } = useAuth();

  const history = useHistory();

  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const cartFormatted: ProductFormatted[] = cart.map(product => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    totalFormatted: formatPrice(product.price * product.amount),
  }));

  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      return sumTotal + product.amount * product.price;
    }, 0),
  );

  function handleProductIncrement(product: Product): void {
    updateProductAmount({
      productId: product.id,
      amount: product.amount + 1,
    });
  }

  function handleProductDecrement(product: Product): void {
    updateProductAmount({
      productId: product.id,
      amount: product.amount - 1,
    });
  }

  function handleRemoveProduct(productId: number): void {
    removeProduct(productId);
  }

  async function handleCheckoutCart(): Promise<void> {
    if (!user) {
      toast.warning('Para finalizar a compra é necessário realizar o Login!');
      return;
    }

    setLoadingCheckout(true);

    const config = {
      headers: {
        token: user.token,
      },
    };

    const body = {
      products: cart.map((product: Product) => {
        return {
          productId: product.id,
          quantity: product.amount,
        };
      }),
    };

    const response = await api.post('/carts', body, config);

    if (response.status === 200) {
      clearCart();
      toast.success('Compra realizada com sucesso!!');

      setLoadingCheckout(false);
      history.push('');
    }
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          {cartFormatted && cartFormatted.length > 0 && (
            <tr>
              <th aria-label="product image" />
              <th>PRODUTO</th>
              <th>QUANTIDADE</th>
              <th>SUBTOTAL</th>
              <th aria-label="delete icon" />
            </tr>
          )}
        </thead>
        <tbody>
          {cartFormatted && cartFormatted.length > 0 ? (
            cartFormatted.map((product: ProductFormatted) => (
              <tr data-testid="product" key={product.id}>
                <td>
                  <img src={product.image} alt={product.title} />
                </td>
                <td>
                  <strong>{product.title}</strong>
                  <span>{product.priceFormatted}</span>
                </td>
                <td>
                  <div>
                    <button
                      type="button"
                      data-testid="decrement-product"
                      disabled={product.amount <= 1}
                      onClick={() => handleProductDecrement(product)}
                    >
                      <MdRemoveCircleOutline size={20} />
                    </button>
                    <input
                      type="text"
                      data-testid="product-amount"
                      readOnly
                      value={product.amount}
                    />
                    <button
                      type="button"
                      data-testid="increment-product"
                      onClick={() => handleProductIncrement(product)}
                    >
                      <MdAddCircleOutline size={20} />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>{product.totalFormatted}</strong>
                </td>
                <td>
                  <button
                    type="button"
                    data-testid="remove-product"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <NoProductText>Não há produtos no carrinho!</NoProductText>
          )}
        </tbody>
      </ProductTable>

      <footer>
        <CheckoutButton
          type="button"
          disabled={cart.length === 0}
          onClick={handleCheckoutCart}
        >
          Finalizar pedido
        </CheckoutButton>

        {loadingCheckout && <CircularProgress />}

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
