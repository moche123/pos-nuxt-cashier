/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.login': {
    methods: ["POST"],
    pattern: '/api/login',
    tokens: [{"old":"/api/login","type":0,"val":"api","end":""},{"old":"/api/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'auth.register': {
    methods: ["POST"],
    pattern: '/api/register',
    tokens: [{"old":"/api/register","type":0,"val":"api","end":""},{"old":"/api/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.register']['types'],
  },
  'auth.me': {
    methods: ["GET","HEAD"],
    pattern: '/api/me',
    tokens: [{"old":"/api/me","type":0,"val":"api","end":""},{"old":"/api/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['auth.me']['types'],
  },
  'category.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/categories',
    tokens: [{"old":"/api/categories","type":0,"val":"api","end":""},{"old":"/api/categories","type":0,"val":"categories","end":""}],
    types: placeholder as Registry['category.index']['types'],
  },
  'category.store': {
    methods: ["POST"],
    pattern: '/api/categories',
    tokens: [{"old":"/api/categories","type":0,"val":"api","end":""},{"old":"/api/categories","type":0,"val":"categories","end":""}],
    types: placeholder as Registry['category.store']['types'],
  },
  'category.update': {
    methods: ["PATCH"],
    pattern: '/api/categories/:id',
    tokens: [{"old":"/api/categories/:id","type":0,"val":"api","end":""},{"old":"/api/categories/:id","type":0,"val":"categories","end":""},{"old":"/api/categories/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['category.update']['types'],
  },
  'category.destroy': {
    methods: ["DELETE"],
    pattern: '/api/categories/:id',
    tokens: [{"old":"/api/categories/:id","type":0,"val":"api","end":""},{"old":"/api/categories/:id","type":0,"val":"categories","end":""},{"old":"/api/categories/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['category.destroy']['types'],
  },
  'product.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/products',
    tokens: [{"old":"/api/products","type":0,"val":"api","end":""},{"old":"/api/products","type":0,"val":"products","end":""}],
    types: placeholder as Registry['product.index']['types'],
  },
  'product.store': {
    methods: ["POST"],
    pattern: '/api/products',
    tokens: [{"old":"/api/products","type":0,"val":"api","end":""},{"old":"/api/products","type":0,"val":"products","end":""}],
    types: placeholder as Registry['product.store']['types'],
  },
  'product.update': {
    methods: ["PATCH"],
    pattern: '/api/products/:id',
    tokens: [{"old":"/api/products/:id","type":0,"val":"api","end":""},{"old":"/api/products/:id","type":0,"val":"products","end":""},{"old":"/api/products/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['product.update']['types'],
  },
  'product.destroy': {
    methods: ["DELETE"],
    pattern: '/api/products/:id',
    tokens: [{"old":"/api/products/:id","type":0,"val":"api","end":""},{"old":"/api/products/:id","type":0,"val":"products","end":""},{"old":"/api/products/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['product.destroy']['types'],
  },
  'customer.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/customers',
    tokens: [{"old":"/api/customers","type":0,"val":"api","end":""},{"old":"/api/customers","type":0,"val":"customers","end":""}],
    types: placeholder as Registry['customer.index']['types'],
  },
  'customer.by_document': {
    methods: ["GET","HEAD"],
    pattern: '/api/customers/document/:documentId',
    tokens: [{"old":"/api/customers/document/:documentId","type":0,"val":"api","end":""},{"old":"/api/customers/document/:documentId","type":0,"val":"customers","end":""},{"old":"/api/customers/document/:documentId","type":0,"val":"document","end":""},{"old":"/api/customers/document/:documentId","type":1,"val":"documentId","end":""}],
    types: placeholder as Registry['customer.by_document']['types'],
  },
  'customer.store': {
    methods: ["POST"],
    pattern: '/api/customers',
    tokens: [{"old":"/api/customers","type":0,"val":"api","end":""},{"old":"/api/customers","type":0,"val":"customers","end":""}],
    types: placeholder as Registry['customer.store']['types'],
  },
  'sale.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/sales',
    tokens: [{"old":"/api/sales","type":0,"val":"api","end":""},{"old":"/api/sales","type":0,"val":"sales","end":""}],
    types: placeholder as Registry['sale.index']['types'],
  },
  'sale.store': {
    methods: ["POST"],
    pattern: '/api/sales',
    tokens: [{"old":"/api/sales","type":0,"val":"api","end":""},{"old":"/api/sales","type":0,"val":"sales","end":""}],
    types: placeholder as Registry['sale.store']['types'],
  },
  'sale.update': {
    methods: ["PATCH"],
    pattern: '/api/sales/:id',
    tokens: [{"old":"/api/sales/:id","type":0,"val":"api","end":""},{"old":"/api/sales/:id","type":0,"val":"sales","end":""},{"old":"/api/sales/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['sale.update']['types'],
  },
  'sale.destroy': {
    methods: ["DELETE"],
    pattern: '/api/sales/:id',
    tokens: [{"old":"/api/sales/:id","type":0,"val":"api","end":""},{"old":"/api/sales/:id","type":0,"val":"sales","end":""},{"old":"/api/sales/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['sale.destroy']['types'],
  },
  'receipt.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/receipts',
    tokens: [{"old":"/api/receipts","type":0,"val":"api","end":""},{"old":"/api/receipts","type":0,"val":"receipts","end":""}],
    types: placeholder as Registry['receipt.index']['types'],
  },
  'receipt.store': {
    methods: ["POST"],
    pattern: '/api/receipts',
    tokens: [{"old":"/api/receipts","type":0,"val":"api","end":""},{"old":"/api/receipts","type":0,"val":"receipts","end":""}],
    types: placeholder as Registry['receipt.store']['types'],
  },
  'receipt.destroy': {
    methods: ["DELETE"],
    pattern: '/api/receipts/:id',
    tokens: [{"old":"/api/receipts/:id","type":0,"val":"api","end":""},{"old":"/api/receipts/:id","type":0,"val":"receipts","end":""},{"old":"/api/receipts/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['receipt.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
