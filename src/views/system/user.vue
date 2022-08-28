<template>
		<basic-container>
			<el-row :gutter="20">
				<el-col :span="5" class="grid-content">
					<el-input
						placeholder="输入关键字进行过滤"
						clearable
						v-model="filterText" class="filter-input">
						</el-input>
					<div class=" grid-content-left">
						<el-tree
						class="filter-tree"
						:data="deptTree"
						:props="props"
						:filter-node-method="filterNode"
						:expand-on-click-node="false"
						@node-click="selectedNode"
						ref="tree">
						</el-tree>
					</div>
				</el-col>

				<el-col :span="19">
						<div class="grid-content grid-content-right" >
							<el-form  :model="quryForm" ref="quryForm" label-width="80px">
									<el-row :gutter="10">
										<el-col :span="6">
											<el-form-item label="用户账号:">
													<el-input clearable v-model="quryForm.userAccount" placeholder="用户账号"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											<el-form-item label="真实姓名:">
													<el-input clearable v-model="quryForm.userRealName" placeholder="真实姓名"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="10">
											<el-button type="primary" size="small" class="el-icon-search-class" icon="el-icon-search" @click="queryBtn">查询</el-button>
											<el-button  size="small" icon="el-icon-delete" @click="resetQuryForm('quryForm')">清空</el-button>
										</el-col>
									</el-row>
							</el-form>
							<el-row>
								<el-col :span="2" v-has="'sys_user_add'">
									<el-button
										type="primary"
										@click="formhandle('','add','userForm')"
										size="mini"
										icon="el-icon-plus">
										新增
									</el-button>
								</el-col>
								<el-col :span="2" v-has="'sys_user_modified_pwd'">
									<el-button
										type="warning"
										@click="handlePassword()"
										size="mini" icon="el-icon-lock">
										修改密码
									</el-button>
								</el-col>
							</el-row>
							<el-table
								:data="tableData"
								ref="multipleTable"
								max-height="550"
								border
								row-key="menuId"
								v-loading = "isLoading"
								element-loading-text = "加载中，请稍后..."
								element-loading-background = "rgba(255, 255, 255, .5)"
								element-loading-spinner = "el-icon-loading"
								:tree-props="{children: 'children'}"
								@selection-change="handleSelectionChange"
								style="width: 100%">
								<el-table-column
								type="selection"
								:selectable="selectable"
								fixed="left"
								width="55">
								</el-table-column>
								<el-table-column
								align="center"
								type="index"
								label="#"
								fixed="left"
								width="50">
								</el-table-column>
								<el-table-column
								prop="userAccount"
								label="用户账号"
								width="100">
								</el-table-column>
								<el-table-column
								prop="userRealName"
								label="真实姓名"
								width="100">
								</el-table-column>
								<el-table-column
								prop="userStatus"
								label="用户状态"
								width="150">
								<template slot-scope="scope">
									<el-tag :class="scope.row.userStatus == 0 ?'user-status-tag-normal':'user-status-tag-disable'" :type="scope.row.userStatus == 0 ?'success':'danger' ">{{scope.row.userStatus == 0 ? "正常":"已禁用"}}</el-tag>
									<el-switch
									@change="handleUserStatus(scope.row)"
									v-model="scope.row.userStatus"
									:disabled="scope.row.sysData==1 ? true: false"
									active-color="#13ce66"
									inactive-color="#ff4949"
									active-value=0
									inactive-value=1
									>
									</el-switch>
								</template>
								</el-table-column>
								<el-table-column
								prop="tenantName"
								label="所属租户"
								:show-overflow-tooltip="true"
								width="250">
								</el-table-column>
								<el-table-column
								prop="deptName"
								label="所属部门"
								:show-overflow-tooltip="true"
								width="250">
								</el-table-column>
								<el-table-column
								prop="postName"
								:show-overflow-tooltip="true"
								label="所属岗位"
								width="250">
								</el-table-column>
								<el-table-column
								prop="roleNames"
								:show-overflow-tooltip="true"
								label="所属角色"
								width="180">
								</el-table-column>
								<el-table-column
								prop="createTime"
								label="创建时间"
								width="180">
								</el-table-column>
								<el-table-column
								prop="createBy"
								label="创建人"
								width="130">
								</el-table-column>
								<el-table-column
								prop="updateTime"
								label="更新时间"
								width="180">
								</el-table-column>
								<el-table-column
								prop="updateBy"
								label="更新人"
								width="130">
								</el-table-column>
								<el-table-column
								align="center"
								fixed="right"
								label="操作"
								width="200">
								<template slot-scope="scope">
										<el-button @click="checkHandle(scope.row)" v-has="'sys_user_view'"  type="text" size="small"><i class="el-icon-view"></i>查看</el-button>
										<el-button @click="formhandle(scope.row,'edit','userForm')" type="text" size="small" v-has="'sys_user_edit'"><i class="el-icon-edit"></i>编辑</el-button>
										<el-button v-if="scope.row.sysData != 1" @click="delhandle(scope.row)"  type="text" v-has="'sys_user_delete'" size="small"><i class="el-icon-delete"></i>删除</el-button>
								</template>
								</el-table-column>
       					 </el-table>
							<el-row :gutter="20" class="page-list">
								<el-col :span="10" :offset="12">
									<el-pagination
										background
										@size-change="handleSizeChange"
										@current-change="handleCurrentChange"
										:current-page.sync="currentPage"
										:page-size="pageSize"
										:page-sizes="[10, 20, 30, 40]"
										layout="total, sizes, prev, pager, next, jumper"
										:total="totalNum">
									</el-pagination>
								</el-col>
							</el-row>
						</div>
				</el-col>
			</el-row>

			<el-drawer
			   class="handleDrawer"
				:title="drawerType==='add'?'新增':'编辑'"
				:visible.sync="drawerDialog"
				direction="rtl"
				:wrapperClosable="false"
				:show-close="false"
				size="40%"
				custom-class="demo-drawer"
				ref="drawer"
				>
				<div class="demo-drawer__content">
					<el-form :model="userForm" ref="userForm"  :rules="userFormRules">
						<p class="divider-text"><i class="el-icon-s-order"></i><span>基础信息</span></p>
    					<el-divider></el-divider>
						<el-row v-show='drawerType == "add" '>
							<el-col :span="24">
								<el-form-item label="所属租户：" label-width="98px" prop="tenantId">
									<el-select v-model="userForm.tenantId" filterable clearable class="select-tenant" @change="selectTenant" placeholder="请选择所属租户">
										<el-option
											v-for="item in tenants"
											:key="item.tenantId"
											:label="item.tenantName"
											:value="item.tenantId">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="所属部门：" label-width="98px" prop="deptId">
									<el-cascader
									:key="cascaderKey"
									class="select-tenant"
									placeholder="请选择所属部门"
									:options="depts"
									:props="props"
									v-model="userForm.deptId"
									clearable
									filterable>
									</el-cascader>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row >
							<el-col :span="11">
								<el-form-item label="所属岗位：" label-width="98px" prop="postId">
									<el-select v-model="userForm.postId"  filterable clearable class="select-tenant" placeholder="请选择所属岗位">
										<el-option
											v-for="item in postList"
											:key="item.postId"
											:label="item.postName"
											:value="item.postId">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="13">
								<el-form-item label="所属角色：" label-width="98px" prop="roleId">
									<el-select :disabled="userForm.sysData==1 ? true:false" v-model="userForm.roleId" multiple filterable clearable class="select-tenant" placeholder="请选择所属角色">
										<el-option
											v-for="item in roleList"
											:key="item.roleId"
											:label="item.roleName"
											:disabled="item.disabled"
											:value="item.roleId">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<p class="divider-text"><i class="el-icon-tickets"></i><span>详细信息</span></p>
    					<el-divider></el-divider>
						<el-row>
							<el-col :span="11">
									<el-form-item label="登录账号：" class="user-account" label-width="98px" prop="userAccount">
										<el-input  v-model="userForm.userAccount" disabled ></el-input>
									</el-form-item>
							</el-col>
							<el-col :span="11">
								<el-form-item label="用户性别：" label-width="98px" prop="userSex">
								<el-select v-model="userForm.userSex" class="select-tenant" placeholder="请选择用户性别">
										<el-option label="未知" value="0"></el-option>
										<el-option label="男" value="1"></el-option>
										<el-option label="女" value="2"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>

						<el-row>
                    <el-col :span="11">
                        <el-form-item label="真实姓名：" label-width="98px" prop="userRealName">
                            <el-input clearable v-model="userForm.userRealName" placeholder="请输入真实姓名" ></el-input>
                        </el-form-item>
                     </el-col>
						   <el-col :span="11">
                        <el-form-item label="用户昵称：" label-width="98px" prop="userName">
                            <el-input clearable  v-model="userForm.userName" placeholder="请输入昵称" ></el-input>
                        </el-form-item>
                     </el-col>
						</el-row>

						<el-row>
                    <el-col :span="11">
                        <el-form-item label="手机号码：" label-width="98px" prop="userMobile">
                            <el-input clearable v-model.number="userForm.userMobile" oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入手机号码" ></el-input>
                        </el-form-item>
                     </el-col>
						   <el-col :span="11">
                        <el-form-item label="用户生日：" label-width="98px" prop="userBirthday">
							<el-date-picker
								clearable
								v-model="userForm.userBirthday"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
                        </el-form-item>
                     </el-col>
						</el-row>

						<el-row v-show='drawerType == "add" '>
                    <el-col :span="11">
                        <el-form-item label="用户密码：" label-width="98px" prop="userPassword">
                            <el-input clearable v-model="userForm.userPassword"  placeholder="请输入用户密码" ></el-input>
                        </el-form-item>
                     </el-col>
						</el-row>
					</el-form>
					<div class="demo-drawer__footer" style="text-align:center">
						<el-button @click="closeDrawer">关 闭</el-button>
						<el-button type="primary" @click="onSubmit">确 定</el-button>
					</div>
				</div>
			</el-drawer>

			 <el-dialog
				class="tetee"
				title="查看"
				:visible.sync="checkDialogType"
				width="45%"
				>
				<p class="divider-text"><i class="el-icon-s-order"></i><span>基础信息</span></p>
    					<el-divider></el-divider>
				<el-row :gutter="2" class="row-text">
						<el-col :span="2" class="col-text">
							所属租户:
						</el-col> 
						<el-col :span="9" >
							{{checkInfo.tenantName}}
						</el-col> 
						<el-col :span="2" class="col-text">
							所属岗位:
						</el-col> 
						<el-col :span="9">
							{{checkInfo.postName}}
						</el-col> 
				</el-row>
				<el-row :gutter="10" class="row-text">
						<el-col :span="2" class="col-text">
							所属部门:
						</el-col> 
						<el-col :span="9" >
							{{checkInfo.deptName}}
						</el-col> 
				</el-row>
				<el-row :gutter="10" class="row-text">
						<el-col :span="2" class="col-text">
							所属角色:
						</el-col> 
						<el-col :span="9" >
							{{checkInfo.roleNames}}
						</el-col> 
				</el-row>
				<p class="divider-text"><i class="el-icon-tickets"></i><span>详细信息</span></p>
    			<el-divider></el-divider>
				<el-row :gutter="2" class="row-text">
					<el-col :span="2" class="col-text">
						用户账号:
					</el-col> 
					<el-col :span="9" >
						{{checkInfo.userAccount}}
					</el-col> 
					<el-col :span="2" class="col-text">
						用户性别:
					</el-col> 
					<el-col :span="9">
						{{checkInfo.userSex == '0' ? "未知" : (checkInfo.userSex == '1' ? "男" : "女")}}
					</el-col> 
				</el-row>
				<el-row :gutter="2" class="row-text">
					<el-col :span="2" class="col-text">
						真实姓名:
					</el-col> 
					<el-col :span="9" >
						{{checkInfo.userRealName}}
					</el-col> 
					<el-col :span="2" class="col-text">
						用户昵称:
					</el-col> 
					<el-col :span="9">
						{{checkInfo.userName}}
					</el-col> 
				</el-row>
				<el-row :gutter="2" class="row-text">
					<el-col :span="2" class="col-text">
						手机号码:
					</el-col> 
					<el-col :span="9" >
						{{checkInfo.userMobile}}
					</el-col> 
					<el-col :span="2" class="col-text">
						用户生日:
					</el-col> 
					<el-col :span="9">
						{{checkInfo.userBirthday}}
					</el-col> 
				</el-row>
        </el-dialog>

		 	<el-dialog class="tetee" :title="'修改密码'+'(当前账号：'+modifiedUserAccount+')'" :visible.sync="modifiedVisible" width="32%" center>
				<el-form :model="modifiedPasswordForm" ref="passwordForm" :rules="modifiedPasswordRule">
					<el-form-item label="新密码" label-width="98px" prop="newPassword">
						<el-input v-model="modifiedPasswordForm.newPassword" clearable show-password autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" label-width="98px" prop="confirmPassword">
						<el-input v-model="modifiedPasswordForm.confirmPassword" clearable show-password autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="modifiedVisible = false">取 消</el-button>
					<el-button type="primary" @click="modifiedPassword()">确 定</el-button>
				</div>
			</el-dialog>
		</basic-container>
