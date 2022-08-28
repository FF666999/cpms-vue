<template>
  <basic-container>
     
    <el-form  :model="quryForm" ref="quryForm" class="demo-form-inline" label-width="80px">
        <el-row :gutter="10">
            <el-col :span="5">
                <el-form-item label="租户名称:">
                    <el-input clearable v-model="quryForm.tenantName" placeholder="租户名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="租户编码:">
                    <el-input clearable v-model="quryForm.tenantCode" placeholder="租户编码"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="3">
                <el-form-item label="账号前缀:">
                    <el-input clearable v-model="quryForm.accountPrefix" placeholder="账号前缀"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="租户状态:">
                    <el-select clearable v-model="quryForm.tenantStatus" placeholder="请选择">
                        <el-option label="启用" value="0"></el-option>
                        <el-option label="禁用" value="1"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="7">
                <el-form-item label="租赁时间:">
                    <el-date-picker
                    v-model="queryDateange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row :gutter="2">
            <el-col :span="6" :offset="10">
                <el-button type="primary" size="small" icon="el-icon-search" @click="queryBtn">查询</el-button>
                <el-button  size="small" icon="el-icon-delete" @click="resetQuryForm('quryForm')">清空</el-button>
            </el-col>
        </el-row>
    </el-form>
    
      <el-row>
            <el-col :span="2" v-has="'sys_tenant_add'">
                <el-button
                    type="primary"
                    @click="formhandle('','add','tenantForm')"
                    size="mini"
                    icon="el-icon-plus">
                    新增
                </el-button>
            </el-col>
            <el-col :span="2" v-has="'sys_tenant_config_per'">
                <el-button
                    plain
                    @click="configurePermission()"
                    size="mini" icon="el-icon-setting">
                    配置权限
                </el-button>
                <el-popover
                    placement="right"
                    title="提示"
                    width="350"
                    popper-class="question-tips-content"
                    trigger="hover"
                    content="配置租户菜单按钮权限，配置数据会添加到租户对应的管理员角色(TENANT_ADMINISTRATOR)下">
                    <span class="question-tips" slot="reference"><i class="el-icon-question"></i></span>
                </el-popover>
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
        prop="tenantName"
        label="租户名称"
        width="230">
        </el-table-column>
        <el-table-column
        prop="tenantCode"
        label="租户编码"
        width="180">
        </el-table-column>
        <el-table-column
        prop="contacts"
        label="联系人"
        width="100">
        </el-table-column>
        <el-table-column
        prop="contactNumber"
        label="联系电话"
        width="140">
        </el-table-column>
         <el-table-column
        prop="accountPrefix"
        label="账号前缀"
        width="80">
        </el-table-column>
        <el-table-column
            prop="tenantStatus"
            label="租户状态"
            width="150">
            <template slot-scope="scope">
                <el-tag :class="scope.row.tenantStatus == 0 ?'user-status-tag-normal':'user-status-tag-disable'" :type="scope.row.tenantStatus == 0 ?'success':'danger' ">{{scope.row.tenantStatus == 0 ? "正常":"已禁用"}}</el-tag>
                <el-switch
                :disabled="scope.row.tenantCode == 'CPMS_HEADQUARTERS'? true :false"
                @change="handleTenantStatus(scope.row)"
                v-model="scope.row.tenantStatus"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value=0
                inactive-value=1
                >
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column
        prop="leaseTimeStart"
        label="租赁开始时间"
        width="180">
        </el-table-column>
        <el-table-column
        prop="leaseTimeEnd"
        label="租赁截止时间"
        width="180">
        </el-table-column>
        <el-table-column
        align="center"
        prop="address"
        :show-overflow-tooltip="true"
        label="租户地址"
        width="200">
        </el-table-column>
         <el-table-column
        align="center"
        prop="tenantDesc"
        label="租户描述"
        :show-overflow-tooltip="true"
        width="200">
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
            <el-button @click="checkInfo(scope.row)" type="text" size="small" v-has="'sys_tenant_view'"><i class="el-icon-view"></i>查看</el-button>
            <el-button @click="formhandle(scope.row,'edit','tenantFormEdit')" type="text" size="small" v-has="'sys_tenant_edit'"><i class="el-icon-edit"></i>编辑</el-button>
            <el-button v-if="!['CPMS_HEADQUARTERS'].includes(scope.row.tenantCode)" v-has="'sys_tenant_delete'"  @click="delhandle(scope.row)"  type="text" size="small"><i class="el-icon-delete"></i>删除</el-button>
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
         <el-dialog
        class="tetee"
        title="新增"
        :visible.sync="dialogVisible"
        width="50%"
        :close-on-click-modal="false"
        >
            <el-form  :model="tenantForm" ref="tenantForm" :rules="rules" label-width="88px">
                <el-row :gutter="20">
                    <el-col :span="11">
                        <el-form-item label="租户名称:" prop="tenantName">
                            <el-input clearable v-model="tenantForm.tenantName" placeholder="请输入租户名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="租户编码:" prop="tenantCode">
                            <el-input clearable v-model="tenantForm.tenantCode" placeholder="请输入租户编码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-row :gutter="20">
                    <el-col :span="11">
                        <el-form-item label="租赁时间:" prop="leaseTimeStart">
                            <el-date-picker
                            default-time="23:59:59"
                            type="datetime" 
                            placeholder="选择开始日期" 
                            v-model="tenantForm.leaseTimeStart"
                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="至" class="end-text" prop="leaseTimeEnd">
                            <el-date-picker 
                            default-time="23:59:59"
                            type="datetime" 
                            placeholder="选择截止日期" 
                            v-model="tenantForm.leaseTimeEnd" 
                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="11">
                        <el-form-item label="联系人:" prop="contacts">
                            <el-input clearable v-model="tenantForm.contacts" placeholder="请输入联系人姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="联系电话:" prop="contactNumber">
                            <el-input  clearable v-model.number="tenantForm.contactNumber" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入联系电话"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="22">
                        <el-form-item label="租户地址:" prop="address">
                            <el-input clearable  v-model="tenantForm.address" placeholder="请输入租户地址"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="11">
                        <el-form-item label="账号前缀:" prop="accountPrefix">
                            <el-input  clearable  v-model="tenantForm.accountPrefix" placeholder="请输入2个字母"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="22">
                        <el-form-item label="租户描述:">
                            <el-input type="textarea" 
                                v-model="tenantForm.tenantDesc"
                                :autosize="{ minRows: 3, maxRows: 6}"
                                placeholder="请输入租户描述"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                 </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </span>
        </el-dialog>

        <el-dialog
        class="tetee"
        title="编辑"
        :visible.sync="editDialogVisible"
        width="50%"
        :close-on-click-modal="false"
        >
            <el-form  :model="tenantFormEdit" ref="tenantFormEdit" :rules="rules" label-width="88px">
                <el-row :gutter="20">
                    <el-col :span="11">
                        <el-form-item label="租户名称:" prop="tenantName">
                            <el-input clearable v-model="tenantFormEdit.tenantName" placeholder="请输入租户名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="租户编码:" prop="tenantCode">
                            <el-input disabled clearable v-model="tenantFormEdit.tenantCode" placeholder="请输入租户编码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-row :gutter="20">
                    <el-col :span="11">
                        <el-form-item label="租赁时间:" prop="leaseTimeStart">
                            <el-date-picker
                            default-time="23:59:59"
                            type="datetime" 
                            placeholder="选择开始日期" 
                            v-model="tenantFormEdit.leaseTimeStart"
                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="至" class="end-text" prop="leaseTimeEnd">
                            <el-date-picker 
                            default-time="23:59:59"
                            type="datetime" 
                            placeholder="选择截止日期" 
                            v-model="tenantFormEdit.leaseTimeEnd" 
                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="11">
                        <el-form-item label="联系人:" prop="contacts">
                            <el-input clearable v-model="tenantFormEdit.contacts" placeholder="请输入联系人姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="联系电话:" prop="contactNumber">
                            <el-input  clearable v-model.number="tenantFormEdit.contactNumber" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入联系电话"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="22">
                        <el-form-item label="租户地址:" prop="address">
                            <el-input clearable  v-model="tenantFormEdit.address" placeholder="请输入租户地址"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="11">
                        <el-form-item label="账号前缀:" prop="accountPrefix">
                            <el-input disabled  v-model="tenantFormEdit.accountPrefix" placeholder="请输入2个字母"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="22">
                        <el-form-item label="租户描述:">
                            <el-input type="textarea" 
                                v-model="tenantFormEdit.tenantDesc"
                                :autosize="{ minRows: 3, maxRows: 6}"
                                placeholder="请输入租户描述"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                 </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </span>
        </el-dialog>

        <el-dialog
        class="tetee"
        title="查看"
        :visible.sync="checkDialogType"
        width="45%"
        >
        <el-row :gutter="2" class="row-text">
            <el-col :span="2" class="col-text">
                租户名称:
            </el-col> 
            <el-col :span="9" >
                {{tenantInfo.tenantName}}
            </el-col> 
             <el-col :span="2" class="col-text">
                租户编码:
            </el-col> 
            <el-col :span="9">
                {{tenantInfo.tenantCode}}
            </el-col> 
        </el-row>
        <el-row :gutter="2" class="row-text">
            <el-col :span="2" class="col-text">
                租赁时间:
            </el-col> 
            <el-col :span="9" >
                {{tenantInfo.leaseTimeStart}} 至 {{tenantInfo.leaseTimeEnd}}
            </el-col> 
        </el-row>
        <el-row :gutter="10" class="row-text">
            <el-col :span="2" class="col-text">
                联系人:
            </el-col> 
            <el-col :span="9" >
                {{tenantInfo.contacts}}
            </el-col> 
             <el-col :span="2" class="col-text">
                联系电话:
            </el-col> 
            <el-col :span="9">
              {{tenantInfo.contactNumber}}
            </el-col> 
        </el-row>
        <el-row :gutter="2" class="row-text">
            <el-col :span="2" class="col-text">
                租户地址:
            </el-col> 
            <el-col :span="9" >
                {{tenantInfo.address}}
            </el-col> 
             <el-col :span="2" class="col-text">
                账号前缀:
            </el-col> 
            <el-col :span="9">
                {{tenantInfo.accountPrefix}}
            </el-col> 
        </el-row>
         <el-row :gutter="2" class="row-text">
            <el-col :span="2" class="col-text">
                租户状态:
            </el-col> 
            <el-col :span="9" >
                {{tenantInfo.tenantStatus == '0' ? '启用': '禁用'}}
            </el-col> 
        </el-row>
        <el-row :gutter="2" class="row-text">
            <el-col :span="2" class="col-text">
                租户描述:
            </el-col> 
             <el-col :span="18" >
                {{tenantInfo.tenantDesc}}
            </el-col> 
        </el-row>
        </el-dialog>

        <el-dialog
            class="tetee menu-dialog"
            title="配置租户权限"
            :visible.sync="configurePermisDialogType"
            width="350px"
            :close-on-click-modal="false"
        >
           <div class="menu-box-shadow">
                <el-row :gutter="10">
                    <el-col :span="23" >
                        <el-input
                        placeholder="输入关键字进行过滤"
                        clearable
                        v-model="filterText" class="filter-input">
                        </el-input>
                    </el-col> 
                </el-row>
                <el-row :gutter="10" class="menu-container">
                    <el-col :span="23" >
                        <el-tree
                            class="filter-tree"
                            show-checkbox
                            highlight-current
                            node-key="menuId"
                            :data="menuTree"
                            :props="props"
                            :filter-node-method="filterNode"
                            :expand-on-click-node="true"
                            ref="menuTree">
                        </el-tree>
                    </el-col> 
                </el-row>
           </div>
           <span slot="footer" class="dialog-footer">
                <el-button @click="configurePermisDialogType = false" size="mini">取消</el-button>
                <el-button type="primary" @click="submitConfigPermis" size="mini">确定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            class="tetee initTenantAccount"
            title="创建成功"
            :visible.sync="createTenantDialogType"
            width="30%"
            :close-on-click-modal="false"
            center>
            <div>
                <el-row :gutter="2">
                    <el-col :span="3" class="col-text">
                        姓名:
                    </el-col> 
                    <el-col :span="9" class="col-text-value">
                        {{initTenantAccount.userName}}
                    </el-col> 
                    <el-col :span="5" class="col-text">
                        租户管理员账号:
                    </el-col> 
                    <el-col :span="6" class="col-text-value">
                       {{initTenantAccount.userAccount}}
                    </el-col> 
                </el-row>
                <el-row :gutter="2">
                    <el-col :span="3" class="col-text">
                        登录密码:
                    </el-col> 
                    <el-col :span="8" class="col-text-value">
                        {{initTenantAccount.userPassword}}
                    </el-col> 
                </el-row>
            </div>
             <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="createTenantDialogType = false">知道了</el-button>
                </span>
        </el-dialog>
  </basic-container>
