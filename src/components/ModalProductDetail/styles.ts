import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.div`
  display: flex;

  > div {
    display: flex;
    flex-direction: column;

    max-width: 60%;
  }
`;

export const ProductOtherInfosContainer = styled.div`
  display: flex;

  strong {
    font-size: 1.6rem;
    line-height: 2rem;
    margin-top: 2rem;
  }

  span {
    font-size: 2.1rem;
    font-weight: bold;
    margin: 0.5rem 0 1rem;
  }
`;

export const CategoryTitle = styled.strong`
  color: var(--color-secondary);
  padding-bottom: 2rem;
  text-transform: capitalize;
`;

export const DescriptionContainer = styled.div``;
