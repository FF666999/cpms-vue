<template>
  <div class="user-info">
    <el-row :span="24">
      <el-col :span="8">
        <basic-container>
          <div class="user-info__content">
            <img class="user-info__img"
                 :src="userInfo.userAvatar"
                 alt="" />
            <p class="user-info__name">{{userInfo.userName}}</p>
            <!-- <router-link class="user-info__setting"
                         :to="{path:'/info/setting'}" @click="notYetOpen">个人设置</router-link> -->
				<span class="user-info__setting" @click="notYetOpen">个人设置</span>
            <div class="user-info__detail-desc">
              <p><i :class="[userInfo.userSex == 1 ?'el-icon-female':'el-icon-male']"></i><span>{{userInfo.userAccount}}</span></p>
              <p><i class="el-icon-phone"></i><span>{{userInfo.userMobile}}</span></p>
              <p><i class="el-icon-postcard"></i><span>{{userInfo.tenantName}} · {{userInfo.deptName}}· {{userInfo.postName}}</span></p>
              <p>
                <i class="el-icon-user-solid"></i>
                 <span v-for="(item,index) in userInfo.roles">{{item.roleName}}、</span>
              </p>
            </div>
            <div class="user-info__divider"></div>
          </div>
        </basic-container>
      </el-col>
      <el-col :span="16">
         <basic-container>
				<el-tabs v-model="activeTab">
					<el-tab-pane label="个人信息" name="first">
						<div>
							<el-form :model="userInfoForm" :rules="rules" ref="userInfoForm"  id="userInfoForm" label-width="100px">
								<el-row :gutter="20">
									<el-col :span="11">
											<el-form-item label="真实姓名:" prop="userRealName">
												<el-input  clearable  v-model="userInfoForm.userRealName"/>
											</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="20">
									<el-col :span="11">
											<el-form-item label="昵称:" prop="userName">
												<el-input clearable v-model="userInfoForm.userName"/>
											</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="20">
									<el-col :span="11">
											<el-form-item label="手机号:" prop="userMobile">
												<el-input clearable v-model.number="userInfoForm.userMobile" oninput="value=value.replace(/[^\d]/g,'')"/>
											</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="20">
									<el-col :span="11">
											<el-form-item label="生日:" prop="userBirthday">
												<el-date-picker
												class="select-tenant"
													clearable
													v-model="userInfoForm.userBirthday"
													type="date"
													placeholder="选择日期">
												</el-date-picker>
											</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="20">
									<el-col :span="11">
										<el-form-item label="用户性别:" prop="userSex">
											<el-select v-model="userInfoForm.userSex" class="select-tenant" placeholder="请选择用户性别">
												<el-option label="未知" value="0"></el-option>
												<el-option label="男" value="1"></el-option>
												<el-option label="女" value="2"></el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<div class="user-info-form__footer" style="text-align:center">
									<el-button type="primary" round @click="modifiedPersonalInfo" size="small">修 改</el-button>
								</div>
							</el-form>
						</div>
					</el-tab-pane>
					<el-tab-pane label="修改密码" name="second">
							<div>
								<el-form :model="userPwdForm" :rules="pwdRules" ref="userPwdForm"  id="userPwdForm" label-width="100px">
									<el-row :gutter="20">
										<el-col :span="11">
												<el-form-item label="旧密码:" prop="oldPassword">
													<el-input  clearable show-password v-model="userPwdForm.oldPassword"/>
												</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="20">
										<el-col :span="11">
												<el-form-item label="新密码:" prop="newPassword">
													<el-input clearable show-password v-model="userPwdForm.newPassword"/>
												</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="20">
										<el-col :span="11">
												<el-form-item label="确认新密码:" prop="confirmPassword">
													<el-input clearable show-password v-model="userPwdForm.confirmPassword"/>
												</el-form-item>
										</el-col>
									</el-row>
									<div class="user-info-form__footer" style="text-align:center">
										<el-button type="primary" round @click="resetPassword" size="small">提 交</el-button>
									</div>
								</el-form>
							</div>
					</el-tab-pane>
				</el-tabs>
         </basic-container>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { dateFormat2 } from "@/util/date";
