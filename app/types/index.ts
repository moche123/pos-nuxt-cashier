export interface User {
  id: number
  username: string
  email: string
  type: string
}

export interface Category {
  id: number
  name: string
}

export interface Product {
  id: number
  name: string
  price: number
  stock: number
  categoryId: number
}

export interface Customer {
  id: number
  name: string
  documentId: string
}

export interface Sale {
  id: number
  customerId: number
  userId: number
  total: number
  createdAt: string
}

export interface Receipt {
  id: number
  quantity: number
  subtotal: number
  productId: number
  saleId: number
  date: string
}

export interface RegisterPayload {
  username: string
  email: string
  password: string
  type: string
}

export interface AuthResult {
  token: string
  user: User
}
