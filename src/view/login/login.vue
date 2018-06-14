<template>
    <div class="loginInfo">
        <Form :model="user" class="loginForm"  :label-width="80">
            <div class="title-container">
                <h3 class="title">后台登录系统</h3>
            </div>
            <FormItem class="admin">
                <Icon class="nav_1" type="person"></Icon>
                <div class="adminInput">
                    <input  class="inpStyle" v-model="user.name" v-on:input="iptChange"  placeholder="请输入用户名" />
                </div>
            </FormItem>
            <FormItem class="keyword">
                <Icon class="nav_1" type="locked"></Icon>
                <div class="adminInput">
                    <input class="inpStyle"  v-model="user.mima"  type="password"  v-on:input="iptChange"  placeholder="请输入密码" />
                </div>
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
            axios.post(`/api/login`, {
                account : this.user.name,
                password : this.user.mima
            }).then((res) => {
                if(res.data.code === 1 ) {
                    localStorage.setItem('jwtToken', res.data.data.token);
                    localStorage.setItem('expire', res.data.data.expire);
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
    }
}
</script>
<style scoped>
    .loginInfo {
        width: 100%;
        height: 100%;
        position: fixed;
        background-color: #2d3a4b;
    }
    .loginForm {
        position: absolute;
        left: 0;
        right: 0;
        width: 520px;
        padding: 35px 35px 15px 35px;
        margin: 120px auto
    }
    .title {
        font-size: 26px;
        font-weight: 400;
        color: #eee;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold
    }

    .admin{
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
        margin-bottom: 22px;
    }
    .keyword {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
        margin-bottom: 22px;
    }

    .nav_1 {
        padding: 6px 5px 6px 15px;
        color: #889aa4;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
        font-size: 20px;
    }
    .adminInput {
        display: inline-block;
        height: 47px;
        width: 85%;
        font-size: 14px;
    }
    .inpStyle {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: #eee;
        height: 47px;
        line-height: 36px;
        outline: none;
    }
    .loginBtn {
        width: 100%;
        margin-bottom: 30px;
        padding: 10px 20px;
        font-size: 14px;
        border-radius: 4px;
        color: #fff;
        background-color: #409EFF;
        border-color: #409EFF;
    }
</style>