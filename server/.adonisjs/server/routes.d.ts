import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'category.index': { paramsTuple?: []; params?: {} }
    'category.store': { paramsTuple?: []; params?: {} }
    'category.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'category.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.index': { paramsTuple?: []; params?: {} }
    'product.store': { paramsTuple?: []; params?: {} }
    'product.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'customer.index': { paramsTuple?: []; params?: {} }
    'customer.by_document': { paramsTuple: [ParamValue]; params: {'documentId': ParamValue} }
    'customer.store': { paramsTuple?: []; params?: {} }
    'sale.index': { paramsTuple?: []; params?: {} }
    'sale.store': { paramsTuple?: []; params?: {} }
    'sale.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sale.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'receipt.index': { paramsTuple?: []; params?: {} }
    'receipt.store': { paramsTuple?: []; params?: {} }
    'receipt.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'auth.me': { paramsTuple?: []; params?: {} }
    'category.index': { paramsTuple?: []; params?: {} }
    'product.index': { paramsTuple?: []; params?: {} }
    'customer.index': { paramsTuple?: []; params?: {} }
    'customer.by_document': { paramsTuple: [ParamValue]; params: {'documentId': ParamValue} }
    'sale.index': { paramsTuple?: []; params?: {} }
    'receipt.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'auth.me': { paramsTuple?: []; params?: {} }
    'category.index': { paramsTuple?: []; params?: {} }
    'product.index': { paramsTuple?: []; params?: {} }
    'customer.index': { paramsTuple?: []; params?: {} }
    'customer.by_document': { paramsTuple: [ParamValue]; params: {'documentId': ParamValue} }
    'sale.index': { paramsTuple?: []; params?: {} }
    'receipt.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'category.store': { paramsTuple?: []; params?: {} }
    'product.store': { paramsTuple?: []; params?: {} }
    'customer.store': { paramsTuple?: []; params?: {} }
    'sale.store': { paramsTuple?: []; params?: {} }
    'receipt.store': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'category.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sale.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'category.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sale.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'receipt.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}