<template>
  <basic-container>
   <el-form  :model="quryForm" ref="quryForm" class="demo-form-inline" label-width="80px">
        <el-row :gutter="20">
			<el-col :span="5">
                <el-form-item label="角色名称:">
                    <el-input clearable v-model="quryForm.roleName" placeholder="角色名称"></el-input>
                </el-form-item>
            </el-col>
			<el-col :span="5">
                <el-form-item label="角色编码:">
                    <el-input clearable v-model="quryForm.roleCode" placeholder="角色名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10">
                 <el-button type="primary" size="small" class="el-icon-search-class" icon="el-icon-search" @click="queryBtn">查询</el-button>
				 <el-button  size="small" icon="el-icon-delete" @click="resetQuryForm('quryForm')">清空</el-button>
            </el-col>
        </el-row>
    </el-form>
	<el-row>
            <el-col :span="2" v-has="'sys_role_add'" >
                <el-button
                    type="primary"
                    @click="formhandle('','add','roleForm')"
                    size="mini"
                    icon="el-icon-plus">
                    新增
                </el-button>
            </el-col>
             <el-col :span="2" v-has="'sys_role_config_per'">
                <el-button
                    plain
                    @click="configurePermission()"
                    size="mini" icon="el-icon-setting">
                    配置权限
                </el-button>
                <el-popover
                    placement="right"
                    title="提示"
                    width="250"
                    popper-class="question-tips-content"
                    trigger="hover"
                    content="配置角色所属的菜单以及操作按钮权限">
                    <span class="question-tips" slot="reference"><i class="el-icon-question"></i></span>
                </el-popover>
            </el-col>
        </el-row>
		<el-table
        :data="tableData"
        ref="multipleTable"
        max-height="550"
        border
        row-key="roleId"
        v-loading = "isLoading"
        element-loading-text = "加载中，请稍后..."
        element-loading-background = "rgba(255, 255, 255, .5)"
        element-loading-spinner = "el-icon-loading"
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
        prop="roleName"
        label="角色名称"
        width="250">
        </el-table-column>
         <el-table-column
        prop="roleCode"
        label="角色编码"
        width="250">
        </el-table-column>
		 <el-table-column
        prop="roleSort"
        label="角色排序"
        disabled
        width="180">
        </el-table-column>
        <el-table-column
        prop="roleDesc"
        label="角色描述"
        :show-overflow-tooltip="true"
        width="280">
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
            <el-button @click="checkInfo(scope.row)" v-has="'sys_role_view'"  type="text" size="small"><i class="el-icon-view"></i>查看</el-button>
            <el-button @click="formhandle(scope.row,'edit','roleForm')" v-has="'sys_role_edit'" type="text" size="small"><i class="el-icon-edit"></i>编辑</el-button>
            <el-button v-if="!['SUPER_ADMINISTRATOR','TENANT_ADMINISTRATOR'].includes(scope.row.roleCode)" v-has="'sys_role_delete'"  @click="delhandle(scope.row)"  type="text" size="small"><i class="el-icon-delete"></i>删除</el-button>
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
        :title="dialogType==='add'?'新增':'编辑'"
        :visible.sync="dialogVisible"
        width="50%"
        :close-on-click-modal="false"
        >
            <el-form  :model="roleForm" ref="roleForm" :rules="rules" label-width="88px">
                <el-row :gutter="20">
                    <el-col :span="10">
                        <el-form-item label="角色名称:" prop="roleName">
                            <el-input clearable v-model="roleForm.roleName" placeholder="请输入角色名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="角色编码:" prop="roleCode">
                            <el-input :disabled="dialogType==='add'? false: true" clearable v-model="roleForm.roleCode" placeholder="请输入角色编码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
				<el-row :gutter="20">
                    <el-col :span="10">
                        <el-form-item label="角色排序:" prop="roleSort">
							<el-input-number v-model="roleForm.roleSort" controls-position="right"  :min="0" :max="10000"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="22">
                        <el-form-item label="角色描述:">
                            <el-input type="textarea" 
                                clearable
                                v-model="roleForm.roleDesc"
                                :autosize="{ minRows: 3, maxRows: 6}"
                                placeholder="请输入角色描述"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                 </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false"  >取消</el-button>
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </span>
        </el-dialog>

		<el-dialog
        class="tetee"
        title="查看"
        :visible.sync="checkDialogType"
        width="50%"
        >
            <el-form  label-width="88px">
                <el-row :gutter="20">
                    <el-col :span="10">
                        <el-form-item label="角色名称:">
                            <span>{{checkDetail.roleName}}</span>
                        </el-form-item>
                    </el-col>
                     <el-col :span="10">
                        <el-form-item label="角色编码:">
                            <span>{{checkDetail.roleCode}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="10">
                        <el-form-item label="角色排序:">
                            <span>{{checkDetail.roleSort}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="22">
                        <el-form-item label="角色描述:">
                            <span>{{checkDetail.roleDesc}}</span>
                        </el-form-item>
                    </el-col>
                 </el-row>
            </el-form>
        </el-dialog>

        <el-dialog
            class="tetee menu-dialog"
            title="配置角色权限"
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
  </basic-container>
</template>

<script>
import {listRole,addRole,updateRole,deleteRole,configRolePer} from '@/api/system/role'
import {tenantOwnedMenus} from '@/api/system/menu'
export default {
  	data() {
		return {
            filterText:'',
            configurePermisDialogType:false,
			dialogType:"add",
			isLoading:true,
			pageSize:10,
			totalNum:0,
			currentPage:1,
			dialogVisible:false,
			checkDialogType:false,
            multipleSelection:[],
			checkDetail:{
				roleName:'',
				roleDesc:"",
				roleCode:"",
				roleSort:null
			},
            menuTree:[],
			quryForm:{},
			roleForm:{
				roleId:'',
				roleName:'',
				roleDesc:"",
				roleCode:"",
				roleSort:0
			},
			tableData:[],
			rules:{
				roleName: [
					{ required: true, message: '请输入岗位名称', trigger: 'blur' }
				],
				roleCode: [
					{ required: true, message: '请输入岗位编码', trigger: 'blur' }
				]
			},
            selectedRoleId:null,
            checkTreeStatus:[]
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
        selectable(row,index){
            if(["SUPER_ADMINISTRATOR","TENANT_ADMINISTRATOR"].includes(row.roleCode)) {
                return false
            }else{
                return true
            }
        },
        getMenuTreeNodes(){
            tenantOwnedMenus().then(e=>{
                this.menuTree = e.obj
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
            configRolePer({menuIds:[...menuIds].join(","),roleId:this.selectedRoleId}).then(res=>{
                if(res.success == true){
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.configurePermisDialogType = false
                    this.initData()
                }
            })
        },
        
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        configurePermission(){
            if(this.multipleSelection.length <=0){
				this.$message({
                    message: "请选择角色",
                    type: 'warning'
				})
				return
			}
			if(this.multipleSelection.length > 1){
				this.$message({
                    message: "只能选择一个角色",
                    type: 'warning'
				})
				return
			}
           
            this.selectedRoleId = this.multipleSelection[0].roleId
            
            let allParentId = this.getParentMenuId(this.menuTree)
            
            let allMenuId = this.multipleSelection[0].menuIds !=null ? this.multipleSelection[0].menuIds.split(",") : []
            this.configurePermisDialogType = true
            // 差集
            let diffId = allMenuId.filter(function (val) { return allParentId.indexOf(val) == -1 })
             this.$nextTick(()=>{
                this.$refs.menuTree.setCheckedKeys(diffId);
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

		checkInfo(row){
            this.checkDialogType = true
            this.checkDetail.roleName = row.roleName
            this.checkDetail.roleDesc = row.roleDesc
            this.checkDetail.roleCode = row.roleCode
			this.checkDetail.roleSort = row.roleSort
        },
		delhandle(row){
            this.$confirm(`确定要（删除）【${row.roleName}】吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            deleteRole({roleId:row.roleId}).then(res=>{
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
			this.$refs['roleForm'].validate((valid) => {
                if (valid) { 
                   if(this.dialogType == 'add') {
                       addRole(this.roleForm).then(res=>{
                            if(res.success == true){
                                this.dialogVisible = false
                                this.$message({
                                    message: res.message,
                                    type: 'success'
                                })
                                this.initData()
                            }
                       })
                   }else{
                       updateRole(this.roleForm).then(res=>{
                            if(res.success == true){
                                this.dialogVisible = false
                                this.$message({
                                    message: res.message,
                                    type: 'success'
                                })
                            }
                       })
                   }
                      
                }
            })
		},
		formhandle(row,type,tenantForm){
            this.dialogType = type
            if(this.dialogType == "add") {
                this.dialogVisible = true
                this.$nextTick(()=>{
                    this.$refs[tenantForm].clearValidate();//清空表单
                })
                this.roleForm = {
					roleId:'',
					roleName:'',
					roleDesc:"",
					roleCode:"",
					roleSort:0
				}
            }else{
                this.dialogVisible = true
                this.$nextTick(()=>{
                    this.$refs[tenantForm].clearValidate()
                })
                this.roleForm = row
            }
        },
		 handleSizeChange(val) {
            this.pageSize = val
            this.currentPage = 1
            this.quryForm.pageNo = this.currentPage
            this.quryForm.pageSize = val
            this.listRole(this.quryForm)
        },
        handleCurrentChange(val) {
            this.quryForm.pageNo = this.currentPage
            this.quryForm.pageSize =this.pageSize
            this.listRole(this.quryForm)
        },
		queryBtn(){
            this.currentPage = 1
            this.quryForm.pageNo = 1
            this.quryForm.pageSize = this.pageSize
            this.listRole(this.quryForm)
        },
		resetQuryForm(){
           this.quryForm = {}
		   this.currentPage = 1
           this.quryForm.pageNo = 1
           this.quryForm.pageSize = this.pageSize
           this.listRole(this.quryForm)
        },
		initData(){
			this.currentPage = 1
            this.getMenuTreeNodes()
			this.listRole({})
		},
		listRole(data){
			listRole(data).then(res=>{
				this.tableData = res.obj.list
                this.totalNum = res.obj.total
                this.isLoading =false
			})
		},
		handleSelectionChange(val) {
            this.multipleSelection = val;
        },
	},
    watch: {
      	filterText(val) {
        	this.$refs.menuTree.filter(val);
      	},
    }
};
</script>
<style scoped lang="scss">
/deep/ .el-input-number{
  width: 100%;
}

.menu-container{
	max-height:400px;
	overflow: auto;
}
.filter-input{
    padding:5px;
    height:35PX;
}
.filter-input  /deep/ .el-input__inner{
    height:100%;
}
.menu-box-shadow{
    border:1px solid #DCDFE6;
    box-shadow: 0 1px 8px 0 #e3dede;
}

.menu-dialog /deep/ .el-dialog__body{
    padding: 20px 20px;
}

</style>