</template>

<script>
import {listTenant,addTenant,updateTenant,delTenant,configTenantPer,changeTenantStatus} from '@/api/system/tenant'
import {listMenu,selectMenuByTenantId} from '@/api/system/menu'
import { dateFormat } from "@/util/date";
import { isMobile } from "@/util/validate";
export default {
    data() {
        var mobileValid = (rule, value,callback) =>{
			if (!isMobile(value)) {
				callback(new Error("手机号码不合法"));
			}else{
				callback();
			}
		}
        return {
            initTenantAccount:{
                userName:"",
                userAccount:"",
                userPassword:""
            },
            createTenantDialogType:false,
            menuTree:[],
            filterText:'',
            configurePermisDialogType:false,
            queryDateange:'',
            pageSize:10,
            totalNum:0,
            currentPage:1,
            checkDialogType:false,
            dialogVisible:false,
            editDialogVisible:false,
            dialogType:"add",
            disabled:false,
            isLoading:true,
            tableData: [],
            quryForm:{},
            tenantInfo:{},
            tenantFormEdit:{},
            tenantForm:{
                tenantName:'',
                tenantCode:'',
                leaseTimeStart:'',
                leaseTimeEnd:'',
                contacts:'',
                contactNumber:'',
                address:'',
                tenantDesc:'',
                accountPrefix:''
            },
            multipleSelection: [],
            rules:{
                tenantName: [
                    { required: true, message: '请输入租户名称', trigger: 'blur' }
                ],
                tenantCode: [
                    { required: true, message: '请输入租户编码', trigger: 'blur' }
                ],
                leaseTimeStart: [
                    { type: 'date', required: true, message: '请选择开始日期', trigger: 'change' }
                ],
                leaseTimeEnd: [
                    { type: 'date', required: true, message: '请选择截止日期', trigger: 'change' }
                ],
                contacts: [
                    {  required: true, message: '请填写联系人姓名', trigger: 'blur' }
                ],
                contactNumber: [
                    {required: true, message: '请填写联系人电话', trigger: 'blur'},
                    { type: 'number', message: '必须为数字值'},
                    { required: true,validator: mobileValid,  trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请填写租户地址', trigger: 'blur' }
                ],
                accountPrefix:[
                     { required: true, message: '请输入账号前缀', trigger: 'blur' },
                     { min: 2, max: 2, message: '长度至少且最多2个字母', trigger: 'blur' },
                     { pattern: /^[a-zA-Z]+$/, message: '请输入字母', trigger: 'blur' }
                ]
            },
            currentEditRow:{},
            selectedTenantId:null
        }
    },
    props:{
		/* 树形下拉配置项 */
		props:{
			type: Object,
			default:()=>{
                return {
                checkStrictly: true,
                id:"menuId", // 主键字段名
                value:'menuId',       // ID字段名
                label: 'name',     // 显示名称
                children: 'children'  // 子级字段名
                }
			}
		},
	},
    created() {
        this.initData()
    },

    methods: {
        handleTenantStatus(row){
			let state = row.tenantStatus == "0" ? "恢复" : "禁用"
			this.$confirm(`确定要（${state}）【${row.tenantName}】租户吗?`, '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
			}).then(() => {
				changeTenantStatus({tenantId:row.tenantId,tenantStatus:row.tenantStatus}).then(res=>{
					if(res.success == true){
						this.$message({
								message: res.message,
								type: 'success'
						})
					}
					return
				})
			}).catch(() => {
				row.tenantStatus = row.tenantStatus == "0" ? "1":"0"
			});
		},
        getMenuTreeNodes(){
            listMenu({}).then(e=>{
                this.menuTree = e.obj
            })
        },
        async configurePermission(){
            if(this.multipleSelection.length <=0){
				this.$message({
                    message: "请选择租户",
                    type: 'warning'
				})
				return
			}
			if(this.multipleSelection.length > 1){
				this.$message({
                    message: "只能选择一个租户",
                    type: 'warning'
				})
				return
			}
            this.selectedTenantId = this.multipleSelection[0].tenantId
            let allParentId = this.getParentMenuId(this.menuTree)
            let tenantMenuIds = []
            await selectMenuByTenantId(this.selectedTenantId).then(e=>{
                if(e.obj !=null && e.obj.length > 0){
                    tenantMenuIds =  e.obj.map(e=>e.menuId)
                }
            })
            this.configurePermisDialogType = true
            // 差集
            let diffId = tenantMenuIds.filter(function (val) { return allParentId.indexOf(val) == -1 })
            this.$nextTick(()=>{
                this.$refs.menuTree.setCheckedKeys(diffId);
            })
        },
        submitConfigPermis(){
            let selectedNodes = this.$refs.menuTree.getCheckedNodes(false,true)
            if(selectedNodes.length ==0){
                this.$message({
                    message: "请选择权限",
                    type: 'warning'
				})
				return
            }
            
            let menuIds =  selectedNodes.map(e=>e.menuId)
            configTenantPer({menuIds:[...menuIds].join(","),tenantId:this.selectedTenantId}).then(res=>{
                if(res.success == true){
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.configurePermisDialogType = false
                }
            })
        },
        getParentMenuId(all){
            var temp = [];
            var callback = function (list) { 
                for (var i = 0; i < list.length; i++) {
                    var item = list[i];
                    if (item.children.length > 0) {
                        temp.push(item.menuId);
                        callback(item.children);  
                    } 
                }
            };
            callback(all);
            return temp;  //最后返回
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        selectable(row,index){
            if(["CPMS_HEADQUARTERS"].includes(row.tenantCode)) {
                return false
            }else{
                return true
            }
        },
        resetQuryForm(){
           this.quryForm = {}
           this.currentPage = 1
           this.queryDateange = ""
           this.quryForm.pageNo = 1
           this.quryForm.pageSize = this.pageSize
           this.listTenant(this.quryForm)
        },
        queryBtn(){
            this.currentPage = 1
            this.quryForm.pageNo = 1
            this.quryForm.pageSize = this.pageSize
            this.getDateange()
            this.listTenant(this.quryForm)
        },
        getDateange(){
            if(this.queryDateange.length > 0){
                this.quryForm.leaseTimeStart = dateFormat(new Date(this.queryDateange[0])) 
                this.quryForm.leaseTimeEnd =  dateFormat(new Date(this.queryDateange[1])) 
            }else{
                this.quryForm.leaseTimeStart = "" 
                this.quryForm.leaseTimeEnd =  ""
            }
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.currentPage = 1
            this.quryForm.pageNo = this.currentPage
            this.quryForm.pageSize = val
            this.getDateange()
            this.listTenant(this.quryForm)
        },
        handleCurrentChange(val) {
            this.quryForm.pageNo = this.currentPage
            this.quryForm.pageSize =this.pageSize
            this.listTenant(this.quryForm)
        },

        checkInfo(row){
            this.checkDialogType = true
            this.tenantInfo = row
        },
        delhandle(row){
            this.$confirm(`确定要（删除）【${row.tenantName}】租户吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            delTenant({tenantId:row.tenantId}).then(res=>{
                if(res.success == true){
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.initData()
                }
            })
            }).catch(() => {});
        },
        onSubmit(){
            if(this.dialogType == 'add') {
                this.$refs['tenantForm'].validate((valid) => {
                    if (valid) { 
                        // 日期格式转换
                        let data = {}
                        Object.assign(data,this.tenantForm)
                        data.leaseTimeStart = dateFormat(new Date(this.tenantForm.leaseTimeStart))
                        data.leaseTimeEnd = dateFormat(new Date(this.tenantForm.leaseTimeEnd))
                        this.addTenant(data)
                    }else{
                        return false
                    }
                });
            }else{
                this.$refs['tenantFormEdit'].validate((valid) => {
                    if (valid) { 
                        // 日期格式转换
                        let data = {}
                        Object.assign(data,this.tenantFormEdit)
                        data.leaseTimeStart = dateFormat(new Date(this.tenantFormEdit.leaseTimeStart))
                        data.leaseTimeEnd = dateFormat(new Date(this.tenantFormEdit.leaseTimeEnd))
                        this.updateTenant(data)
                    }else{
                        return false
                    }
                });
            }
        },
        formhandle(row,type,tenantForm){
            this.dialogType = type
            if(this.dialogType == "add") {
                this.dialogVisible = true
                this.$nextTick(()=>{
                    this.$refs[tenantForm].resetFields();//清空表单
                })
            }else{
                this.editDialogVisible = true
                this.$nextTick(()=>{
                    this.$refs[tenantForm].clearValidate()
                })
                let data = {}
                this.currentEditRow = row // 记录当前编辑的行
                Object.assign(data,row)
                data.contactNumber = Number(data.contactNumber)
                data.leaseTimeStart=new Date(data.leaseTimeStart)
                data.leaseTimeEnd=new Date(data.leaseTimeEnd)
                this.tenantFormEdit = data
            }
        },
        initData(){
            this.currentPage = 1
            this.getMenuTreeNodes()
            this.listTenant({}) 
        },
        listTenant(quryForm){
            listTenant(quryForm).then(res=>{
                this.tableData = res.obj.list
                this.totalNum = res.obj.total
                this.isLoading =false
            })
        },
        allMenu(data){
            listMenu(data).then(e=>{
                this.tableData = e.obj
                this.isLoading =false
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        addTenant(data){
            addTenant(data).then(res=>{
                if(res.success == true){
                    this.dialogVisible = false
                    this.initTenantAccount.userName = res.obj.userName
                    this.initTenantAccount.userAccount = res.obj.userAccount
                    this.initTenantAccount.userPassword = res.obj.userPassword
                    this.createTenantDialogType = true
                    this.initData()
                }
            })
        },
        updateTenant(data) {
            updateTenant(data).then(res=>{
                if(res.success == true){
                    this.changeRow(data)
                    this.editDialogVisible = false
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                }
            })
        },
        changeRow(data){
            this.currentEditRow.tenantName = data.tenantName
            this.currentEditRow.tenantCode= data.tenantCode
            this.currentEditRow.leaseTimeStart = data.leaseTimeStart
            this.currentEditRow.leaseTimeEnd = data.leaseTimeEnd
            this.currentEditRow.contacts = data.contacts
            this.currentEditRow.contactNumber = data.contactNumber
            this.currentEditRow.address = data.address
            this.currentEditRow.tenantDesc = data.tenantDesc
            this.currentEditRow.accountPrefix = data.accountPrefix
        }
        
    },
    watch: {
      	filterText(val) {
        	this.$refs.menuTree.filter(val);
      	},
    }
};
</script>

<style scoped lang="scss" >

.line{
    text-align: center;
}
.end-text /deep/ .el-form-item__label{
     text-align: center;
}
.el-tooltip__popper{
    max-width:350px !important;
}
.row-text{
    margin-bottom: 10px !important;
}
.page-list {
    margin-top:20px;
}

.filter-input{
    padding:5px;
    height:35PX;
}
.menu-box-shadow{
    border:1px solid #DCDFE6;
    box-shadow: 0 1px 8px 0 #e3dede;
}
.filter-input  /deep/ .el-input__inner{
    height:100%;
}
.menu-dialog /deep/ .el-dialog__body{
    padding: 20px 20px;
}
.menu-container{
	max-height:400px;
	overflow: auto;
}
 /deep/ .el-table__row  .user-status-tag-normal{
	margin-right:20px !important;
}
 /deep/ .el-table__row  .user-status-tag-disable{
	margin-right:8px !important;
}
.initTenantAccount .col-text{
    text-align: right;
    
}
.initTenantAccount .col-text-value{
    padding-left: 10px !important;
}
</style>
