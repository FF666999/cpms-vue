<template>
  <basic-container>
    <el-form  :model="quryForm" ref="quryForm" class="demo-form-inline" label-width="80px">
        <el-row :gutter="20">
			 <el-col :span="5">
                <el-form-item label="岗位名称:">
                    <el-input clearable v-model="quryForm.postName" placeholder="部门名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10">
                 <el-button type="primary" size="small" class="el-icon-search-class" icon="el-icon-search" @click="queryBtn">查询</el-button>
				 <el-button  size="small" icon="el-icon-delete" @click="resetQuryForm('quryForm')">清空</el-button>
            </el-col>
        </el-row>
    </el-form>
	<el-row>
            <el-col :span="7">
                <el-button
                    v-has="'sys_post_add'"
                    type="primary"
                    @click="formhandle('','add','postForm')"
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
        row-key="postId"
        v-loading = "isLoading"
        element-loading-text = "加载中，请稍后..."
        element-loading-background = "rgba(255, 255, 255, .5)"
        element-loading-spinner = "el-icon-loading"
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
        prop="postName"
        label="岗位名称"
        width="250">
        </el-table-column>
         <el-table-column
        prop="postCode"
        label="岗位编码"
        width="250">
        </el-table-column>
         <el-table-column
        prop="postSort"
        label="岗位排序"
        width="100">
        </el-table-column>
        <el-table-column
        prop="postDesc"
        label="岗位描述"
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
            <el-button @click="checkInfo(scope.row)" v-has="'sys_post_view'" type="text" size="small"><i class="el-icon-view"></i>查看</el-button>
            <el-button @click="formhandle(scope.row,'edit','postForm')" v-has="'sys_post_edit'"  type="text" size="small"><i class="el-icon-edit"></i>编辑</el-button>
            <el-button @click="delhandle(scope.row)"  type="text" size="small" v-has="'sys_post_delete'" ><i class="el-icon-delete"></i>删除</el-button>
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
            <el-form  :model="postForm" ref="postForm" :rules="rules" label-width="88px">
                <el-row :gutter="20">
                    <el-col :span="10">
                        <el-form-item label="岗位名称:" prop="postName">
                            <el-input clearable v-model="postForm.postName" placeholder="请输入岗位名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="岗位编码:" prop="postCode">
                            <el-input clearable v-model="postForm.postCode" placeholder="请输入岗位编码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="10">
                        <el-form-item label="岗位排序:" prop="postSort">
							<el-input-number v-model="postForm.postSort" controls-position="right"  :min="0" :max="10000"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="22">
                        <el-form-item label="岗位描述:">
                            <el-input type="textarea" 
                                clearable
                                v-model="postForm.postDesc"
                                :autosize="{ minRows: 3, maxRows: 6}"
                                placeholder="请输入岗位描述"
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
                        <el-form-item label="岗位名称:">
                            <span>{{checkDetail.postName}}</span>
                        </el-form-item>
                    </el-col>
                     <el-col :span="10">
                        <el-form-item label="岗位编码:">
                            <span>{{checkDetail.postCode}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-row :gutter="20">
                    <el-col :span="22">
                        <el-form-item label="岗位描述:">
                            <span>{{checkDetail.postDesc}}</span>
                        </el-form-item>
                    </el-col>
                 </el-row>
            </el-form>
        </el-dialog>
  </basic-container>
</template>

<script>
import {listPost,addPost,updatePost,deletePost} from '@/api/system/post'
export default {
   data() {
        return {
            dialogType:"add",
            isLoading:true,
            pageSize:10,
            totalNum:0,
            currentPage:1,
            dialogVisible:false,
            checkDialogType:false,
            checkDetail:{
                postName:'',
                postDesc:"",
                postCode:""
            },
            quryForm:{},
            postForm:{
                postId:'',
                postName:'',
                postDesc:"",
                postCode:"",
                postSort:0
            },
            tableData:[],
            rules:{
                postName: [
                    { required: true, message: '请输入岗位名称', trigger: 'blur' }
                ],
                 postCode: [
                    { required: true, message: '请输入岗位编码', trigger: 'blur' }
                ],
            }
        };
   },
    created() {
        this.initData()
    },
    methods: {
        delhandle(row){
            this.$confirm(`确定要（删除）【${row.postName}】吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            deletePost({postId:row.postId}).then(res=>{
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
            this.checkDetail.postName = row.postName
            this.checkDetail.postDesc = row.postDesc
            this.checkDetail.postCode = row.postCode
        },
        formhandle(row,type,tenantForm){
            this.dialogType = type
            if(this.dialogType == "add") {
                this.dialogVisible = true
                this.$nextTick(()=>{
                    this.$refs[tenantForm].clearValidate();//清空表单
                })
                this.postForm = {
                        postName:'',
                        postDesc:"",
                        postCode:"",
                        postSort:0
                    }
            }else{
                this.dialogVisible = true
                this.$nextTick(()=>{
                    this.$refs[tenantForm].clearValidate()
                })
                this.postForm = row
            }
        },
        onSubmit(){
            this.$refs['postForm'].validate((valid) => {
                if (valid) { 
                   if(this.dialogType == 'add') {
                       addPost(this.postForm).then(res=>{
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
                       updatePost(this.postForm).then(res=>{
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
        queryBtn(){
            this.currentPage = 1
            this.quryForm.pageNo = 1
            this.quryForm.pageSize = this.pageSize
            this.listPost(this.quryForm)
        },
        resetQuryForm(){
           this.quryForm = {}
           this.currentPage = 1
           this.quryForm.pageNo = 1
           this.quryForm.pageSize = this.pageSize
           this.listPost(this.quryForm)
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.currentPage = 1
            this.quryForm.pageNo = this.currentPage
            this.quryForm.pageSize = val
            this.listPost(this.quryForm)
        },
        handleCurrentChange(val) {
            this.quryForm.pageNo = this.currentPage
            this.quryForm.pageSize =this.pageSize
            this.listPost(this.quryForm)
        },
        initData(){
            this.currentPage = 1
            this.listPost({})
        },
        listPost(data){
            listPost(data).then(res=>{
                this.tableData = res.obj.list
                this.totalNum = res.obj.total
                this.isLoading =false
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
    }
};
</script>
<style scoped lang="scss">
/deep/ .el-input-number{
  width: 100%;
}

</style>
