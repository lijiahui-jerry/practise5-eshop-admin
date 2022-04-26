// 统一暴露接口请求函数
import * as trademark from './product/trademark';
import * as attribute from './product/attribute';
import * as spu from './product/spu';
import * as sku from './product/sku';
import * as user from './acl/user';
import role from './acl/role';
import permission from './acl/permission';

export default {
  trademark,
  attribute,
  spu,
  sku,
  user,
  role,
  permission,
}
