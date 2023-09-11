import { createAxiosInstance } from '..'

jest.mock('humps')
jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  create: () => ({
    defaults: jest.requireActual('axios').create().defaults,
    interceptors: {
      ...jest.requireActual('axios').create().interceptors,
      request: { eject: jest.fn(), use: jest.fn() },
      response: { use: jest.fn() },
    },
  }),
}))
jest.mock('js-cookie', () => ({
  ...jest.requireActual('js-cookie'),
  get: () => 'someAuthToken',
}))

describe('createAxiosInstance', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should set default headers for post, patch, and put methods', () => {
    const { axios } = createAxiosInstance()

    expect(axios.defaults.headers.post['Content-Type']).toEqual('application/json')
    expect(axios.defaults.headers.patch['Content-Type']).toEqual('application/json')
    expect(axios.defaults.headers.put['Content-Type']).toEqual('application/json')
  })

  it('should set file headers for post, patch, and put methods', () => {
    const { axios } = createAxiosInstance({ file: true })

    expect(axios.defaults.headers.post['Content-Type']).toEqual('multipart/form-data')
    expect(axios.defaults.headers.patch['Content-Type']).toEqual('multipart/form-data')
    expect(axios.defaults.headers.put['Content-Type']).toEqual('multipart/form-data')
  })

  it('should add Authorization header if authToken is available', () => {
    const {
      axios: {
        interceptors: {
          request: { use },
        },
      },
    } = createAxiosInstance()
    const [[interceptorFn]] = (use as jest.Mock).mock.calls
    const request = { headers: { Authorization: undefined }, url: 'someUrl' }

    interceptorFn(request)

    expect(request.headers.Authorization).toBe('Token someAuthToken')
  })

  it('should not add Authorization header for services without token', () => {
    const {
      axios: {
        interceptors: {
          request: { use },
        },
      },
    } = createAxiosInstance({ servicesWithoutToken: ['/someUrl'] })
    const [[interceptorFn]] = (use as jest.Mock).mock.calls
    const request = { headers: { Authorization: undefined }, url: '/someUrl' }

    interceptorFn(request)

    expect(request.headers.Authorization).toBeUndefined()
  })

  it('should be able to eject an interceptor', () => {
    const {
      axios: {
        interceptors: {
          request: { eject },
        },
      },
      requestInterceptorId,
    } = createAxiosInstance()

    eject(requestInterceptorId)
    expect(eject).toBeCalledWith(requestInterceptorId)
  })
})