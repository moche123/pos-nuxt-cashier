import vine from '@vinejs/vine'

export const customerValidator = vine.create({
  name: vine.string().trim().minLength(1).maxLength(120),
  documentId: vine.string().trim().minLength(1).maxLength(20),
})