</template>

<script>
import {allDeptTree} from '@/api/system/dept'
import {dropDownTenants} from '@/api/system/tenant'
import {listPost} from '@/api/system/post'
import {listRole} from '@/api/system/role'
import {userList,getUserDetail,generateAccount,addUser,updateUser,deleteUser,checkUserInfo,modifiedPassword,changeUserStatus} from '@/api/system/user'
import {dateFormat2 } from "@/util/date";
import { getAllParentNodeByChildNode } from "@/util/util";
import { isMobile } from "@/util/validate";
import {getStore} from '@/util/store'

export default {
  	data() {
		var passwordValid = (rule, value,callback)=> {
		// rule 对应使用bargainMoney自定义验证的 对象
		// value 对应使用bargainMoney自定义验证的 数值 
		// callback 回调函数
			if (value != this.modifiedPasswordForm.newPassword) {
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
			modifiedVisible:false,
			checkDialogType:false,
			drawerDialog:false,
			drawerType:"add",
			pageSize:10,
			totalNum:0,
			currentPage:1,
			isLoading:true,
			multipleSelection: [],
			modifiedPasswordForm:{
				newPassword:'',
				confirmPassword:'',
				userId:''
			},
			modifiedUserAccount:'',
			quryForm:{
				userAccount:'',
				userRealName:'',
				deptId:''
			},
			userForm:{
				roleId:[],
				postId:'',
				tenantId:'',
				deptId:[],
				userSex:'',
				userRealName:'',
				userName:'',
				userAccount:'',
				userBirthday:'',
				userPassword:'',
				userMobile:'',
				sysData: '0'
			},
			checkInfo:{},
			filterText: '',
			deptTree: [],
			tableData:[],
			tenants:[],
			postList:[],
			depts:[],
			roleList:[],
			userFormRules:{
				tenantId: [
					{ required: true, message: '请选择租户', trigger: 'change' }
				],
					deptId: [
					{ required: true, message: '请选择部门', trigger: 'change' }
				],
					postId: [
					{ required: true, message: '请选择岗位', trigger: 'change' }
				],
					roleId: [
					{ required: true, message: '请选择角色', trigger: 'change' }
				],
					userAccount: [
					{ required: true, message: '请填写登录账号', trigger: 'blur' }
				],
				userSex:[
						{ required: true, message: '请选择性别', trigger: 'change' }
				],
				userRealName:[
						{ required: true, message: '请填写真实姓名', trigger: 'blur' }
				],
				userName:[
						{ required: true, message: '请填写用户昵称', trigger: 'blur' }
				],
				userMobile:[
					{ required: true, message: '请填写手机号码', trigger: 'blur' },
					{ type: 'number', message: '必须为数字值'},
					{ required: true,validator: mobileValid,  trigger: 'blur' }
					
				],
				userBirthday: [
					{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
				],
				userPassword:[
					{ required: true, message: '请填写密码', trigger: 'blur' }
				],
				
			},
			modifiedPasswordRule:{
				newPassword:[
					{ required: true, message: '请填写新密码', trigger: 'blur' },
					{ required: true,validator: passwordLenValid,  trigger: 'blur' }
				],
				confirmPassword:[
					{ required: true, message: '请填写确认密码', trigger: 'blur' },
					{ required: true,validator: passwordValid,  trigger: 'blur' }
				]
			},
			currentEditRow:{},
			selectedTopDeptId:'',
			loginUserInfo:getStore({ name: 'userInfo' }),
			cascaderKey:1
		};
  	},
	props:{
		/* 树形下拉配置项 */
		props:{
			type: Object,
			default:()=>{
					return {
					checkStrictly: true,
					id:"deptId", // 主键字段名
					value:'deptId',       // ID字段名
					label: 'deptName',     // 显示名称
					children: 'children'  // 子级字段名
					}
			}
		},
	},
   created() {
        this.initData()
   },
	methods:{
		selectable(row,index){
			let curTenantId = this.loginUserInfo.tenantId
			let curTenantCode = this.loginUserInfo.tenantCode

            if( row.sysData == 1 && curTenantCode == 'CPMS_HEADQUARTERS' && row.tenantId == curTenantId) {
                return false
            }
			if(curTenantCode != 'CPMS_HEADQUARTERS' && row.sysData == 1) {
				return false
			}
			return true
        },
		modifiedPassword(){
			this.$refs['passwordForm'].validate((valid) => {
				if(valid){
					modifiedPassword(this.modifiedPasswordForm).then(res=>{
						if(res.success == true){
							this.$message({
									message: res.message,
									type: 'success'
							})
							this.modifiedVisible = false
						}
						return
					})
				}
			})
		},
		handlePassword(){
			if(this.multipleSelection.length <=0){
				this.$message({
						message: "请先选择用户",
						type: 'warning'
				})
				return
			}

			if(this.multipleSelection.length > 1){
				this.$message({
						message: "不能选择多个用户",
						type: 'warning'
				})
				return
			}
			this.modifiedVisible = true
			this.$nextTick(()=>{
				this.$refs["passwordForm"].resetFields();//清空表单
			})
			this.modifiedUserAccount = this.multipleSelection[0].userAccount
			this.modifiedPasswordForm.userId = this.multipleSelection[0].userId
		},
		delhandle(row){
			this.$confirm(`确定要（删除）【${row.userAccount}】用户吗?`, '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
			}).then(() => {
			deleteUser({userId:row.userId,tenantId:row.tenantId}).then(res=>{
					if(res.success == true){
						this.$message({
							message: res.message,
							type: 'success'
						})
						this.userList({deptId:this.selectedTopDeptId})
					}
			})
			}).catch(() => {});
      },
		selectTenant(val){
			this.userForm.deptId = []
			this.userForm.postId = ''
			this.userForm.roleId = []
			allDeptTree({tenantId:val}).then(res=>{
				this.depts = res.obj
			})
			listPost({tenantId:val,pagingFlag:false}).then(res=>{
				this.postList = res.obj.list
				
			})
			listRole({tenantId:val,pagingFlag:false}).then(res=>{
				if(res.obj.list !=null && res.obj.list.length > 0) {
					this.roleList = res.obj.list
					for (const item of this.roleList) {
						if(item.roleCode == 'SUPER_ADMINISTRATOR' || item.roleCode == 'TENANT_ADMINISTRATOR') {
							item.disabled = true
						}
					}
				}
				
			})
			if(this.drawerType == "add") {
				generateAccount({tenantId:val}).then(res=>{
					this.userForm.userAccount = res.obj
				})
			}
		},
		resetQuryForm(){
			this.currentPage = 1
			this.quryForm.userAccount = ''
			this.quryForm.userRealName = ''
			this.quryForm.pageNo = 1
			this.quryForm.pageSize = this.pageSize
			this.userList(this.quryForm)
		},
		queryBtn(){
			this.currentPage = 1
			this.quryForm.pageNo = 1
			this.quryForm.pageSize = this.pageSize
			this.userList(this.quryForm)
		},
		initData(){
			this.allDeptTree({})
			this.userList({})
			this.dropDownTenants()
		},
		dropDownTenants(){
			dropDownTenants().then(res=>{
				this.tenants = res.obj
			})
		},
		allDeptTree(data){
			allDeptTree(data).then(res=>{
				this.deptTree = res.obj
			})
		},
		userList(data){
			userList(data).then(res=>{
				this.tableData = res.obj.list
				this.totalNum = res.obj.total
				this.isLoading =false
			})
		},
		filterNode(value, data) {
			if (!value) return true;
			return data.deptName.indexOf(value) !== -1;
        },
		handleSizeChange(val) {
			this.pageSize = val
			this.currentPage = 1
			this.quryForm.pageNo = this.currentPage
			this.quryForm.pageSize = val
			this.userList(this.quryForm)
		},
		handleCurrentChange(val) {
			this.quryForm.pageNo = this.currentPage
			this.quryForm.pageSize =this.pageSize
			this.userList(this.quryForm)
		},
		handleSelectionChange(val) {
         this.multipleSelection = val;
        },
		selectedNode(data,node,obj){
			this.selectedTopDeptId =  data.deptId
			this.currentPage = 1
			this.quryForm.deptId = data.deptId
			var data = {
				pageNo:this.currentPage,
				pageSize:this.pageSize,
				deptId:data.deptId
			}
			this.userList(data)
		},

		checkHandle(row){
			checkUserInfo({userId:row.userId}).then(res=>{
				this.checkInfo =res.obj
				this.checkInfo.userAccount = row.userAccount
				this.checkInfo.userName = row.userName
				this.checkInfo.userRealName = row.userRealName
				this.checkInfo.postName = row.postName
				this.checkInfo.roleNames = row.roleNames
				this.checkInfo.tenantName = row.tenantName
				this.checkInfo.deptName = row.deptName
			})
			this.checkDialogType = true
		},

		closeDrawer(){
			this.drawerDialog = false
		},

	   formhandle(row,type,form){
			this.drawerType = type
			this.drawerDialog = true
			if(this.drawerType == "add") {
					this.depts = []
					this.postList = []
					this.roleList = []
					this.userForm.sysData = '0'
					this.$nextTick(()=>{
						this.$refs[form].resetFields();//清空表单
					})
			}else{
				this.$nextTick(()=>{
					this.currentEditRow.deptId = row.deptId
					this.currentEditRow.userId = row.userId
					this.userForm.tenantId = row.tenantId
					this.userForm.sysData = row.sysData
					this.userForm.userPassword = "****"
					this.userForm.userAccount = row.userAccount
					this.userForm.userName = row.userName
					this.userForm.userRealName = row.userRealName
					this.selectTenant(row.tenantId)
					this.userForm.postId = row.postId
					this.userForm.roleId = []
					this.userForm.roleId = row.roleIds !=null ?row.roleIds.split(",") : []
					
					getUserDetail({userId:row.userId}).then(res=>{
						this.userForm.userBirthday = new Date(res.obj.userBirthday)
						this.userForm.userMobile = Number(res.obj.userMobile)
						this.userForm.userSex = res.obj.userSex+""
					})
					this.$refs[form].clearValidate()
				})
			}
		},
		onSubmit(){
			this.$refs['userForm'].validate((valid) => {
				if(valid) {
					let data = {}
						data.tenantId = this.userForm.tenantId
						data.deptId = this.userForm.deptId[this.userForm.deptId.length - 1]
						data.postId = this.userForm.postId
						data.userId = this.userForm.userId
						data.roleIds = this.userForm.roleId
						data.userAccount = this.userForm.userAccount
						data.userMobile = this.userForm.userMobile
						data.userName = this.userForm.userName
						data.userPassword = this.userForm.userPassword
						data.userRealName = this.userForm.userRealName
						data.userSex =  this.userForm.userSex
						data.userBirthday = dateFormat2(new Date(this.userForm.userBirthday),"yyyy-MM-dd")
					if(this.drawerType == 'add'){
						addUser(data).then(res=>{
							if(res.success == true){
								this.$message({
										message: res.message,
										type: 'success'
								})
								this.drawerDialog = false
								this.userList({deptId:this.selectedTopDeptId})
							}
						})
					}else{
						data.userId = this.currentEditRow.userId
						updateUser(data).then(res=>{
							if(res.success == true){
								this.$message({
										message: res.message,
										type: 'success'
								})
								this.drawerDialog = false
								this.userList({deptId:this.selectedTopDeptId})
							}
						})
					}
				}else{
					return false
				}
			});
		},
		handleUserStatus(row){
			let state = row.userStatus == "0" ? "恢复" : "禁用"
			this.$confirm(`确定要（${state}）【${row.userAccount}】用户吗?`, '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
			}).then(() => {
				changeUserStatus({userId:row.userId,userStatus:row.userStatus}).then(res=>{
					if(res.success == true){
						this.$message({
								message: res.message,
								type: 'success'
						})
					}else{
						row.userStatus = row.userStatus == "0" ? "1":"0"
					}
					return
				})
			}).catch(() => {
				row.userStatus = row.userStatus == "0" ? "1":"0"
			});
		}
	},
	watch: {
      	filterText(val) {
        	this.$refs.tree.filter(val);
      	},
		depts(val){
			++this.cascaderKey
			if(this.drawerType == "edit") {
				let nodeLink = getAllParentNodeByChildNode(val,this.currentEditRow.deptId,"deptId")
				let arr = nodeLink.map(e=> e.deptId);
				this.userForm.deptId = arr
			}
		}
		
   }
};
</script>

