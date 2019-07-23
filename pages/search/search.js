// pages/search/search.js
//引入request
const { request } = require("../../utils/request.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    query: "",
    //历史搜索的数据列表
    historyList: [],
    showTips:false,
    tipsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 提取页面参数
    const { query } = options;
    this.setData({
      query
    })
    console.log(query)
  },

  //bindinput="inputChange" 表单输入有变化时触发
  inputChange(event) {
    // console.log('表单输入有变化时触发')
    // console.log(event)
    const { value } = event.detail;
    // console.log(value)
    if(!value){
      //为空隐藏提示框
      this.setData({
        showTips: false
      })
      //并退出函数，不发起请求
      return
    } else{
      //否则调用方法，发起请求，获取数据
      this.getTipsData(value)
    }
  },
  getTipsData(value){
    request({
      url: "goods/qsearch",
      data: {
        query: value
      }
    })
      .then(res => {
        console.log(res)
        this.setData({
          showTips: true,
          tipsList: res || []
        })
        if (res) {
          this.setData({
            showTips: true
          })
        } else {
          this.setData({
            showTips: false
          })
        }
      })
  },
  //bindconfirm="inputSubmit" 表单输入完成后点完成后触发
  inputSubmit(event) {
    // console.log(event)
    const { value } = event.detail;
    // console.log(value)
    //1.0界面更新
    let { historyList } = this.data;
    //把搜索的历史数据添加到数据列表中
    historyList.unshift(value)
    //数组去重
    historyList = [...new Set(historyList)]
    this.setData({
      historyList
    })
    //2.0本地存储更新
    //2.1异步版本
    wx.setStorage({
      //键名称需要写成离符串
      key: 'historyList',
      //值要保留数据格式，一般是个变量
      data: historyList,
    })
    // //2.2同步版本
    // wx.setStorageSync('historyList', historyList)
  },
  //点击图标清空搜索历史列表
  //异步方法
  removeHistory(){
    wx.removeStorage({
      key: 'historyList',
      success:(res)=> {
       this.setData({
         historyList:[]
       })
      }
    })
  },
  // //同步方法
  // removeHistory(){
  //   //视图消失
  //   this.setData({
  //     historyList:[]
  //   })
  //   //移除本地存储记录
  //   wx.removeStorageSync('historyList')
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  //  //同步方法，获取本地存储数据，如果没有数据就通过短路运算设计默认空数组
  //  const historyList = wx.getStorageSync('historyList') || [];
  //  //更新视图
  //  this.setData({
  //    historyList
  //  })

   //异步的方法，获取本地存储数据，如果没有数据就通过短路运算设计默认空数组
   wx.getStorage({
     key: 'historyList',
     success: (res) => {
       const{ data } = res;
      //  console.log(data)
      // console.log(this)
      //更新视图
       this.setData({
         historyList:data
       })
     },
   })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})