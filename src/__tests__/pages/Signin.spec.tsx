import React from 'react'
import { render, wait  } from '@testing-library/react'
import {fireEvent} from '@testing-library/dom'

import Signin from '../../pages/Signin'

const mockedHistoryPush = jest.fn()
const mockedSignin= jest.fn()
const mockedAddToast = jest.fn()

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
      signIn: mockedSignin
    })
  }
})

jest.mock('../../hooks/toast', ()=> {
  return {
    useToast: () => ({
      addToast: mockedAddToast
    })
  }
})

describe('Signin Page', () => {
  beforeEach(()=> {
    mockedHistoryPush.mockClear();
  })
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

  it('should not be able to sing in with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<Signin/>);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha')
    const buttonElement = getByText('Entrar')

    fireEvent.change(emailField, {target: {value: 'not-valid-email'}})
    fireEvent.change(passwordField, {target: {value: '123456'}})

    fireEvent.click(buttonElement)

    await wait(()=>
      expect(mockedHistoryPush).not.toHaveBeenCalled()
    )
  });

  it('should display an error if login fails', async () => {

    mockedSignin.mockImplementation(()=> {
      throw new Error()
    })

    const { getByPlaceholderText, getByText } = render(<Signin/>);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha')
    const buttonElement = getByText('Entrar')

    fireEvent.change(emailField, {target: {value: 'johndoe@example.com'}})
    fireEvent.change(passwordField, {target: {value: '123456'}})

    fireEvent.click(buttonElement)

    await wait(()=>
      expect(mockedAddToast).toHaveBeenCalledWith(expect.objectContaining({type: 'error'}))
    )
  });
});
