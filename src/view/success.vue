<template>
  <div id="container">
      <div class="main">
            <div class="success_cont">
                <div class="title">
                    <dl>
                        <dt>
                            <img src="@/assets/images/success_info.png" alt="">
                        </dt>
                        <dd>
                            <h3>{{successText}}</h3>
                            <p>{{submitText}}</p>
                        </dd>
                    </dl>
                </div>
                <div class="personinfo_cont" v-show="showaddress">
                    <div class="form_cont">
                        <div class="form_list">
                            <label for="">收货人</label>
                            <input type="text" v-model="name">
                        </div>
                        <div class="form_list">
                            <label for="">手机号</label>
                            <input type="number" v-model="phone" pattern="[0-9]*">
                        </div>
                        <div class="form_list">
                            <label for="">详细地址</label>
                            <input type="text" v-model="address" placeholder="如街道、门牌号、小区等">
                        </div>
                    </div>
                    <div class="btn">
                        <button @click="submitAddress">提交地址</button>
                    </div>
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
            num: "",
            update: true,
            orderId: '',
            name: "", // 收货人
            phone: "", // 电话
            address: "", // 详细地址
            showaddress: true,
            successText: "支付成功",
            submitText: "请完善地址（用于邮寄文具大礼盒）" // 提交信息
        }
    },
    created() {
       this.getActiveinfo();
    },
    methods:{
        getQueryVariable(data){
            return getQueryVariable(data)
        },
        // 获取活动信息
        getActiveinfo(){
            this.orderId = this.getQueryVariable('orderId');
            console.log(this.orderId)
            this.$axios({
                url: `https://pay.geek-8.com/v2/agent/2021Jan/orders/${this.orderId}`,
                method: "GET"
            }).then((data)=>{
                console.log(data);
                if(data.data.result == "success"){
                    this.num = data.data.number;
                    // 前一百名显示地址提交信息  后一百名不显示
                    if(this.num > 100){
                        this.submitText = "我们的课程老师会在24小时内为孩子安排上课，请随时保持手机通讯畅通。";
                        this.showaddress = false; // 隐藏地址信息栏
                    }else{
                        this.submitText = "请完善地址（用于邮寄文具大礼盒）";
                        this.showaddress = true; // 隐藏地址信息栏
                    }
                }
            }).catch((error)=>{
                alert(error)
            })
        },
        // 提交地址
        submitAddress(){
            if(this.name == "" || this.phone == "" || this.address == ""){
                alert("每一项都需要填写");
                return;
            }
            var myreg=/^[1][2,3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(this.phone)) {
                alert("请填写正确的手机号码");
                return;
            }
            this.$axios({
                url: "https://pay.geek-8.com/v2/agent/2021Jan/address",
                method: "POST",
                data: {
                    orderId: this.orderId,
                    name: this.name,
                    mobile: this.phone,
                    address: this.address
                },
                header:{
                    'Content-Type':'application/json'  //如果写成contentType会报错
                }
            }).then((data) => {
                var data = data.data;
                if(data.result == "success"){
                    this.successText = "地址提交成功";
                    this.submitText = "我们的课程老师会在24小时内为孩子安排上课，请随时保持手机通讯畅通。";
                    this.showaddress = false; // 隐藏地址信息栏
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../styles/success.scss';
</style>