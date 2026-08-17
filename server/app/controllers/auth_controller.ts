import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)
    return { data: { token: token.value!.release() } }
  }

  async register({ request }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    const user = await User.create(payload)
    const token = await User.accessTokens.create(user)
    return { data: { token: token.value!.release() } }
  }

  async me({ auth }: HttpContext) {
    return { data: auth.getUserOrFail().serialize() }
  }
}
