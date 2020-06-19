// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID;
  if (event.action == 'search') {
    return await cloud.database().collection("userInfo")
      .doc(openid)
      .get()
      .then(res => {
        return {
          res:res,
          openid:openid
        }
      })
      .catch(res => {
        console.log("详情页失败");
      })
  } else if (event.action == 'updata') {
    return await cloud.database().collection("userInfo").doc(openid)
      .update({
        data: {
          rank: event.rank
        }
      })
      .then(res => {
        console.log("成功")
        return res
      })
      .catch(res => {
        console.log("失败")
        return res
      })
  }
}