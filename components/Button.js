import styled from 'styled-components'
import Link from 'next/link'

export const Button = styled.div`
  background: ${({ primary }) => (primary ? '#CCC2B5' : '#e5e0da')};
  color: ${({ primary }) => (primary ? '#fff' : '#6D6356')};
  font-weight: 700;
  white-space: nowrap;
  padding: ${({ big }) => (big ? '0px 1.5rem' : '0px 1rem')};
  outline: none;
  border: ${({ primary }) => (primary ? '1px solid #f4f2ef' : 'none')};
  cursor: pointer;
  text-decoration: none;
  transition: 0.3s !important;
  border-radius: ${({ round }) => (round ? '2px' : '5px')};
  height: 40px;
  display: flex;
  align-items: center;
  width: min-content;

  &:hover {
    background: ${({ primary }) => (primary ? '#9B9287' : '#CCC2B5')};
    color: ${({ primary }) => (primary ? '#fff' : '#fff')};
  }
`
