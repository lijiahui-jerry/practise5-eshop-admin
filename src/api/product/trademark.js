import request from "@/utils/request";

// 获取品牌列表接口
export const reqTrademarkList = (page, limit) => request({
  url: `/admin/product/baseTrademark/${page}/${limit}`,
  method: 'GET'
})

// 添加或修改品牌的接口
export const reqAddOrUpdateTrademark = (trademark) => {
  if (trademark.id) {
    return request({
      url: '/admin/product/baseTrademark/update',
      method: 'PUT',
      data: trademark
    })
  } else {
    return request({
      url: '/admin/product/baseTrademark/save',
      method: 'POST',
      data: trademark
    })
  }
}

// 删除品牌列表接口
export const reqTrademarkDelete = (attrId) => request({
  url: `/admin/product/deleteAttr/${attrId}`,
  method: 'DELETE'
})
