<template>
    <div class="loginInfo">
        <div class="slides">
            <canvas id="canvas"></canvas>
            <!-- 隐藏 存储图片的容器 -->
            <canvas id="canvas_temp"></canvas>
        </div>

        <Form :model="user" class="loginStyle"  :label-width="80">
           <div class="title">cosmo后台登录系统</div>
            <FormItem label="用户名：">
                <Input  class="inpStyle" v-model="user.name" @on-change="iptChange()"  placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem label="密码：">
                <Input class="inpStyle"  v-model="user.mima"  type="password"  @on-change="iptChange()"  placeholder="请输入密码"></Input>
            </FormItem>
            <Button class="loginBtn" type="primary" :disabled="disabledStatus"  @click="loginBtnClick()">登录</Button>
        </Form>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            user : {
                name : "",
                mima: ""
            },
            disabledStatus : true
        }
    },
    methods : {
        loginBtnClick () {
            axios.post(`${cosmoHttp.admin}/back/login`, {
                "userName" : this.user.name,
                "password" : this.user.mima
            }).then((res) => {
                if(res.data.code === 1 ) {
                    window.location.href = "/#/" 
                }else{
                    this.$Message.info(res.data.msg);
                }
            })
        },
        iptChange() {
            if (this.user.name && this.user.mima){
                this.disabledStatus = false;
            }else {
                this.disabledStatus = true;
            }
        }
    },
    mounted() {
        document.addEventListener("keydown" ,(event) => {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if(e && e.keyCode==13){ // enter 键
                this.loginBtnClick();
            }
        })

        var imgs = [{
                imgUrl: 'http://www.wwlin.cn/img/imgCanvas1.jpg'
            },{
                imgUrl: 'http://www.wwlin.cn/img/imgCanvas2.jpg'
            },{
                imgUrl: 'http://www.wwlin.cn/img/imgCanvas3.jpg'
            },{
                imgUrl: 'http://www.wwlin.cn/img/imgCanvas4.jpg'
            },{
                imgUrl: 'http://www.wwlin.cn/img/imgCanvas5.jpg'
            },{
                imgUrl: 'http://www.wwlin.cn/img/imgCanvas6.jpg'
        }]

        var pro = {
            imgs : imgs ,
            width : 1920 ,
            height : 1080 ,
            callback : function () {
            }
        }
        new Main(pro);
    }
}

/**
 * data 2018-03-26 wwlin
 * 实例对象Main 为调用对象
*/
window.requestAnimationFrame = window.requestAnimationFrame || window.mosRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

