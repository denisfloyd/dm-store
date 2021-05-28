import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

interface ContentProps {
  isAbleToSeeDetail: boolean;
}

export const Container = styled.li`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 0.4rem;
  padding: 2rem;
  position: relative;

  &:hover img {
    transform: scale(1.05);
  }
`;

export const Content = styled.div<ContentProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  ${props =>
    props.isAbleToSeeDetail &&
    css`
      cursor: pointer;
    `}

  img {
    align-self: center;
    width: 15rem;
    height: 15rem;
    object-fit: contain;
    transition: all 0.2s ease-out;
  }

  > div {
    display: flex;
    flex-direction: column;
  }

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

export const AddToCardButton = styled.button`
  background: transparent;
  color: var(--color-text-primary);
  border: 2px solid var(--color-primary);
  border-radius: 4px;
  overflow: hidden;
  margin-top: auto;

  display: flex;
  align-items: center;
  transition: background 0.2s;

  &:hover {
    background: ${transparentize(0.9, '#FF9000')};
  }

  div {
    display: flex;
    align-items: center;
    padding: 1.2rem;
    font-size: 1.6rem;
    background-color: var(--color-primary-light);

    svg {
      margin-right: 0.3rem;
      color: var(--color-text-primary) !important;
    }
  }

  span {
    flex: 1;
    text-align: center;
    font-weight: bold;
    font-size: 1.4rem;
  }
`;

export const FavoriteContainer = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  border: none;
  background-color: transparent;

  svg {
    transition: scale 0.2s ease-out;
  }

  &:hover {
    svg {
      transform: scale(1.05);
    }
  }
`;
