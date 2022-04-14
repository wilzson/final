// pages/goods_detail/index.js
/* 
1 点击工具栏 
*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    equipObj:{},
    collect:[],
    isCollect:false
  },
  // 设备对象
  // equipInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
     let pages = getCurrentPages();
     let currentPage = pages[pages.length-1];
     let options = currentPage.options;
     const {id}=options;
     this.getData(id);

  },    
  // 获取设备信息
  getData:function(id) {
    var that = this;
    wx.request({
      url: 'http://localhost:80/equipment',
      data:{
        id
      },
      success(res){
        console.log(res);
        // 获取数据库中的该用户收藏夹数组
        // wx.request({
        //   url: 'http://localhost/getCollectContent',
        //   data:{
        //     username:{}
        //   },
        //   success(res){
        //     that.collect=res.data;
        //     wx.setStorageSync('collect', that.collect);
        //     that.setData({
        //       collect:res.data
        //     })
        //   }
        // })
        let collect = wx.getStorageSync('collect')||[];
        // 2 判断当前商品是否被收藏
        let isCollect=collect.some(v=>v.id===that.data.equipObj.id);
        console.log(isCollect);
        that.setData({
          equipObj:res.data,
          isCollect
        })
      }
    })
  },
  handleCart() {
    var that = this;
    if(this.data.equipObj.used===true){
      wx.showToast({
        title: '该设备已被借用',
        icon: 'none'
      })
      return
    }
    console.log("gouwuche");
    wx.request({
      url: 'http://localhost:80/setused',
      data:{
        id:this.data.equipObj.id
      },
      success(){
        wx.showToast({
          title: '租借成功',
          icon: 'success'
        })
        that.getData(that.data.equipObj.id);
      },
    })
    
    // 获取缓存中的数据
    let cart=wx.getStorageSync('cart')||[];
    // 判断 是否存在工具栏数组
    let index=cart.findIndex(v=>v.data.id===this.data.equipObj.id);
    if(index===-1){
      this.data.equipObj.checked=true;
      cart.push(this.data.equipObj);
    }else{
      console.log("false");
    }
    // 把设备添加到缓存中
    wx.setStorageSync('cart', cart);
    console.log("handle");
    wx.navigateTo({
      url: '/pages/cart/cart',
    })
  },
  handleImage() {

  },
  handleUpdata() {
    wx.request({
      url: 'http://localhost:80/setused',
      data:{
        id:this.data.equipObj.id
      },
      success(){
        wx.showToast({
          title: '租借成功',
          icon: 'success'
        })
      }
    })
    
  },
  handleCollect() {
    let isCollect=false;
    // 1.获取缓存中的商品收藏数组
    let collect=wx.getStorageSync('collect')||[];
    // 2.判断当前商品是否存在缓存数组中
    let index=collect.findIndex(v=>v.id===this.data.equipObj.id);
    // 当存在则取消
    if(index!==-1) {
      // 能找到 已经收藏 在数组中删除
      collect.splice(index,1);
      isCollect=false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      })
    }else{
      // 没有收藏过
      collect.push(this.data.equipObj);
      isCollect=true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      })
    }
    // 4.把数组存入缓存中
    wx.setStorageSync('collect', collect);
    // 5.修改data中的属性isCollect
    this.setData({
      isCollect
    })
    // 将收藏夹中的商品存进后台
    wx.request({
      url: 'url',
    })
  }
})