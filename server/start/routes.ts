/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')
const CategoryController = () => import('#controllers/category_controller')
const ProductController = () => import('#controllers/product_controller')
const CustomerController = () => import('#controllers/customer_controller')
const SaleController = () => import('#controllers/sale_controller')
const ReceiptController = () => import('#controllers/receipt_controller')

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router.post('login', [AuthController, 'login'])
    router.post('register', [AuthController, 'register'])
    router.get('me', [AuthController, 'me']).use(middleware.auth())

    router
      .group(() => {
        router.get('categories', [CategoryController, 'index'])
        router.post('categories', [CategoryController, 'store'])
        router.patch('categories/:id', [CategoryController, 'update'])
        router.delete('categories/:id', [CategoryController, 'destroy'])

        router.get('products', [ProductController, 'index'])
        router.post('products', [ProductController, 'store'])
        router.patch('products/:id', [ProductController, 'update'])
        router.delete('products/:id', [ProductController, 'destroy'])

        router.get('customers', [CustomerController, 'index'])
        router.get('customers/document/:documentId', [CustomerController, 'byDocument'])
        router.post('customers', [CustomerController, 'store'])

        router.get('sales', [SaleController, 'index'])
        router.post('sales', [SaleController, 'store'])
        router.patch('sales/:id', [SaleController, 'update'])
        router.delete('sales/:id', [SaleController, 'destroy'])

        router.get('receipts', [ReceiptController, 'index'])
        router.post('receipts', [ReceiptController, 'store'])
        router.delete('receipts/:id', [ReceiptController, 'destroy'])
      })
      .use(middleware.auth())
  })
  .prefix('/api')
