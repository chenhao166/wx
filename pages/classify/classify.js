// pages/classify/classify.js

//导入request模块
const { request } = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 初始化左侧菜单索引
    activeIndex: 0,
    //初始化分类总数据
    classify:[],
    subClassify:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getclassData()
  },

  // 请求数据
  getclassData(){
    //调用封装过的 request 方法
    request({
      url:'categories'
    })
    //请求成功执行的回调函数
    .then(res=>{
      // console.log(res);
      this.setData({
        classify:res,
        subClassify:res[this.data.activeIndex].children
      })
    })
    // //先显示加载提示
    // wx.showLoading({
    //   title: '正在疯狂加载中...',
    // })
    // // 发送请求
    // wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/categories',
    //   success:res =>{
    //     console.log(res.data)
    //     const{ message } = res.data
    //     console.log(message)
    //     this.setData({
    //       classify: message
    //     })
    //   },
    //   //失败的回调
    //   fail: err => {

    //   },
    //   //请求完成时的回调
    //   complete:res=>{
    //     //隐藏加载提示框
    //     wx.hideLoading()
    //   }
    // })

  },
  //点击分类左侧切换选项卡
  changeTab(event) {
    // console.log(event)
    //解构传递的索引值
    const { index } = event.currentTarget.dataset
    // console.log(index)
    //更新数据
    this.setData({
      //左侧选项卡索引更新
      activeIndex:index,
      //右侧数据也根据索引值更新
      subClassify : this.data.classify[index].children
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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