import request from "@/utils/request"

// 获取三级categoryId对应的spu数据
export const reqSPUList = (page, limit, category3Id) => request({
  url: `/admin/product/${page}/${limit}`,
  method: 'GET',
  params: {category3Id}
})

// 根据id获取SPU信息
export const reqSPUById = (spuId) => request({
  url: `/admin/product/getSpuById/${spuId}`,
  method: 'GET',
})

// 获取品牌信息
export const reqTrademarkList = () => request({
  url: 'admin/product/baseTrademark/getTrademarkList',
  method: 'GET',
})

// 获取品牌信息
export const reqImageList = (spuId) => request({
  url: `/admin/product/spuImageList/${spuId}`,
  method: 'GET',
})

// 获取品牌信息
export const reqBaseSaleAttrList = () => request({
  url: '/admin/product/baseSaleAttrList',
  method: 'GET',
})

// 更新SPU信息（包括添加或修改或和删除，以是否有id判断）
export const reqUpdateSPU = (spuInfo) => {
  if (spuInfo.id) {
    // 有id，修改SPU
    return request({
      url: '/admin/product/updateSpuInfo',
      method: 'POST',
      data: spuInfo
    })
  } else {
    // 没id，添加SPU
    return request({
      url: '/admin/product/saveSpuInfo',
      method: 'POST',
      data: spuInfo
    })
  }
}

// 删除SPU
export const reqDeleteSPU = (spuId) => request({
  url: `/admin/product/deleteSpu/${spuId}`,
  method: 'DELETE',
})
