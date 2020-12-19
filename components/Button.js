import styled from 'styled-components'
import Link from 'next/link'

export const Button = styled.div`
  background: ${({ primary }) => (primary ? '#F26A2E' : '#077BF1')};
  white-space: nowrap;
  padding: ${({ big }) => (big ? '16px 40px' : '10px 32px')};
  color: #fff;
  font-size: ${({ big }) => (big ? '20px' : '16px')};
  outline: none;
  border: none;
  min-width: 100px;
  cursor: pointer;
  text-decoration: none;
  transition: 0.3s !important;
  border-radius: ${({ round }) => (round ? '50px' : 'none')};
  /* margin: 0 1rem; */
  height: 50px;
  display: flex;
  align-items: center;

  &:hover {
    /* background: ${({ primary }) => (primary ? '#077BF1' : '#F26A2E')};
    transform: translateY(-2px); */
    transform: scale(1.075);
  }
`
