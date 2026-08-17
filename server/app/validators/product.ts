import vine from '@vinejs/vine'

export const createProductValidator = vine.create({
  name: vine.string().trim().minLength(1).maxLength(120),
  price: vine.number().min(0),
  stock: vine.number().min(0),
  categoryId: vine.number().positive(),
})

export const updateProductValidator = vine.create({
  name: vine.string().trim().minLength(1).maxLength(120),
  price: vine.number().min(0),
  stock: vine.number().min(0),
})
