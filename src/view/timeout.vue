<template>
  <div id="container">
      <div class="main">
          <div class="chaoshi_cont">
                 <div class="title">
                    <dl>
                        <dt>
                            <img src="@/assets/images/chaoshi.png" alt="">
                        </dt>
                        <dd>
                            <h3>支付超时</h3>
                            <p>由于您超时未支付，订单已被关闭，请重新下单。</p>
                        </dd>
                    </dl>
                    <button @click="okclick">确 定</button>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods: {
        okclick(){
            this.$router.push({path:'/login'});
        }
    }
}
</script>
<style lang="scss" scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html,body{
    width: 100%;
    height: 100%;
    margin: 0px;
    font-size: 16px;
}
button{
    outline: none;
    border: none;
}
#container{
    width: 100%;
    height: 100%;
    .main{
        width: 100%;
        height: auto;
        .chaoshi_cont{
            width: 100%;
            height: 100%;
            text-align: center;
            .title{
                width: 100%;
                dl{
                    dt{
                        padding-top: 121px;
                        img{
                            width: 72px;
                        }
                    }
                    dd{
                        padding-top: 25px; 
                        h3{                    
                            font-size: 40px;
                            font-family: PingFangSC-Semibold, PingFang SC;
                            font-weight: 600;
                            color: #393939;
                        }
                        p{                       
                            font-size: 24px;
                            font-family: PingFangSC-Regular, PingFang SC;
                            font-weight: 400;
                            color: #383838;
                            padding-top: 20px
                        }
                    }
                }
                button{
                    width: 340px;
                    height: 88px;
                    background: #FF8A22;
                    border-radius: 44px;
                    margin-top: 117px;               
                    font-size: 36px;
                    font-family: PingFangSC-Semibold, PingFang SC;
                    font-weight: 500;
                    color: #FFFFFF;
                }
            }
        }
    }
}
</style>