import request from "@/utils/request";

export const reqSPUImageList = (spuId) => request({
  url: `/admin/product/spuImageList/${spuId}`,
  method: 'GET'
})

export const reqSPUSaleAttrList = (spuId) => request({
  url: `/admin/product/spuSaleAttrList/${spuId}`,
  method: 'GET'
})

export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({
  url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  method: 'GET'
})

export const reqAddSKU = (skuInfo) => request({
  url: '/admin/product/saveSkuInfo',
  method: 'POST',
  data: skuInfo
})

export const reqSKUById = (spuId) => request({
  url: `/admin/product/findBySpuId/${spuId}`,
  method: 'GET'
})

export const reqSKUDetailById = (skuId) => request({
  url: `/admin/product/getSkuById/${skuId}`,
  method: 'GET'
})

export const reqSKUList = (page, limit) => request({
  url: `/admin/product/list/${page}/${limit}`,
  method: 'GET'
})

export const reqSale = (skuId) => request({
  url: `/admin/product/onSale/${skuId}`,
  method: 'GET'
})

export const reqCancel = (skuId) => request({
  url: `/admin/product/cancelSale/${skuId}`,
  method: 'GET'
})

