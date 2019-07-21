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
    goods:[],
    //商品分类id
    cid: 0,
    //页码
    pagenum:1,
    //页数
    pagesize:20,
    //
    hasMore:true
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
      // console.log(res)
      const{ goods } = res
      this.setData({
        // 把原数据展开，把新数据展开，连接成新数组
        goods: [...this.data.goods, ...goods]
      })
      // 判断goods和pagesize的长度
      if (goods.length < this.data.pagesize) {
        //没有数据时，给用户提示
        wx.showToast({
          title: '没有更多数据了',
          icon: 'success',
          duration: 2000
        })
        //改变hasMore 变成false
        this.setData({
          hasMore:false
        })
      }
    })
  },
  //点击商品，跳转相应的商品详情页

  goToDail(event){
    // console.log(event)
    const { id } = event.currentTarget.dataset
    // console.log(id)
    // 用wxAPI来跳转页面
    wx.navigateTo({
      url: '/pages/goods_detail/goods_detail?goods_id=' + id 
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
    // console.log(123)
    //页面重新从pagenum1开始，商品列表先清空
    const{ query,cid,pagesize } = this.data;
    //重新设置请求页码
    const pagenum = 1;
    //把页面数据清空
    this.setData({
      goods: [],
      pagenum
    })
    //重新发起数据请求
    this.getListData({
      query,
      cid,
      pagenum,
      pagesize,
      hasMore:true
    })
    //数据请求完成后，停止下拉动画
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log('上拉触底')
    //解构
    let { query,cid,pagenum,pagesize,hasMore } = this.data;
    //如果hasMore为false则直接返回
    if(!hasMore){
      //没有数据时，给用户提示
      wx.showToast({
        title: '没有更多数据了',
        icon: 'success',
        duration: 2000
      })
      return
    }
    //上拉触底时页码+1
    pagenum++;
    //更新data中的pagenum
    this.setData({
      pagenum
    })
    //重新请求数据
    this.getListData({
     query, cid ,pagenum, pagesize
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})