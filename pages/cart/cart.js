// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart:[],
    allchecked:false,
    totalNum:0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取缓存中的设备信息
    const cart=wx.getStorageSync('cart')||[];
    // 计算全选
    // every数组方法 会遍历 会接受一个回调函数 那么每一个回调函数都返回true 那么every方法返回值为true
    // 只要一个为false，则不再循环，直接返回false
    // 空数组调用every()，返回值为true
    // const allchecked=cart.length?cart.every(v=>v.checked):false;
    // 总设备数量
    this.setCart(cart);
  },
// 商品的选中
  handleItemChange(e) {
    // 获取被修改商品id
    const id = e.currentTarget.dataset.id;
    let cart=this.data.cart;
    console.log(cart);
    let index = cart.findIndex(v=>v.data.id===id);
    console.log(id);
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },
  // 商品的全选功能
  handleItemAllchecked(e) {
    let {cart,allchecked} = this.data;
    allchecked = !allchecked;
    // 循环修改cart数组中的商品选中状态
    cart.forEach(v=>v.checked=allchecked);
    // 把修改的值填充回data或者缓存中
    this.setCart(cart);
  },
  // 重新计算工具栏状态 重新计算底部工具栏的数据
  setCart(cart) {
    let allchecked=true;
    let totalNum=0;
    cart.forEach(v=>{
      if(v.checked){
        totalNum++;
      }else{
        allchecked=false;
      }
    })
    // 判断数组是否为空
    allchecked=cart.length?allchecked:false;
    this.setData({
      cart,
      allchecked,
      totalNum
    });
    wx.setStorageSync('cart', cart);
  },
  // 点击结算
  handlePay() {
    var that = this;
    const {totalNum} = this.data;
    // 判断是否选择工具
    if(totalNum===0) {
      wx.showToast({
        title: '你没有选择工具',
        icon: 'none'
      })
    }
    wx.request({
      url: 'http://120.76.42.81:8089/setEquipUsedBack',
      data:{
        cart:that.data.cart
      },
      method: 'POST',
      success(){
        
        wx.showToast({
          title: '归还成功',
          icon: 'success'
        });
      }
    })
    // 结算
    const cart = [];
    this.setCart(cart);
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