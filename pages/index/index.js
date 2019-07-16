Page({

  /**
   * 页面的初始数据
   */
  data: {
    slider:[],
    enter:[],
    floor:[],
    showTop:true
  },
  // 轮播图
  getSliderData(){
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      //请求成功的回调函数
      success: res => {
        // console.log(res)
        // 解构返回结果的数据
        const { message } = res.data;
        // console.log(message)
        //通过setData 方法设置页面数据更新
        this.setData({
          slider: message
        })
      }
    })
  },
  // 导航入口
  getEnterData() {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
      //请求成功的回调函数
      success: res => {
        // console.log(res)
        // 解构返回结果的数据
        const { message } = res.data;
        // console.log(message)
        //通过setData 方法设置页面数据更新
        this.setData({
          enter: message
        })
      }
    })
  },
  // 楼层
  getFloorData() {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
      //请求成功的回调函数
      success: res => {
        console.log(res)
        // 解构返回结果的数据
        const { message } = res.data;
        // console.log(message)
        //通过setData 方法设置页面数据更新
        this.setData({
          floor: message
        })
      }
    })
  },
  // 返回顶部的事件处理函数
  goTop(event){
    // console.log("事件触发了",event)
    const { top } = event.currentTarget.dataset;
    // console.log(top)
    wx.pageScrollTo({
      scrollTop: top,
      duration: 300
    })
  },
  //页面滚动事件
  onPageScroll(event){
    // console.log(event)
    const { scrollTop } = event;
    if(scrollTop > 200 ){
      this.setData({
        showTop : true
      })
    }else{
      this.setData({
        showTop : false
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 轮播图
    this.getSliderData(),
    //导航入口
    this.getEnterData()
    //楼层
    this.getFloorData()
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