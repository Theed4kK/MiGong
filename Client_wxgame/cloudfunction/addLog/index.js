// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  let newValue = event.value;
  //获取数据库的引用
  const db = cloud.database()
  //获取数据库中的数组
  let oldData = await db.collection('logs').doc(event.form).get()
  //获取内容的数组
  let content = oldData.data.content
  //加入新的数据
  content.push(newValue)
  //更新服务器上的数据
  let newData = await db.collection('logs').doc(event.form).update({
    data: {
      content: content
    }
  })
  return newData
}