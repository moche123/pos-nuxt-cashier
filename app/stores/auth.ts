import { defineStore } from 'pinia'
import type { RegisterPayload, User } from '~/types'

export const useAuthStore = defineStore('auth', () => {
  const token = useCookie<string | null>('pos_token', { default: () => null, sameSite: 'lax' })
  const user = ref<User | null>(null)

  async function login(email: string, password: string) {
    const repo = useRepository()
    const result = await repo.login(email, password)
    token.value = result.token
    user.value = result.user
  }

  async function register(payload: RegisterPayload) {
    const repo = useRepository()
    const result = await repo.register(payload)
    token.value = result.token
    user.value = result.user
  }

  async function fetchMe() {
    const repo = useRepository()
    user.value = await repo.me()
  }

  function logout() {
    token.value = null
    user.value = null
  }

  return { token, user, login, register, fetchMe, logout }
})
