import styled from 'styled-components'
import Link from 'next/link'

export const Button = styled.div`
  background: ${({ primary }) => (primary ? '#aaa' : 'transparent')};
  color: ${({ primary }) => (primary ? '#fff' : '#000')};
  white-space: nowrap;
  padding: ${({ big }) => (big ? '0px 1.5rem' : '0px 1rem')};
  outline: none;
  border: ${({ primary }) => (primary ? 'none' : '1px solid #ccc')};
  cursor: pointer;
  text-decoration: none;
  transition: 0.3s !important;
  border-radius: ${({ round }) => (round ? '50px' : 'none')};
  height: 40px;
  display: flex;
  align-items: center;
  width: min-content;

  &:hover {
    background: ${({ primary }) => (primary ? '#777' : '#ddd')};
    /* transform: scale(1.075); */
  }
`
