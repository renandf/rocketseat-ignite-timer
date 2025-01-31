import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 40px;
  }

  nav {
    display: flex;
    gap: .5rem;
  }

  a {
    width: 3rem;
    height: 3rem;

    display: flex;
    justify-content: center;
    align-items: center;

    color: ${props => props.theme['gray-300']};

    border-block: 3px solid transparent;
    transition: color .2s, border .2s;

    &:hover {
      border-block-end: 3px solid ${props => props.theme['green-500']};
      color: ${props => props.theme['gray-100']};
    }

    &.active {
      color: ${props => props.theme['green-500']};
    }
  }
`