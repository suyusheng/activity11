<template>
  <div id="container">
        <div class="main">
            <section id="section">
                <img src="@/assets/images/activeImg1.png" alt="">
                <img src="@/assets/images/activeImg2.png" alt="">
                <img src="@/assets/images/activeImg3.png" alt="">
                <div class="cont">
                    <img src="@/assets/images/img01.png" alt="" @click="openClass('sjr0','小蝌蚪编程思维启蒙课')">
                    <img src="@/assets/images/img02.png" alt="" @click="openClass('sjr1','少儿编程趣味课程')">
                    <img src="@/assets/images/img03.png" alt="" @click="openClass('sjr2','少儿编程小明星课程')">
                </div>
                <img src="@/assets/images/activeImg4.png" alt="">
                <img src="@/assets/images/activeImg5.png" alt="">
                <img src="@/assets/images/activeImg6.png" alt="">
                <img src="@/assets/images/activeImg7.png" alt="">
                <img src="@/assets/images/activeImg8.png" alt="">
                <img src="@/assets/images/activeImg9.png" alt="">
            </section>
            <div class="footer_list" v-show="showClass">
                <div style="height:478px"></div>
                <div class="class_cont">
                    <div class="title">
                        <span>请选择课程</span>
                        <img src="@/assets/images/close_btn.png" alt="" @click="closeClass">
                    </div>
                    <div class="class_list" v-for="(item,index) in classList" :key="index" @click="chooseClass(item.classtype,item.title)">
                        <dl>
                            <dd>
                                <span>{{item.age}}</span>
                                <p>{{item.title}}</p>
                                <p>{{item.desc}}</p>
                            </dd>
                            <dt>
                                <img :src="item.imgUrl" alt="">
                            </dt>
                        </dl>
                    </div>
                </div>
            </div>
            <footer id="footer">
                <div class="footer_left">
                    <img src="@/assets/images/robot.png" alt="">
                </div>
                <div class="footer_center">
                    <p><span>1元</span>秒杀<span style="padding-left:10px">免费</span>送礼</p>
                    <p>每天仅限前<span>100个</span>名额</p>
                </div>
                <div class="footer_right">
                    <button @click="immediate()">立即秒杀</button>
                </div>
            </footer>
        </div>
        <!-- 优惠券弹窗 -->
        <!-- <div class="dialog_youhuiquan" v-show="showDialog" @click="close">
            <div class="youhuiquan_cont">
                <dl>
                    <dt>
                        <img src="@/assets/images/youhuiquan.png" alt="">
                        <button>立即使用</button>
                    </dt>
                    <dd>
                        <img src="@/assets/images/close.png" alt="">
                    </dd>
                </dl>
            </div>
        </div> -->
        <div class="active_info" v-show="showActive" @touchmove.stop.prevent="moveHandle">
            <div class="active_cont">
                <div class="title">
                    <h3>{{activeinfo}}</h3>
                    <p>{{activedesc}}</p>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import getQueryVariable from '@/assets/js/url.js';
