// pages/ca/ca.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        a1:[],
        a2:[],
        ans:[],
        n:[],
        image_a:[],
        operate:[
          "加法","减法","乘法","除法（保留2位小数）"
        ],
        operate_f:['+','-','*','/'],
        operate_selected:0,
        count:-1
    },
    m:10//常数，所有的位数控制
    ,
    /**
     * 获取n位的随机数组
     */
    getRandom(n){
        var a = []
        for(var i = 0;i < n;i++){
            a[i] = parseInt(Math.random()*100);
        }
        return a
    },
    pickerChange(e){
      this.setData({
        operate_selected:e.detail.value
      });
      this.getRandomTest()
    },
    /**
     * 初始化，设置问题和答案
     */
    getRandomTest(){
    
        var n1 = this.getRandom(this.m)
        var n2 = this.getRandom(this.m)
        var a = []
        for(var i = 0;i < this.m;i++){
          switch(parseInt(this.data.operate_selected)) {
            case 0:
              a[i] = n1[i] + n2[i];  
              break; 
            case 1:  
              a[i] = n1[i] - n2[i];  
              break;  
            case 2:  
              a[i] = n1[i] * n2[i];  
              break;  
            case 3:  
              a[i] = (n1[i] / n2[i]).toFixed(2);  
              break;  
            default:
              console.log("wu");
          }  
        }
        this.setData({
            a1:n1,
            a2:n2,
            ans:a,
            count:-1,
            n:[]
        })
    },
    /**
     * 检查是否填入完全
     */
    checkN(){
        if(this.data.n.length != this.m)
            return false
        for(var a in this.data.n)
          if(a == null)
            return false
        return true
    },
    /**
     * 提交事件
     */
    sumbitNum(){
        wx.showLoading({
            title: "校验中",
            mask: true
        });
        setTimeout(function(){
            wx.hideLoading()
          },1000)
        if(this.checkN()){
          var counts = 0
          var image_b = new Array(this.m).fill(false)
          for(var i = 0;i<this.m;i++){
            if (this.data.ans[i] == this.data.n[i]) {
              counts++
              image_b[i] = true
            }
          }
          this.setData({
            image_a:image_b,
            count:counts
          });
        }else{
            wx.showToast({
              title: '答案不完整',
              icon: 'error',
              duration: 2000
            })
        }
    },
    /**
     * 重置事件
     */
    resetNum(){
      this.getRandomTest()
      this.setData({
          image_a:new Array(10).fill(true),
          n:[],
          count:-1
      })
    },
    /**
     * 输入数据绑定
     * @param  e 
     */
    changeInput(e){
        var index = e.currentTarget.dataset.index
        this.data.n[index] = e.detail.value
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.resetNum()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})