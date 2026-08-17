import vine from '@vinejs/vine'

export const createSaleValidator = vine.create({
  customerId: vine.number().positive(),
})

export const updateSaleValidator = vine.create({
  total: vine.number().min(0),
})
