import React from 'react'
import { render, wait  } from '@testing-library/react'
import {fireEvent} from '@testing-library/dom'

import Signin from '../../pages/Signin'

const mockedHistoryPush = jest.fn()

jest.mock('react-router-dom', ()=> {
  return {
    useHistory: () => ({
      push: mockedHistoryPush
    }),
    Link: ({children}: {children: React.ReactNode}) => children
  }
})

jest.mock('../../hooks/auth', ()=> {
  return {
    useAuth: () => ({
      signIn: jest.fn()
    })
  }
})

describe('Signin Page', () => {
  it('should be able to sing in', async () => {
    const { getByPlaceholderText, getByText } = render(<Signin/>);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha')
    const buttonElement = getByText('Entrar')

    fireEvent.change(emailField, {target: {value: 'johndoe@example.com'}})
    fireEvent.change(passwordField, {target: {value: '123456'}})

    fireEvent.click(buttonElement)

    await wait(()=>
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard')
    )


  });
});
