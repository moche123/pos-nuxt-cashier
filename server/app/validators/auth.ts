import vine from '@vinejs/vine'

export const loginValidator = vine.create({
  email: vine.string().email(),
  password: vine.string(),
})

export const registerValidator = vine.create({
  username: vine.string().trim().minLength(3).maxLength(80),
  email: vine.string().email().maxLength(254).unique({ table: 'users', column: 'email' }),
  password: vine.string().minLength(6).maxLength(64),
  type: vine.string().in(['admin', 'cashier']),
})
