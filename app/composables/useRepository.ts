import { ApiRepository } from '~/repositories/api'
import { LocalRepository } from '~/repositories/local'
import type { Repository } from '~/repositories/types'

/**
 * Single dependency-inversion point: everything else in the app asks this
 * function for data, never `$fetch` or a store directly. Which
 * implementation gets used is decided here, based on NUXT_PUBLIC_DATA_MODE
 * ('local' by default, no backend needed; 'api' against a real backend).
 */
export function useRepository(): Repository {
  const config = useRuntimeConfig()
  const token = useCookie<string | null>('pos_token', { default: () => null, sameSite: 'lax' })

  if (config.public.dataMode === 'api') {
    return new ApiRepository({
      baseURL: config.public.apiBase,
      getToken: () => token.value,
      onUnauthorized: () => {
        token.value = null
        navigateTo('/login')
      }
    })
  }

  return new LocalRepository(() => token.value)
}
