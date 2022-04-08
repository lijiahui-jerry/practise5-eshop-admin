import request from "@/utils/request"

// 获取一级分类的数据
export const reqCategoryList1 = () => request({
  url: '/admin/product/getCategory1',
  method: 'GET'
})

// 获取二级分类的数据
export const reqCategoryList2 = (category1Id) => request({
  url: `/admin/product/getCategory2/${category1Id}`,
  method: 'GET'
})

// 获取三级分类的数据
export const reqCategoryList3 = (category2Id) => request({
  url: `/admin/product/getCategory3/${category2Id}`,
  method: 'GET'
})

// 根据三个父类的id获取相应数据
export const reqAttributeList = (category1Id, category2Id, category3Id) => request({
  url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  method: 'GET'
})

// 添加属性名
export const reqAttributeNameAdd = (data) => request({
  url: `/admin/product/saveAttrInfo`,
  method: 'POST',
  data,
})
