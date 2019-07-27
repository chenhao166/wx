// pages/goods_detail/goods_detail.js
// 引入request
const {
  request
} = require("../../utils/request.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    good_all: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    const {
      goods_id
    } = options
    // console.log(goods_id)
    this.getDailList(goods_id)
  },
  // 封装请求，获取数据
  getDailList(goods_id) {
    request({
        url: 'goods/detail',
        data: {
          goods_id
        }
      })
      .then(res => {
        // console.log(res)
        //获取设备系统的信息，再进行处理
        wx.getSystemInfo({
          success(result) {
            // console.log(result.system.toLowerCase())
            // .indexOf()       如果不包含字符串，返回 -1，包含返回字符串索引值
            // .includes()      是否包含字符串，返回结果 布尔类型
            if (result.system.toLowerCase().includes('ios')) {
              //因为 ios 不支持 webp 格式图片，所以要对富文本 webp图片格式部分替换成空字符
              res.goods_introduce = res.goods_introduce.replace(/\?.+?webp/g, '');
            }
          }
        })
        // console.log(res.goods_introduce)
        //把所有数据都添加到 data中
        this.setData({
          good_all: res
        })
      })
  },
  //图片预览
  previewImage(event) {
    // console.log(event)
    const {
      current
    } = event.currentTarget.dataset;
    // console.log(current)

    //通过 map 迭代方法，把数组对象，提取出 数组字符串
    const urls = this.data.good_all.pics.map(item => {
      return item.pics_big_url
    })
    wx.previewImage({
      current, //当前显示图片的http链接
      urls, //需要预览的图片http链接列表
    })
  },
  //加入购物车
  addToCart() {
    const {
      goods_id,
      goods_name,
      goods_price,
      goods_small_logo
    } = this.data.good_all;

    //整个购物车商品的集合
    //设置存储前，先获取之前的数据
    let cartList = wx.getStorageSync('cartList') || {};
    //如果商品己经在购物车存在，再点击应该是数量累加
    if (cartList[goods_id]) {
      cartList[goods_id].count ++;
    } else {
      //单个商品信息
      let goodsItem = {
        goods_id,
        goods_name,
        goods_price,
        goods_small_logo,
        selected: true,
        count: 1
      };
      // console.log(goodsItem)

      //把单条数据存放到集合中
      cartList[goods_id] = goodsItem;
      // console.log(cartList)
                  // //同步方法把数据存储到本地存储  //放else外面~~  //无论执行if或者else中的哪一步，都将其储到本地存储
                  // wx.setStorageSync('cartList', cartList)
    }

    //同步方法把数据存储到本地存储
    wx.setStorageSync('cartList', cartList)

    //加入成功后给用户提示
    wx.showToast({
      title: '加入成功',
      //提示的延迟时间
      duration: 1000,
      //显示透明蒙层，防止触摸穿透，这样就如同节流一样的效果
      mask: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})