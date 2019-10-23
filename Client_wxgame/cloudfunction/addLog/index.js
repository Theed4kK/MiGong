// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
// 云函数入口函数
exports.main = async(event, context) => {
  let newValue = event.value;
  //获取数据库的引用
  const db = cloud.database()
  //获取数据库中的数组
  let oldData = await db.collection('item').get({
    success: function(res) {
      console.log("查询结果",res.data)
    }
  })
  //获取内容的数组
  // let data = oldData.data
  //更新服务器上的数据
  // let newData = await db.collection('logs').doc(event.form).update({
  //   data: data
  // })
  return oldData
}