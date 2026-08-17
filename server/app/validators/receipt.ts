import vine from '@vinejs/vine'

export const createReceiptValidator = vine.create({
  productId: vine.number().positive(),
  quantity: vine.number().positive(),
  saleId: vine.number().positive(),
})
