import styled from 'styled-components';

import { FormControl, InputLabel, MenuItem, Select as SelectMaterial } from '@material-ui/core';

export const SelectContainer = styled(FormControl)`
  border: 1px solid var(--color-text-primary);
  width: 170px;
  display: flex !important;

  margin: 2rem auto !important;

  > p {
    font-size: 1.6rem;
  }

  .MuiFilledInput-root {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .MuiFormLabel-root.Mui-focused {
    color: var(--color-primary);
  }

  .MuiInputBase-root {
    font-size: 1.4rem;
  }

  .MuiFilledInput-underline:after {
    border-bottom: 2px solid var(--color-primary);
  }

  .MuiSelect-selectMenu {
    color: var(--color-white);
    text-transform: capitalize;
  }
`;

export const InputLabelSelect = styled(InputLabel)`
  font-size: 1.6rem !important;
  color: var(--color-white) !important;
`;

export const Select = styled(SelectMaterial)`
  .MuiSelect-iconFilled {
    color: var(--color-white) !important;
  }

  .MuiSelect-icon {
    top: calc(50% - 0.8rem);
  }
`;

export const SelectMenuIcon = styled(MenuItem)``

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
  list-style: none;

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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
