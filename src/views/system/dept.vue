<template>
    <basic-container>
        <el-form  :model="quryForm" ref="quryForm" class="demo-form-inline" label-width="80px">
            <el-row :gutter="20">
                <el-col :span="5">
                    <el-form-item label="部门名称:">
                        <el-input clearable v-model="quryForm.deptName" placeholder="部门名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-button type="primary" size="small" class="el-icon-search-class" icon="el-icon-search" @click="queryBtn">查询</el-button>
                    <el-button  size="small" icon="el-icon-delete" @click="resetQuryForm('quryForm')">清空</el-button>
                </el-col>
            </el-row>
        </el-form>
	    <el-row>
            <el-col :span="2" v-has="'sys_dept_add'">
                <el-button
                    type="primary"
                    @click="formhandle('','add','addForm')"
                    size="mini"
                    icon="el-icon-plus">
                    新增
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
        prop="deptName"
        label="部门名称"
        width="250">
        </el-table-column>
		<el-table-column
        prop="superiorDept"
        label="上级组织架构"
        :show-overflow-tooltip="true"
        width="300">
        </el-table-column>
        <el-table-column
        prop="deptSort"
        label="部门排序"
        width="100">
        </el-table-column>
        <el-table-column
        prop="deptDesc"
        label="部门描述"
        :show-overflow-tooltip="true"
        width="250">
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
            <el-button @click="checkInfo(scope.row)"  type="text" size="small" v-has="'sys_dept_view'"><i class="el-icon-view"></i>查看</el-button>
            <el-button @click="formhandle(scope.row,'edit','editForm')" type="text" size="small" v-has="'sys_dept_edit'"><i class="el-icon-edit"></i>编辑</el-button>
            <el-button @click="delhandle(scope.row)"  type="text" size="small" v-has="'sys_dept_delete'" v-if="scope.row.parentId !='0'"><i class="el-icon-delete"></i>删除</el-button>
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
            <el-form  :model="deptForm" ref="deptForm" :rules="rules" label-width="88px">
				 <el-row :gutter="20">
                    <el-col :span="22">
                        <el-form-item label="所属部门:" prop="parentId">
                            <el-cascader
                            class="select-tenant"
                            placeholder="请选择所属部门"
                            :options="deptTree"
                            :props="props"
                            v-model="deptForm.parentId"
                            :disabled="disabledSelect"
                            clearable
                            filterable>
                            </el-cascader>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="11">
                        <el-form-item label="部门名称:" prop="deptName">
                            <el-input clearable  v-model="deptForm.deptName" placeholder="请输入部门名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="岗位排序:">
							<el-input-number v-model="deptForm.deptSort" controls-position="right"  :min="0" :max="10000"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                    <el-row :gutter="20">
                    <el-col :span="22">
                        <el-form-item label="部门描述:">
                            <el-input type="textarea" 
                                v-model="deptForm.deptDesc"
                                :autosize="{ minRows: 3, maxRows: 6}"
                                placeholder="请输入部门描述"
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
            <el-form  label-width="105px">
                 <el-row :gutter="20">
                    <el-col :span="24" >
                        <el-form-item label="上级组织架构:">
                            <span>{{checkDetail.orgLink}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="10">
                        <el-form-item label="部门名称:">
                            <span>{{checkDetail.deptName}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="22">
                        <el-form-item label="部门描述:">
                            <span>{{checkDetail.deptDesc}}</span>
                        </el-form-item>
                    </el-col>
                 </el-row>
            </el-form>
        </el-dialog>
  </basic-container>
</template>

<script>
import {listDept,tenantDeptTree,addDept,updateDept,delDept} from '@/api/system/dept'
import {getAllParentNodeByChildNode} from '@/util/util'

export default {
	data() {
		return {
            disabledSelect:false,
            checkDialogType:false,
			dialogType:"add",
            dialogVisible:false,
			isLoading:true,
			pageSize:10,
            totalNum:0,
            currentPage:1,
			quryForm: {
				deptName:'',
			},
            checkDetail:{
                orgLink:"",
                deptName:'',
                deptDesc:""
            },
			tableData: [],
			deptTree:[],
			deptForm:{
                deptId:"",
				parentId:[],
				deptName:'',
                deptDesc:"",
                deptSort:0
			},
            rules:{
                deptName: [
                    { required: true, message: '请输入部门名称', trigger: 'blur' }
                ],
                parentId: [
                    { required: true, message: '请选择上级部门', trigger: 'change' }
                ],
            },
            currentNode:"3"
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
                children: 'children',  // 子级字段名
                disabled:'disabled'
                }
            }
        },
    },
    created() {
        this.initData()
    },
	methods:{
       
        delhandle(row){
            this.$confirm(`确定要（删除）【${row.deptName}】吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                delDept({deptId:row.deptId}).then(res=>{
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
        checkInfo(row){
            this.checkDialogType = true
            this.checkDetail.deptName = row.deptName
            this.checkDetail.deptDesc = row.deptDesc
            if(row.parentId !=0){
                let temp = getAllParentNodeByChildNode(this.deptTree,row.parentId+"","deptId")
                this.checkDetail.orgLink = this.buildOrgLink(temp) 
            }else{
               this.checkDetail.orgLink =  ''
            }
        },

        clearDeptTree(){
            this.deptForm.parentId = []
        },
        
        buildOrgLink (arr){
            return arr.map(e=> e.deptName).join(">");
        },
		async tenantDeptTree(){
			await tenantDeptTree().then(res=>{
				this.deptTree = res.obj
			})
		},
		onSubmit(){
            this.$refs['deptForm'].validate((valid) => {
                if (valid) { 
                    let data = {}
                    data.deptId   = this.deptForm.deptId
				    data.parentId = this.deptForm.parentId[this.deptForm.parentId.length - 1]
				    data.deptName = this.deptForm.deptName
                    data.deptDesc = this.deptForm.deptDesc
                    data.deptSort = this.deptForm.deptSort
                   if(this.dialogType == 'add') {
                        addDept(data).then(res=>{
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
                        if(data.deptId == data.parentId) {
                            this.$message({
                                message: "不能选自己作为父节点",
                                type: 'warning'
                            })
                            return
                        }
                       updateDept(data).then(res=>{
                            if(res.success == true){
                                this.dialogVisible = false
                                this.$message({
                                    message: res.message,
                                    type: 'success'
                                })
                                this.initData()
                            }
                        })
                   }
                }else{
                    return false
                }
            });
		},
	
		resetQuryForm(){
           this.quryForm = {}
           this.currentPage = 1
           this.quryForm.pageNo = 1
           this.quryForm.pageSize = this.pageSize
           this.listDept(this.quryForm)
        },
		handleSizeChange(val) {
            this.pageSize = val
            this.currentPage = 1
            this.quryForm.pageNo = this.currentPage
            this.quryForm.pageSize = val
            this.listDept(this.quryForm)
        },
        handleCurrentChange(val) {
            this.quryForm.pageNo = this.currentPage
            this.quryForm.pageSize =this.pageSize
            this.listDept(this.quryForm)
        },
		queryBtn(){
            this.currentPage = 1
            this.quryForm.pageNo = 1
            this.quryForm.pageSize = this.pageSize
			this.listDept(this.quryForm)
		},
    
		formhandle(row,type,form){
			this.dialogVisible = true
            this.dialogType = type
            this.disabledSelect = false
            this.$nextTick(()=>{
                this.$refs["deptForm"].clearValidate();//清空表单
            })
            if(this.dialogType == 'add'){
                this.clearDeptTree()
                this.deptForm.deptId = ''
                this.deptForm.deptName = ''
                this.deptForm.deptDesc = ''
                this.deptForm.deptSort = 0
            }else{
                this.deptForm.deptId   = row.deptId
                this.deptForm.deptName = row.deptName
                this.deptForm.deptDesc = row.deptDesc
                this.deptForm.deptSort = row.deptSort
                if(row.parentId != 0) {
                    let arrTree = getAllParentNodeByChildNode(this.deptTree,row.parentId+"","deptId")
                    let arr = arrTree.map(e=> e.deptId);
                    this.deptForm.parentId = arr
                }else{
                    this.disabledSelect = true
                    this.deptForm.parentId = ["0"]
                }
            }
		},
		async initData(){
            this.currentPage = 1
            await this.tenantDeptTree()
            await this.listDept({})
		},
		async listDept(data){
			await listDept(data).then(res=>{
				this.tableData = res.obj.list
                this.totalNum = res.obj.total
                this.isLoading =false
                for (const item of this.tableData) {
                    let temp = getAllParentNodeByChildNode(this.deptTree,item.parentId+"","deptId")
                    item.superiorDept = this.buildOrgLink(temp) 
                }
			})
            
            
		},
		handleSelectionChange(val) {
            this.multipleSelection = val;
        },

	}
};
</script>
<style lang="scss"  scoped>

.line{
    text-align: center;
}
.end-text .el-form-item__label{
     text-align: center;
}

.row-text{
    margin-bottom: 10px !important;
}

#tenant-select .el-select{
	width: 100%;
}
.keyword-input{
	padding: 5px 2px;
	height:35px;
	width:94%;
}
.keyword-input input{
	height:100%;
	width:100%;
}
.dept-link .el-col{
	margin-top:-15px;
    margin-bottom:-15px;
}
/deep/ .el-input-number{
  width: 100%;
}
/deep/ .select-tenant {
	width: 100%;
}
</style>