function CanvasSliders(canvas, imgs, startIdx) {
    this.tmpCan = document.getElementById('canvas_temp');
    this.canvas = canvas;
    this.width = this.tmpCan.width = canvas.width;
    this.height = canvas.height;
    this.tmpCan.height = canvas.height * imgs.length;
    this.imgs = imgs;
    this.ctx = canvas.getContext('2d');
    this.tmpCtx = this.tmpCan.getContext('2d');
    this.curIndex = startIdx || 0;
    this.progress = 0;
    this.isChange = false;
    this.isStop = false;
    this.autoPlayInterval = 4500;
    var count = 0;
    this.imgs.forEach((item, idx) => {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = item.imgUrl;
        img.onload = () => {
            count++;
            this.tmpCtx.drawImage(img, 0, canvas.height * idx, canvas.width, canvas.height);
            if (idx === this.curIndex) {
                this.ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
            if (count === this.imgs.length) {
                window.requestAnimationFrame(this.slideRender.bind(this), false);
            }
        }
    })
}

CanvasSliders.prototype = {
    nextSlide: function () {
        this.curIndex++;
        if (this.curIndex >= this.imgs.length) {
            this.curIndex = 0;
        }
        this.nextPixel = [this.threshold(this.tmpCtx, this.curIndex),
            this.tmpCtx.getImageData(0, this.height * this.curIndex, this.width, this.height)]
        this.isChange = true;
        this.progress = 0;
    },

    preSlide: function () {
        this.curIndex--;
        if (this.curIndex < 0) {
            this.curIndex = this.imgs.length - 1;
        }
        this.nextPixel = [this.grayscale(this.tmpCtx, this.curIndex),
            this.tmpCtx.getImageData(0, this.height * this.curIndex, this.width, this.height)];
        this.isChange = true;
        this.progress = 0;
    },

    gradualChange: function () {
        var oriPixels = this.ctx.getImageData(0, 0, this.width, this.height);
        var oriData = oriPixels.data;
        var nextData = this.nextPixel[0].data;
        var length = oriData.length;
        var totalgap = 0;
        var gap = 0;
        var gapTemp;
        for (var i = 0; i < length; i++) {
            gapTemp = (nextData[i] - oriData[i]) / 15;

            if (oriData[i] !== nextData[i]) {
                gap = gapTemp > 1 ? Math.floor(gapTemp) : gapTemp < -1 ? Math.ceil(gapTemp) : oriData[i] < nextData[i] ? 1 : oriData[i] > nextData[i] ? -1 : 0;
                totalgap += Math.abs(gap);
                oriData[i] = oriData[i] + gap;
            }
        }

        this.ctx.putImageData(oriPixels, 0, 0);

        if (!totalgap) {
            this.nextPixel.shift();
            if (!this.nextPixel[0]) {
                this.isChange = false;
            }
        }
    },

    slideRender: function (timestamp) {
        if (this.isChange) {
            this.gradualChange();
        } else {
            var timeGap;
            if (!this.progress) {
                this.progress = timestamp;
            }
            timeGap = timestamp - this.progress;

            if (!this.isStop && timeGap > this.autoPlayInterval) {
                this.nextSlide();
            }
        }
        this.aniId = window.requestAnimationFrame(this.slideRender.bind(this), false);
    },

    grayscale: function (ctx, idx) {
        var pixels = ctx.getImageData(0, this.height * idx, this.width, this.height);
        var d = pixels.data;
        for (var i = 0; i < d.length; i += 4) {
            var r = d[i];
            var g = d[i + 1];
            var b = d[i + 2];
            var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            d[i] = d[i + 1] = d[i + 2] = v;
        }
        return pixels
    },

    threshold: function (ctx, idx) {
        var pixels = ctx.getImageData(0, this.height * idx, this.width, this.height);
        var d = pixels.data;
        for (var i = 0; i < d.length; i += 4) {
            var r = d[i];
            var g = d[i + 1];
            var b = d[i + 2];
            var v = (0.2126 * r + 0.7152 * g + 0.0722 * b >= 100) ? 255 : 128;
            d[i] = d[i + 1] = d[i + 2] = v;
        }
        return pixels;
    },

    stop: function () {
        this.isChange = false;
        this.ctx.clearRect(0, 0, this.width, this.height);
        window.cancelAnimationFrame(this.aniId);
    },
    loading : function (){
        var _body = document.getElementsByTagName("body")[0];
        var _loading = document.createElement("div");
        _loading.className= "loadingClass";
        _loading.innerHTML = '<div id="load">' +
                                '<div>G</div>' +
                                '<div>N</div>' +
                                '<div>I</div>' +
                                '<div>D</div>' +
                                '<div>A</div>' +
                                '<div>O</div>' +
                                '<div>L</div>' +
                            '</div>';
        _body.appendChild(_loading);
    },
    removerLoading () {
        var _loading = document.getElementsByClassName("loadingClass")[0];
        _loading.parentNode.removeChild(_loading);
    }
}


function Main(pro) {
    var obj  = {
        imgs : [] ,
        width : 1920 ,
        height : 1080 ,
        callback : function () {}
    }
    obj = Object.assign(obj , pro);

    var canvas = document.getElementById('canvas');
    canvas.width =  obj.width;
    canvas.height =  obj.height;
    this.slides = new CanvasSliders(canvas, obj.imgs);
    this.bindEvent(obj.callback);
}

Main.prototype = {
  bindEvent: function(callback) {
    callback()
  }
}


</script>
<style scoped>
    .loginInfo {
        width: 100%;
        height: 100%;
        position: relative;
        /* background: url('../../assets/gulishi.jpg') center center no-repeat; */
    }

    .slides{
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
    }

    #canvas {
        width: 100%;
        height: 100%;
    }
    .loginStyle {
        width: 310px;
        height: 260px;
        background-color: rgba(255, 255, 255, 0.7);
        /* background-color: #f8f8f9; */
        border-radius: 8px;
        box-shadow: 0  0 5px #495060;
        position: absolute;
        right: 300px;
        bottom: 190px;
        padding: 20px;
    }
    .title {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 10px;
        padding-left: 20px;
    }
    .inpStyle  {
        width: 180px;
    }
    .forgetBtn {
        width: 80px;
        margin-left: 30px;
        margin-right: 40px;
    }
    .loginBtn {
        width: 80px;
        margin:0px 0px 0px 80px;
    }
</style>