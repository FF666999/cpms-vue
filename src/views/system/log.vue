<template>
  <basic-container>
     <el-form  :model="quryForm" ref="quryForm" class="demo-form-inline" label-width="80px">
        <el-row :gutter="20">
             <el-col :span="5">
                <el-form-item label="日志描述:">
                    <el-input clearable v-model="quryForm.title" placeholder="日志描述"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="请求RUL:">
                    <el-input clearable v-model="quryForm.reqUrl" placeholder="请求RUL"></el-input>
                </el-form-item>
            </el-col>
             <el-col :span="5">
                <el-form-item label="操作人:">
                    <el-input clearable v-model="quryForm.createBy" placeholder="操作人"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="7">
                <el-form-item label="操作时间:">
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
        <el-row>
          <el-col :span="6" :offset="10">
                 <el-button type="primary" size="small" icon="el-icon-search" @click="queryBtn">查询</el-button>
				        <el-button  size="small" icon="el-icon-delete" @click="resetQuryForm('quryForm')">清空</el-button>
            </el-col>
        </el-row>
    </el-form>
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
        prop="title"
        label="日志描述"
        :show-overflow-tooltip="true"
        width="150">
        </el-table-column>
        <el-table-column
        prop="serviceName"
        label="请求服务名称"
        :show-overflow-tooltip="true"
        width="200">
        </el-table-column>
        <el-table-column
        prop="reqUrl"
        label="请求URL"
        :show-overflow-tooltip="true"
        width="300">
        </el-table-column>
         <el-table-column
        prop="reqMethod"
        label="请求方式"
        width="90">
        </el-table-column>
        <el-table-column
        prop="reqParams"
        label="请求参数"
        :show-overflow-tooltip="true"
        width="280">
        </el-table-column>
        <el-table-column
        prop="resultMsg"
        label="响应结果"
        :show-overflow-tooltip="true"
        width="280">
        </el-table-column>
        <el-table-column
        prop="exeTime"
        label="耗时"
        width="90">
        <template slot-scope="scope">
          {{scope.row.exeTime}}ms
        </template>
        </el-table-column>
       <el-table-column
        prop="handleIp"
        label="请求IP"
        width="100">
        </el-table-column>
        <el-table-column
        prop="createTime"
        label="操作时间"
        width="180">
        </el-table-column>
        <el-table-column
        prop="createBy"
        label="操作人"
        width="130">
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

  </basic-container>
</template>
<script>
import {listLog} from '@/api/system/log'
import { dateFormat } from "@/util/date";
export default {
   data() {
        return {
            isLoading:true,
            pageSize:10,
            totalNum:0,
            currentPage:1,
            queryDateange:'',
            quryForm:{
              title:'',
              reqUrl:'',
              createBy:''
            },
            tableData:[],
            multipleSelection:[]
        };
   },
    created() {
        this.initData()
    },
    methods: {
      queryBtn(){
            this.currentPage = 1
            this.quryForm.pageNo = 1
            this.quryForm.pageSize = this.pageSize
            this.getDateange()
            this.listLog(this.quryForm)
        },
        resetQuryForm(form){
            this.quryForm = {}
            this.queryDateange = ""
            this.currentPage = 1
            this.quryForm.pageNo = 1
            this.quryForm.pageSize = this.pageSize
            this.listLog(this.quryForm)
        },
        getDateange(){
            if(this.queryDateange.length > 0){
                this.quryForm.handleStart = dateFormat(new Date(this.queryDateange[0])) 
                this.quryForm.handleEnd =  dateFormat(new Date(this.queryDateange[1])) 
            }else{
                this.quryForm.handleStart = "" 
                this.quryForm.handleEnd =  ""
            }
        },
      handleSizeChange(val) {
            this.pageSize = val
            this.currentPage = 1
            this.quryForm.pageNo = this.currentPage
            this.quryForm.pageSize = val
            this.listLog(this.quryForm)
        },
        handleCurrentChange(val) {
            this.quryForm.pageNo = this.currentPage
            this.quryForm.pageSize =this.pageSize
            this.listLog(this.quryForm)
        },
       handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        initData(){
             this.currentPage = 1
             this.listLog({})
        },
        
        listLog(data){
           listLog(data).then(res=>{
                this.tableData = res.obj.list
                this.totalNum = res.obj.total
                this.isLoading =false
           })
        }
    }
};
</script>
<style scoped lang="scss" >

</style>