export default {
    data() {
        return {
            showActive: true, // 活动提示
            activeinfo: "活动未开始",
            activedesc: "活动将于1月1日0点开始，敬请期待。",
            // showDialog: false, // 优惠券
            showClass: false, // 课程选择
            nowDate: new Date().getTime(),
            startTime: "",
            endTime: "",
            classList: [
                {age:'4-7岁', title:'小蝌蚪编程思维启蒙课', desc:'学思维+编程+数学，衔接幼小知识。', imgUrl: require('@/assets/images/xiaokedou.png'), classtype: 'sjr0'},
                {age:'8-12岁', title:'少儿编程趣味课程', desc:'趣味动画式课堂，提升孩子逻辑思维。', imgUrl: require('@/assets/images/xingxing.png'), classtype: 'sjr1'},
                {age:'6-16岁', title:'少儿编程小明星课程', desc:'模块、代码切换课程，提升综合能力。', imgUrl: require('@/assets/images/robot.png'), classtype: 'sjr2'}
            ]
        }
    },
    created(){
        this.sharePyqmessage(); // 
        this.nowDate = new Date().getTime();
        this.startTime = this.getTargetTime("2021-1-1 00:00:00");
        this.endTime = this.getTargetTime("2021-1-4 10:00:00");
        // 活动未开始
        if(this.nowDate < this.startTime){
            this.activeinfo = "活动未开始";
            this.activedesc = "活动将于1月1日0点开始，敬请期待。";
            this.showActive = true;
        }else if(this.nowDate > this.startTime && this.nowDate < this.endTime){
            // 活动进行中
            this.activeinfo = "";
            this.activedesc = "";
            this.showActive = false;
        }else if(this.nowDate > this.endTime){
            // 活动已结束
            this.activeinfo = "活动已结束";
            this.activedesc = "活动已结束，请关注“极客晨星”微信公众号，参与其他活动。";
            this.showActive = true;
        }
        // console.log(this.nowDate,'---',this.startTime,'----',this.endTime)
    },
    methods:{
        getTargetTime(t){
            var d = t.split(" ")[0],
                h = t.split(" ")[1],
                date = new Date()

            date.setYear(d.split("-")[0])
            date.setMonth(d.split("-")[1] - 1)
            date.setDate(d.split("-")[2])

            date.setHours(h.split(":")[0])
            date.setMinutes(h.split(":")[1])
            date.setSeconds(h.split(":")[2])
            
            return date.getTime()    
        },
        moveHandle(){
            return;
        },
        // 关闭优惠券
        close(){
            this.showDialog = false;
        },
        // 点击立即秒杀
        immediate(){
            this.showClass = true;
        },
        // 关闭课程选择
        closeClass(){
            this.showClass = false;
        },
        // 选择课程类型
        chooseClass(classtype,title){
            this.$router.push({path:'/login',query:{classtype:classtype,title:title}});
        },
        openClass(classtype,title){
            console.log(classtype)
            this.$router.push({path:'/login',query:{classtype:classtype,title:title}});
        },
        // 微信分享
        sharePyqmessage(){
            var urlShared = window.location.href;
            var urlEncoded = encodeURIComponent(window.location.href);
            var urlRequest = 'https://mars.geek-8.com/jssdkparams?userurl=' + urlEncoded;
            // console.log('urlShared ' + urlShared);

            var xhr = new XMLHttpRequest();
            xhr.open('GET', urlRequest, true);

            xhr.onload = function () {
                if (xhr.status === 200) {
                var json = JSON.parse(xhr.response);
                var urlImg, title,wxdesc;
                urlImg = 'https://cdn2.geek-8.com/geekmooc/media/upload_03ab60358252ed9086db64989b5af894.png'; // 转发图标
                title = '极客晨星少儿编程1元秒杀'; // 转发标题
                wxdesc = '1元买价值399元少儿编程课，趣味少儿编程，适合4-16岁孩子。秒杀前100名送文具大礼盒。' // 转发描述

                wx.config({
                    debug: false,
                    appId: json.appId,
                    timestamp: json.timestamp,
                    nonceStr: json.nonceStr,
                    signature: json.signature,
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
                });

                wx.ready(function () {
                    wx.onMenuShareTimeline({
                        title: title + ':' + wxdesc,
                        link: urlShared,
                        imgUrl: urlImg,
                        success: function () {
                            console.log('分享成功'); 
                        },
                        cancel: function () {
                            console.log('分享失败');
                        }
                    });

                    wx.onMenuShareAppMessage({
                        title: title,
                        desc: wxdesc,
                        link: urlShared,
                        imgUrl: urlImg,
                        type: '',
                        dataUrl: '',
                        success: function () {
                            console.log('分享成功');
                        },
                        cancel: function () { 
                            console.log('分享失败');
                        }
                    });
                });
                }
            };
            xhr.send(null);
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/styles/home.scss';
</style>