// 引入请求方法
const{ request } = require("../../utils/request.js");
// 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //初始化关键词
    query:"",
    //tab栏的索引
    activeIndex:0,
    // 数据列表初始化
    goodsList:[],
    //商品分类id
    cid: 0,
    //页码
    pagenum:2,
    //页数
    pagesize:20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    //解构获取到的页面参数
    const{ query,cid } = options;
    // console.log(query)
    //更新数据
    this.setData({
      query,
      cid
    })
    //pagenum 和pagesize从data中解构出来
    const{ pagenum, pagesize } = this.data
    // 调用（这个也要传keyword这个参数）
    this.getListData({
      query, 
      cid,
      pagenum,
      pagesize
    })
  },

  // 请求数据
  getListData(params){
    request({
      // url:"goods/search?query=" + query + "&cid=" + cid,
      url: "goods/search",
      //请求参数
      data:{
       ...params
      }
    })
    .then(res=>{
      console.log(res)
      const{ goods } = res
      this.setData({
        goodsList: goods
      })
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