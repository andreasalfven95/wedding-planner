import styled from 'styled-components'
import Link from 'next/link'

export const Button = styled.div`
  background: ${({ primary }) => (primary ? '#cccccc' : '#e5e5e5')};
  color: ${({ primary }) => (primary ? '#fff' : '#6d6d6d')};
  font-weight: 700;
  white-space: nowrap;
  padding: ${({ big }) => (big ? '0px 1.5rem' : '0px 1rem')};
  outline: none;
  border: ${({ primary }) => (primary ? '1px solid #f4f4f4' : 'none')};
  cursor: pointer;
  text-decoration: none;
  transition: 0.3s !important;
  border-radius: ${({ round }) => (round ? '25px' : '5px')};
  height: 40px;
  display: flex;
  align-items: center;
  width: min-content;

  &:hover {
    background: ${({ primary }) => (primary ? '#9b9b9b' : '#cccccc')};
    color: ${({ primary }) => (primary ? '#fff' : '#fff')};
  }
`
