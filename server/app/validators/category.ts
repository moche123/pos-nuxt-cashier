import vine from '@vinejs/vine'

export const categoryValidator = vine.create({
  name: vine.string().trim().minLength(1).maxLength(80),
})
