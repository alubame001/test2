const express = require('express')
const request = require('request')
const app = express()
app.use(express.json())
app.all('/getInfo', async function (req, res) {
  const { info } = req.method === 'GET' ? req.query : req.body
  console.log('请求头', req.headers)
  const appid = req.headers['x-wx-from-appid'] || ''
  const openid = req.headers['x-wx-from-openid'] || req.headers['x-wx-openid']
  console.log('原始数据', appid, info, openid)
  const infores = await getOpenData(appid, openid, info)
  console.log('接口数据', infores)
  res.send(infores)
})
app.listen(80, function () {
  console.log('服务启动成功！')
})

function getOpenData (appid, openid, cloudid) {
  return new Promise((resolve, reject) => {
    request({
      url: `http://api.weixin.qq.com/wxa/getopendata?from_appid=${appid}&openid=${openid}`,
      method: 'POST',
      body: JSON.stringify({
        cloudid_list: [cloudid]
      })
    }, function (error, res) {
      if (error) reject(error)
      resolve(res.body)
    })
})}