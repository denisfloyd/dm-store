import styled from 'styled-components';
import { transparentize } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
  list-style: none;
  /* flex: 1; */

  @media(max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media(max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media(max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const LoadingContainer = styled.div`
  flex: 1;
`;
