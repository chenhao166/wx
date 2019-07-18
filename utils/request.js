//主要用于封装request请求方法
// function request(){

// }



const request = (param)=> {

  //基准路径
  const baseURL = 'https://api.zbztb.cn/api/public/v1/'
  

  //先显示加载提示
  wx.showLoading({
    title: '正在疯狂加载中...',
  })

  return new Promise((resolve, reject) => {
    // 发送请求
    wx.request({
      //展开传递过来的请求对象
      ...param,
      //url 请求地址 = 基准路径 + 用户传进来的 url
      url: baseURL + param.url,
      //请求成功的回调函数
      success: res => {
        // console.log(res.data)
        const { message } = res.data
        // console.log(message)
        // 
        resolve(message)
        // this.setData({
        //   classify: message
        // })
      },
      //失败的回调
      fail: err => {
        reject(err)
      },
      //请求完成时的回调
      complete: res => {
        //隐藏加载提示框
        wx.hideLoading()
      }
    })
  })
}

//把模块进行导出
module.exports = {
  request
}