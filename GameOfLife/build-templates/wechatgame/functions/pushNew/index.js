// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID;
  await db.collection('userInfo').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      _id:openid,
      rank:0
    }
  })
  return {
    openid:openid
  }
}