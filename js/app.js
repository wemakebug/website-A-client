// created by guokeke @ 16.4.5
// 首页脚本
//
$(function(){
  //

  var app = function(){
    return app.prototype.init()
  }

  function getHeight(){
    return window.innerHeight
  }

  function getWidth(){
    return window.screen.width
  }

  function preLoadImage(img,src,callback){
    $(img).attr('src',src)
    $(img).load(callback);
  }

  function debounce(func,wait,immediate){
    var timeout
    if(!wait){
      wait = 250
    }
    return function(){
      var context = this,
      args = arguments;
      var later = function() {
        timeout = null
        if(!immediate) {
          func.apply(context,args)
        }
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later,wait)
      if(callNow){
        func.apply(context,args)
      }
    }
  }

  app.prototype = {
    init:function(){
      //    标志是否已经初始化,初始为false
      this.is_init = false

      var height = getHeight()
      var width = getWidth()
      var nav_height = $('.nav').height()
      //    设置状态状态
      this.setState({
        old_top:-1,
        headerHeight:height - nav_height,
        headerWidth:width,
        nav_top:height - nav_height,
        doc_height:$(document).height(),
        _slide:5,
        nav_height:nav_height,
        innovationPracticeSrc:"./innovationPractice.html"
      })

      return this.setup()
    },
    setup:function(){

      this
      .setupHeader()
      .setupInnovationPractice()

      if(!this.is_init) {
        return this.bind()
      }
      return this
    },

    bind:function(){

      this.bindNavScroll()
          .bindHeadArrow()

      this.is_init = true
      return this
    },

    setState:function(newState){
      if(this.state == undefined) {
        this.state = {}
      }
      this.state = Object.assign({},this.state,newState)

      // 未初始化前直接返回,否则重新构建
      if(!this.is_init) {
        return this.state
      } else {
        return this.setup()
      }
    },

    setupHeader:function(){
      var self = this,
          canvas = $('.head-canvas'),
          ctx = canvas[0].getContext('2d'),
          image = $('.head-image-image'),
          cover = $('.head-image-cover'),
          head = $('.head')

      //   重新设定图片宽度
      this.setWidth(head[0],this.state.headerWidth)
      this.setWidth(canvas[0],this.state.headerWidth)
      this.setWidth(image[0],this.state.headerWidth)

      // 减去导航的高度
      this.setHeight(head[0],this.state.headerHeight)
      this.setHeight(canvas[0],this.state.headerHeight)
      this.setHeight(image[0],this.state.headerHeight)

      // 这是预览效果
      var m = new Image()
      m.onload = function(){
        ctx.drawImage(m,0,0,self.state.headerWidth,self.state.headerHeight)
        // 将图片模糊
        StackBlur.canvasRGBA(canvas[0], 0, 0, self.state.headerWidth, self.state.headerHeight, 8)
      }
      // 图片跨源
      // crossOrigin 需要设置在src属性设置前先设置
      m.crossOrigin = "anonymous"
      m.src = 'http://7xsoiv.com2.z0.glb.clouddn.com/img-1.jpg?imageView2/2/w/500/h/500/interlace/0/q/100'
      this.preLoadHeaderImage(image,'http://7xsoiv.com2.z0.glb.clouddn.com/img-1.jpg',function(){
        image.addClass('head-image-image-active')
        canvas.addClass('head-canvas-hide')
      })

      return this
    },

    preLoadHeaderImage:function(img,src,callback){
      preLoadImage(img,src,callback);
    },

    setWidth:function(e,width){
      $(e).attr('width',width)
    },

    setHeight:function(e,height){
      $(e).attr('height',height)
    },

    setupNav:function(){

    },
    // 加载iframe
    setupInnovationPractice:function(){
      $('#innovationPractice').attr("src",this.state.innovationPracticeSrc)

      return this
    },

    bindNavScroll:function(){
      var self = this

      // 滚动模式
      // $(window).on('wheel',debounce(function(e){
      //   self.wheelHandler(e)
      // },250,false))

      $(window).on('scroll',function(e){
        self.scrollHandler(e)
      })

      return this
    },

    scrollHandler:function(e){
      var current_top = $(document).scrollTop()

      if(current_top < this.state.old_top) {

      } else {

      }
      if(current_top >= this.state.nav_top) {
        $('.nav').addClass('nav-active')
        $('.central-news').addClass('central-news-active')
      } else {
        $('.nav').removeClass('nav-active')
        $('.central-news').removeClass('central-news-active')
      }
    },

    wheelHandler:function(e){
      // e.preventDefault()
      var current_top = $(document).scrollTop()
      if(e.originalEvent.wheelDelta <= 0) {
        // 向下
        this.windowGoDown(current_top)
      } else {
        // 向上
        this.windowGoUp(current_top)
      }

      this.setState({old_top:current_top})
    },

    windowGoDown:function(current_top){
      if(current_top < this.state.doc_height - this.headerHeight){
        this.setScrollTop(current_top + this.headerHeight)
      } else {
        this.setScrollTop(this.state.doc_height - this.headerHeight)
      }
    },

    windowGoUp:function(current_top){
      if(current_top - this.headerHeight > 0){
        this.setScrollTop(current_top - this.headerHeight)
      } else {
        this.setScrollTop(0)
      }
    },

    setScrollTop:function(value) {

      var set = function(v) {
        var current_top = $(document).scrollTop(),
            dis = value - current_top

        if(Math.abs(dis) < 30){
          $(document).scrollTop(value)
        } else {
          $(document).scrollTop(current_top + dis/6)
          setTimeout(function(){
                set(value)
            },25)
        }
      }
      return set(value)
    },

    bindHeadArrow:function(){
      var self = this
      $('.head-arrow-arrow').on('click',function(){
        self.setScrollTop(self.headerHeight)
      })

      return this
    }
  }
  app();



  
})
