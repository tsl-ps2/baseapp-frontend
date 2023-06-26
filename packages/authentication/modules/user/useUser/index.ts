import { COOKIE_NAME } from '@baseapp-frontend/utils'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import UserApi, { USER_API_KEY } from '../../../services/user'
import { IUser } from '../../../types/user'
import { IUseUser } from './types'

const useUser = <TUser extends Partial<IUser>>({
  options,
  cookieName = COOKIE_NAME,
}: IUseUser<TUser> = {}) => {
  const token = Cookies.get(cookieName)
  const queryClient = useQueryClient()

  const { data: user, ...rest } = useQuery({
    queryFn: () => UserApi.getUser<TUser>(),
    queryKey: USER_API_KEY.getUser(),
    staleTime: Infinity, // makes cache never expire automatically
    enabled: !!token,
    useErrorBoundary: false,
    ...options, // needs to be placed bellow all overridable options
    onError: (error: any) => {
      if (error?.response?.status === 401) {
        // since response is 401 Unauthorized it also prabably has the body:
        // {"detail":"Invalid token."}
        // better remove the cookie
        Cookies.remove(cookieName)
        queryClient.invalidateQueries(USER_API_KEY.getUser())
      }
      options?.onError?.(error)
    },
  })

  return { user, ...rest }
}

export default useUser