<style scoped lang="scss">
.basic-container /deep/ .el-card{
    background-color: #f0f2f5 !important;
}
.demo-drawer__footer{
	margin:35px 0;
}

.basic-container /deep/ .el-card__body {
   padding: 0px 6px;
}
.basic-container .filter-input {
	
	margin:0px 10px !important;
	width:95% !important;
}
.basic-container /deep/ .el-input__inner{
	height:35px;
	line-height:35px;
}
.demo-drawer__content {
	padding:0 20px;
}
.handleDrawer .demo-drawer__content /deep/ .el-row {
	margin-left: 0px !important; 
   margin-right: 0px !important;
}
.handleDrawer .demo-drawer__content /deep/ .el-row .el-col{
	margin-bottom: 10px !important;
}
.handleDrawer .demo-drawer__content /deep/ .select-tenant {
	width: 100%;
}

/deep/ .el-drawer__body{
	overflow: auto;
}

.handleDrawer /deep/ .el-drawer__header {
	margin-bottom:20px;
	border-bottom: 1px solid  #e9e9e9;
	padding-bottom:10px;
}
.handleDrawer .user-account /deep/ .el-input.is-disabled .el-input__inner{
	color:#030406;
}
.handleDrawer /deep/ .el-date-editor.el-input{
	width:100%;
}
.grid-content-left{
	max-height:700px;
	overflow: auto;
	padding: 10px;
}
.divider-text {
	text-align:center;
	margin:0px;
}
.el-divider{
	background-color: #e5e9f3;
	width: 25%;
   margin: 8px auto;
}
.divider-text span{
	margin-left:3px !important;
}
.grid-content.grid-content-right{
	padding: 20px 10px;
}
.grid-content{
	border: 1px solid #EBEEF5;
	background-color: #ffffff;
	padding:10px 6px;
	box-sizing: border-box;
	-webkit-box-shadow: 0 3px 11px 0 #d5d5d5;
	box-shadow: 0 3px 11px 0 #d5d5d5;
	border-radius: 4px;
}
.btn-text{
	margin-top:3px;
	margin-left:50px;
}
 /deep/ .el-table__row  .user-status-tag-normal{
	margin-right:20px !important;
}
 /deep/ .el-table__row  .user-status-tag-disable{
	margin-right:8px !important;
}
</style>
