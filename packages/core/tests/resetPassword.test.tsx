import { useResetPassword } from '../src/auth'
import { axiosMock, createWrapper } from './utils'
import { renderHook, act } from '@testing-library/react-hooks'
import { faker } from '@faker-js/faker'

describe('useResetPassword', () => {
  test('should run onSuccess', async () => {
    let hasOnSuccessRan = false
    const password = faker.internet.password()

    const { result, waitFor } = renderHook(
      () =>
        useResetPassword({
          defaultValues: {
            newPassword: password,
            token: 'any_token',
          },
          onSuccess: (response: any, variables: any) => {
            hasOnSuccessRan = true
          },
        }),
      { wrapper: createWrapper() },
    )

    axiosMock.onPost('/forgot-password/reset').reply(200, {
      newPassword: password,
      token: 'any_token',
    })

    await act(async () => {
      await result.current.form.handleSubmit()
    })

    await waitFor(() => hasOnSuccessRan)

    expect(hasOnSuccessRan).toBe(true)
  })

  test('should run onError', async () => {
    let hasOnErrorRan = false
    const password = faker.internet.password()

    const { result, waitFor } = renderHook(
      () =>
        useResetPassword({
          defaultValues: {
            newPassword: password,
            token: 'any_token',
          },
          onError: (response: any, variables: any) => {
            hasOnErrorRan = true
          },
        }),
      { wrapper: createWrapper() },
    )

    axiosMock.onPost('/forgot-password/reset').reply(500, {
      error: 'any',
    })

    await act(async () => {
      await result.current.form.handleSubmit()
    })

    await waitFor(() => hasOnErrorRan)

    expect(hasOnErrorRan).toBe(true)
  })
})
