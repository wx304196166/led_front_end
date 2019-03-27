import request from '@/utils/request';

// 获取分类关联的品牌和标签
export function getCascadeBrandLable(cate_id) {
  return request({
    url: '/api/index/cascadeBrandLable',
    method: 'post',
    data: {
      cate_id
    }
  });
}
// 获取产品列表
export function getProductList(cate_id, brand_id, lable_id, productName, page) {
  const data = { cate_id, page };
  if (!brand_id.includes('all')) {
    data.brand_id = brand_id.join(',');
  }
  if (!lable_id.includes('all')) {
    data.lable_id = lable_id.join(',');
  }
  if (productName) {
    data.productName = productName + '';
  }
  return request({
    url: '/api/index/productList',
    method: 'post',
    data
  });
}
// 获取产品详情
export function getProductDetail(id) {
  return request({
    url: '/api/index/productDetails',
    method: 'post',
    data: {
      id
    }
  });
}
