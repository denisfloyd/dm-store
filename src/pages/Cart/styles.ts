import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  padding: 3rem;
  background: var(--color-white);
  border-radius: 4px;
  margin-bottom: 3rem;

  footer {
    margin-top: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const ProductTable = styled.table`
  width: 100%;

  thead th {
    color: var(--color-secondary);
    text-align: left;
    padding: 1.2rem;
  }

  tbody td {
    color: var(--color-text-primary);
    padding: 1.2rem;
    border-bottom: 1px solid #eee;
  }

  img {
    height: 10rem;
  }

  strong {
    display: block;
  }

  span {
    display: block;
    margin-top: 0.5rem;
    font-size: 1.8rem;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;

    input {
      border: 1px solid var(--color-divider);
      border-radius: 4px;
      padding: 0.6rem;
      width: 5rem;
    }
  }

  button {
    background: none;
    border: 0;
    padding: 0.6rem;

    svg {
      color: var(--color-primary);
      transition: color 0.2s;
    }

    &:hover {
      svg {
        color: ${darken(0.06, '#FF9000')};
      }
    }

    &:disabled {
      svg {
        color: ${lighten(0.25, '#FF9000')};
        cursor: not-allowed;
      }
    }
  }
`;

export const CheckoutButton = styled.button`
  background: var(--color-success);
  color: var(--color-white);
  border: 0;
  border-radius: 4px;
  padding: 1.2rem 2rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: background 0.2s;

  &:hover {
    background: ${darken(0.06, '#109E41')};
  }

  &:disabled {
    color: ${lighten(0.25, '#109E41')};
    cursor: not-allowed;

    &:hover {
      background: var(--color-success);
    }
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: baseline;

  span {
    color: #999;
    font-weight: bold;
  }

  strong {
    font-size: 2.8rem;
    margin-left: 0.5rem;
  }
`;
