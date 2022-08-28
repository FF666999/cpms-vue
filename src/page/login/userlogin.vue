<template>
  <el-form class="login-form"
           status-icon
           :rules="loginRules"
           ref="loginForm"
           :model="loginForm"
           label-width="0">
    <el-form-item prop="account">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                v-model="loginForm.account"
                auto-complete="off"
                placeholder="请输入账号">
        <i slot="prefix"
           class="icon-yonghu"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                show-password
                v-model="loginForm.password"
                auto-complete="off"
                placeholder="请输入密码">
         <i slot="prefix"  class="icon-mima"></i> 
      </el-input>
    </el-form-item>
    <el-form-item prop="captcha">
      <el-row :span="24">
        <el-col :span="16">
          <el-input size="small"
                    @keyup.enter.native="handleLogin"
                    :maxlength="code.len"
                    v-model="loginForm.captcha"
                    auto-complete="off"
                    placeholder="验证码">
            <i slot="prefix"
               class="icon-yanzhengma"></i>
          </el-input>
        </el-col>
        <el-col :span="8">
          <div class="login-code">
            <img :src="code.src"
                 class="login-code-img"
                 @click="refreshCode"
                  />
          </div>
        </el-col>

      </el-row>
    </el-form-item>
    <p style="color:#29ab75;">账号:CS888888  &nbsp;&nbsp;&nbsp;密码:123456</p>
    <el-form-item>
      <el-button type="primary"
                 size="small"
                 @click.native.prevent="handleLogin"
                 class="login-submit">{{$t('login.submit')}}</el-button>
    </el-form-item>
  </el-form>
  
</template>

<script>
import { mapGetters } from "vuex";
import {captcha} from '@/api/system/user'
export default {
  name: "userlogin",
  data() {
    const validateCode = (rule, value, callback) => {
      if (this.code.value.toLowerCase() != value.toLowerCase()) {
        this.loginForm.code = "";
        this.refreshCode();
        callback(new Error("请输入正确的验证码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        codeKey:"",
        account: "CS888888",
        password: "123456",
        captcha: "",
        grantType:"password"
      },
      checked: false,
      code: {
        src: "",
        value: "",
        len: 5,
        type: "text"
      },
      loginRules: {
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        captcha: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 5, max: 5, message: "验证码长度为5位", trigger: "blur" },
          { required: true, trigger: "blur", validator: validateCode }
        ]
      }
    };
  },
  created() {
    this.refreshCode();
  },
  mounted() {},
  computed: {
    ...mapGetters(["tagWel"])
  },
  props: [],
  methods: {
    refreshCode() {
      captcha().then(res=>{
          this.code.src = res.obj.image
          this.code.value = res.obj.code
          this.loginForm.codeKey = res.obj.codeKey
      })
    },
  
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch("LoginByUsername", this.loginForm).then((b) => {
            if(b){
                this.$router.push({  path: this.redirect || this.tagWel.value });
            }else{
              this.refreshCode()
            }
          });
        }
      });
    }
  }
};
</script>

<style>
</style>