import { isMobile } from "@/util/validate";
import { setStore } from '@/util/store'
import {getUserDetail,modifiedPersonalInfo,resetPassword} from '@/api/system/user'
export default {
  	data () {
		var passwordValid = (rule, value,callback)=> {
			if (value != this.userPwdForm.newPassword) {
				callback(new Error("确认密码不一致"));
			}else{
				callback();
			}
		};
		var passwordLenValid =  (rule, value,callback)=> {
			if (value.length < 6) {
				callback(new Error("密码长度不能小于6位数"));
			}else{
				callback();
			}
		};
		var mobileValid = (rule, value,callback) =>{
			if (!isMobile(value)) {
				callback(new Error("手机号码不合法"));
			}else{
				callback();
			}
		}
    	return {
		  	activeTab:'first',
			rules:{
				userMobile: [
					{required: true, message: '请填写手机号', trigger: 'blur'},
					{ type: 'number', message: '必须为数字值'},
					{ required: true,validator: mobileValid,  trigger: 'blur' }
            ],
				userRealName: [
					{required: true, message: '请填写真实姓名', trigger: 'blur'}
					
            ],
				userName: [
					{required: true, message: '请填写昵称', trigger: 'blur'}
					
            ],
				userBirthday: [
               { type: 'date', required: true, message: '请选择生日日期', trigger: 'change' }
            ],
				userSex: [
               {  required: true, message: '请选择性别', trigger: 'change' }
            ],
			},
			userInfoForm:{
				userSex:'',
				userRealName:'',
				userName:'',
				userBirthday:'',
				userMobile:''
			},
			userPwdForm:{
				oldPassword:'',
				newPassword:'',
				confirmPassword:''
			},
			pwdRules:{
				oldPassword:[
					{ required: true, message: '请填写旧密码', trigger: 'blur' },
				],
				newPassword:[
					{ required: true, message: '请填写新密码', trigger: 'blur' },
					{ required: true,validator: passwordLenValid,  trigger: 'blur' }
				],
				confirmPassword:[
					{ required: true, message: '请填写确认密码', trigger: 'blur' },
					{ required: true,validator: passwordValid,  trigger: 'blur' }
				]
			},
    	};
  	},
   created () {
		this.getUserDetail(this.userInfo.userId)
   },
   computed: {
    ...mapGetters(["userInfo"]),
   },
   methods: {
		resetPassword(){
			this.$refs['userPwdForm'].validate((valid) => {
					if(valid){
						resetPassword(this.userPwdForm).then(res=>{
								if(res.success == true){
									this.$message({
											message: res.message,
											type: 'success'
									})
								}	
						})
					}
			})
		},
		getUserDetail(uId) {
			getUserDetail({userId:uId}).then(res=>{
				if(res.success == true) {
					this.userInfoForm = res.obj
					this.userInfoForm.userSex+=''
					this.userInfoForm.userMobile = Number(this.userInfoForm.userMobile)
					this.userInfoForm.userBirthday = new Date(res.obj.userBirthday)
				}
			})
		},
		modifiedPersonalInfo(){
			this.$refs['userInfoForm'].validate((valid) => {
				if (valid) { 
					let data = {} 
					data.userSex = this.userInfoForm.userSex
					data.userRealName = this.userInfoForm.userRealName
					data.userName = this.userInfoForm.userName
					data.userMobile = this.userInfoForm.userMobile
					// 日期格式转换
					data.userBirthday = dateFormat2(new Date(this.userInfoForm.userBirthday),"yyyy-MM-dd")
					modifiedPersonalInfo(data).then(res=>{
						if(res.success == true){
							this.$message({
									message: res.message,
									type: 'success'
							})
							this.refreshUserInfo(data)
                	}
					})
				}else{
					return false
				}
			});
		},
		refreshUserInfo(data){
			this.userInfo.userSex = data.userSex
			this.userInfo.userMobile = data.userMobile
			this.userInfo.userRealName = data.userRealName
			this.userInfo.userName = data.userName
			setStore({ name: 'userInfo', content: this.userInfo })
		},
      notYetOpen(){
			this.$alert('功能暂未开放', '提示', {
				confirmButtonText: '关闭',
				center: true
			});
      }
  }
};
</script>

<style scoped lang="scss">
#userInfoForm /deep/ .select-tenant {
	width: 100%;
}
.user-info-form__footer{
	margin-top:20px;
}
.user-info {
  .avue-tabs {
    padding: 0 10px;
  }
  .el-tabs__content {
    padding: 20px 0;
  }
  &__img {
    display: block;
    margin: 0 auto;
    border-radius: 100%;
    width: 100px;
    height: 100px;
  }
  &__name {
    text-align: center;
    font-size: 20px;
    line-height: 28px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 0;
    margin-top: 10px;
  }
  &__setting {
    margin-bottom: 12px;
    display: block;
    font-size: 12px;
    color: #409eff;
    text-align: center;
  }
  &__desc {
    text-align: center;
    width: 200px;
    margin: 0 auto;
  }
  &__detail-desc {
    margin-top: 50px;
    font-size: 14px;
    p {
      margin-bottom: 10px;
    }
    span {
      margin-left: 10px;
    }
  }
  &__divider {
    border-top: 1px dashed #e8e8e8;
    display: block;
    height: 0;
    width: 100%;
    margin: 24px 0;
    clear: both;
  }
  &__tags {
    .el-tag {
      margin: 0 5px 5px 0;
    }
  }
}
</style>
