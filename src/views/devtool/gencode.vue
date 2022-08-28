<template>
  <basic-container>
    <el-form  :model="quryForm" ref="quryForm" class="demo-form-inline" label-width="80px">
        <el-row :gutter="20">
			 <el-col :span="5">
                <el-form-item label="工程名称:">
                    <el-input clearable v-model="quryForm.projectName" placeholder="输入工程名称..."></el-input>
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
                    v-has="'gencode_project_add'"
                    type="primary"
                    @click="formhandle('','add','projectForm')"
                    size="mini"
                    icon="el-icon-plus">
                    创建工程
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
        prop="projectName"
        label="工程编码"
        width="180">
        </el-table-column>
         <el-table-column
        prop="projectDesc"
        label="工程描述"
        :show-overflow-tooltip="true"
        width="200">
        </el-table-column>
        <el-table-column
        prop="projectPort"
        label="端口号"
        width="80">
        </el-table-column>
        <el-table-column
        prop="groupId"
        label="groupId"
        width="180">
        </el-table-column>
        <el-table-column
        prop="artifactId"
        label="artifactId"
        width="180">
        </el-table-column>
         <el-table-column
        prop="packageName"
        label="基础包名"
        width="230">
        </el-table-column>
         <el-table-column
        prop="fileEncoding"
        label="文件编码"
        width="100">
        </el-table-column>
        <el-table-column
        prop="jdkVersion"
        label="JDK版本"
        width="60">
        </el-table-column>
         <el-table-column
        prop="contextPath"
        label="context-path"
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
        width="280">
        <template slot-scope="scope">
            <el-button @click="checkInfo(scope.row)" v-has="'gencode_project_view'" type="text" size="small"><i class="el-icon-view"></i>查看</el-button>
            <el-button @click="formhandle(scope.row,'edit','projectForm')" v-has="'gencode_project_edit'"  type="text" size="small"><i class="el-icon-edit"></i>编辑</el-button>
            <el-button @click="delhandle(scope.row)"  type="text" size="small" v-has="'gencode_project_delete'" ><i class="el-icon-delete"></i>删除</el-button>
            <el-button @click="genScaffold(scope.row)"  type="text" size="small" ><i class="el-icon-s-tools"></i>生成脚手架</el-button>
            <el-button @click="handleTable(scope.row)"  type="text" size="small"><i class="el-icon-help"></i>生成单表代码</el-button>
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
        title="查看"
        :visible.sync="checkDialogType"
        width="45%"
        >   
            <p class="text-center">基础信息</p>
            <el-row :gutter="20">
                <el-col :span="3"  class="col-text">
                    <span>工程名称:</span>
                </el-col>
                <el-col :span="8">
                    <span>{{checkDetail.projectName}}</span>
                </el-col>

                    <el-col :span="3" class="col-text">
                    <span>基础包名:</span>
                </el-col>
                <el-col :span="8">
                    <span>{{checkDetail.packageName}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3"  class="col-text">
                    <span>端口号:</span>
                </el-col>
                <el-col :span="8">
                    <span>{{checkDetail.projectPort}}</span>
                </el-col>

                    <el-col :span="3" class="col-text">
                    <span>contextPath:</span>
                </el-col>
                <el-col :span="8">
                    <span>{{checkDetail.contextPath}}</span>
                </el-col>
            </el-row>
             <el-row :gutter="20">
                <el-col :span="3"  class="col-text">
                    <span>groupId:</span>
                </el-col>
                <el-col :span="8">
                    <span>{{checkDetail.groupId}}</span>
                </el-col>

                    <el-col :span="3" class="col-text">
                    <span>artifactId:</span>
                </el-col>
                <el-col :span="8">
                    <span>{{checkDetail.artifactId}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3"  class="col-text">
                    <span>JDK版本:</span>
                </el-col>
                <el-col :span="8">
                    <span>{{checkDetail.jdkVersion}}</span>
                </el-col>
                    <el-col :span="3" class="col-text">
                    <span>文件编码:</span>
                </el-col>
                <el-col :span="8">
                    <span>{{checkDetail.fileEncoding}}</span>
                </el-col>
            </el-row>
            <p class="text-center">数据源信息</p>
            <el-row :gutter="20" v-for="(item,index) in checkDetail.dbDto">
                <el-col :span="3"  class="col-text">
                    <span>IP/端口:</span>
                </el-col>
                <el-col :span="5">
                    <span>{{item.dbIp}}:{{item.dbPort}}</span>
                </el-col>
                    <el-col :span="3" class="col-text">
                    <span>驱动类型:</span>
                </el-col>
                <el-col :span="2">
                    <span>{{getDbDriverType(item.dbDriverClass)}}</span>
                </el-col>
                </el-col>
                    <el-col :span="2" class="col-text">
                    <span>库名:</span>
                </el-col>
                <el-col :span="4">
                    <span>{{item.dbName}}</span>
                </el-col>
                </el-col>
                    <el-col :span="3" class="col-text">
                    <span>是否主库:</span>
                </el-col>
                <el-col :span="2">
                    <span>{{item.dbPrimary == 1?"是":"否"}}</span>
                </el-col>
            </el-row>
        </el-dialog>

        <el-drawer
            class="handleDrawer"
            :title="drawerType==='add'?'创建工程':'编辑工程'"
            :visible.sync="drawerDialog"
            direction="rtl"
            :wrapperClosable="false"
            :show-close="false"
            size="45%"
            custom-class="demo-drawer"
            ref="drawer"
            >
            <div class="demo-drawer__content">
                <el-form :model="projectForm" ref="projectForm"  :rules="projectFormRules">
                    <p class="divider-text"><i class="el-icon-s-order"></i><span>基础信息</span></p>
                    <el-divider></el-divider>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="工程编码：" label-width="98px" prop="projectName">
                                <el-input clearable v-model="projectForm.projectName" oninput="value=value.replace(/[^\_\-\a-\z\A-\Z]/g,'
                                ')" placeholder="请填写工程编码,如：cpms-demo" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                        <el-form-item label="端口号：" label-width="110px" prop="projectPort">
                            <el-input clearable  v-model.number="projectForm.projectPort" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请填写端口号,如：8080" ></el-input>
                        </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="groupId：" label-width="98px" prop="groupId">
                                <el-input clearable v-model="projectForm.groupId" placeholder="请填写groupId" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                        <el-form-item label="artifactId：" label-width="110px" prop="artifactId">
                            <el-input clearable  v-model="projectForm.artifactId" placeholder="请填写artifactId" ></el-input>
                        </el-form-item>
                        </el-col>
                    </el-row>
                     <el-row>
                        <el-col :span="11">
                            <el-form-item label="JDK版本：" label-width="98px" prop="jdkVersion">
								<el-select v-model="projectForm.jdkVersion" class="select-tenant" placeholder="请选择JDK版本">
                                    <el-option label="1.8" value="1.8"></el-option>
                                    <el-option label="11" value="11"></el-option>
                                </el-select>
							</el-form-item>
                        </el-col>
                        <el-col :span="11">
                        <el-form-item label="fileEncoding：" label-width="110px" prop="fileEncoding">
                            <el-input disabled  v-model="projectForm.fileEncoding" placeholder="请填写fileEncoding" ></el-input>
                        </el-form-item>
                        </el-col>
                    </el-row>
                     <el-row>
                         <el-col :span="11">
                            <el-form-item label="基础包名：" label-width="100px" prop="packageName">
                                <el-input clearable v-model="projectForm.packageName" placeholder="如：com.cpms" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="contextPath：" label-width="110px">
                                <el-input clearable v-model="projectForm.contextPath" placeholder="URL前缀... 如：/api" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="工程描述：" label-width="100px">
                                <el-input
                                    type="textarea"
                                    clearable
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="请输入工程描述"
                                    v-model="projectForm.projectDesc">
                                    </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    

                    <p class="divider-text"><i class="el-icon-coin"></i><span>数据源信息</span></p>
    				<el-divider></el-divider>
                    <div class="database-item" v-for="(item,index) in projectForm.dbDto" key="index">
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="驱动类型：" 
                                label-width="98px" 
                                prop="dbDriverClass"
                                :prop="'dbDto.' + index + '.dbDriverClass'"
                                :rules="{required: true, message: '请选择驱动类型', trigger: 'blur'}"
                                >
                                    <el-select v-model="item.dbDriverClass" class="select-tenant" placeholder="请选择驱动类型">
                                        <el-option label="mysql" value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="9">
                                <el-form-item label="是否主库：" 
                                label-width="207px" 
                                :prop="'dbDto.' + index + '.dbPrimary'"
                                :rules="{required: true, message: '请选择是否主库', trigger: 'blur'}"
                                >
                                    <el-select v-model="item.dbPrimary" class="select-tenant" placeholder="请选择">
                                        <el-option label="是" value="1"></el-option>
                                        <el-option label="否" value="0"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" class="text-center">
                                <el-button type="warning" plain  size="mini" @click="testDb(index)">测试链接</el-button>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9">
                                <el-form-item label="数据源IP：" 
                                label-width="98px"
                                :prop="'dbDto.' + index + '.dbIp'"
                                :rules="{required: true, message: '请填写IP地址', trigger: 'blur'}"
                                >
                                    <el-input clearable v-model="item.dbIp" placeholder="数据源IP地址" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                            <el-form-item label="端口：" 
                            label-width="98px"
                            :prop="'dbDto.' + index + '.dbPort'"
                            :rules="{required: true, message: '请填写端口号', trigger: 'blur'}"
                            >
                                <el-input clearable   v-model.number="item.dbPort" oninput="value=value.replace(/[^\d]/g,'')" placeholder="端口号" ></el-input>
                            </el-form-item>
                            </el-col>
                              <el-col :span="7">
                                  <el-form-item label="数据库名：" 
                                  label-width="98px" 
                                  :prop="'dbDto.' + index + '.dbName'"
                                  :rules="{required: true, message: '请填写库名', trigger: 'blur'}"
                                  >
                                    <el-input clearable v-model="item.dbName" placeholder="填写库名" ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9">
                                <el-form-item label="账号：" 
                                label-width="98px" 
                                :prop="'dbDto.' + index + '.dbUser'"
                                :rules="{required: true, message: '请填写账号', trigger: 'blur'}"
                                >
                                    <el-input clearable v-model="item.dbUser" placeholder="数据源账号" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="密码：" 
                                label-width="98px" 
                                :prop="'dbDto.' + index + '.dbPassword'"
                                :rules="{required: true, message: '请填写密码', trigger: 'blur'}"
                                >
                                    <el-input clearable  v-model="item.dbPassword" placeholder="数据源密码"  show-password></el-input>
                                </el-form-item>
                            </el-col>
                            
                            <el-col :span="5" class="text-center" v-if="projectForm.dbDto.length - 1 == index  && projectForm.dbDto.length > 1">
                                <el-button @click="delDataSource(index)" type="primary" size="mini" icon="el-icon-minus" circle style="margin-top:6px;"></el-button>
                                <el-button @click="addDataSource()" type="primary" size="mini" icon="el-icon-plus" circle style="margin-top:6px;"></el-button>
                            </el-col>
                            <el-col :span="5" class="text-center" v-else-if="projectForm.dbDto.length == 1">
                                <el-button @click="addDataSource()" type="primary" size="mini" icon="el-icon-plus" circle style="margin-top:6px;"></el-button>
                            </el-col>
                            <el-col :span="5" class="text-center" v-else>
                                <el-button @click="delDataSource(index)" type="primary" size="mini" icon="el-icon-minus" circle style="margin-top:6px;"></el-button>
                            </el-col>
                        </el-row>
                        <el-divider></el-divider>
                    </div>

                </el-form>
                <div class="demo-drawer__footer" style="text-align:center">
                    <el-button @click="closeDrawer">关 闭</el-button>
                    <el-button type="primary" @click="onSubmit">确 定</el-button>
                </div>
            </div>
        </el-drawer>

        <el-dialog
        class="tetee"
        title="生成单表代码"
        :visible.sync="genSingleTableCodeVisible"
        width="50%"
        :close-on-click-modal="false"
        >
            <el-form  :model="projectDbInfoForm" ref="projectDbInfo" :rules="projectDbInfoFormRules" label-width="88px">
                <el-row :gutter="5">
                    <el-col :span="8">
                         <el-form-item label="数据源名称:" label-width="98px" prop="dbName">
								<el-select v-model="projectDbInfoForm.dbInfo"  class="select-tenant" @change="selectdb" placeholder="请选择数据源">
                                    <el-option v-for="(item,index) in dbDtoList " :key="index" :label="item.dbName" :value="item"></el-option>
                                </el-select>
							</el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="数据表名称:" label-width="110px"  prop="tableName">
                            <el-input  clearable v-model="projectDbInfoForm.tableName" @input="filterTable" placeholder="请输入表名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-table
                        :data="dbTableData"
                        ref="multipleDbTable"
                        max-height="450"
                        border
                        row-key="index"
                        v-loading = "isLoading"
                        element-loading-text = "加载中，请稍后..."
                        element-loading-background = "rgba(255, 255, 255, .5)"
                        element-loading-spinner = "el-icon-loading"
                        @selection-change="handleSelectionTable"
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
                            prop="tableName"
                            :show-overflow-tooltip="true"
                            label="表名称"
                            width="280">
                            </el-table-column>
                            <el-table-column
                            prop="tableComment"
                            :show-overflow-tooltip="true"
                            label="表描述"
                            width="210">
                            </el-table-column>
                            <el-table-column
                            align="center"
                            fixed="right"
                            label="操作"
                            width="280">
                            <template slot-scope="scope">
                                <el-button @click="syncField(scope.row)" v-if="scope.row.syncStatus == 1"  type="text" size="small"><i class="el-icon-refresh"></i>同步字段</el-button>
                            </template>
                            </el-table-column>
                    </el-table>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="genSingleTableCodeVisible = false">关闭</el-button>
                <el-button type="primary" @click="genTableCode">下载代码</el-button>
            </span>
        </el-dialog>

  </basic-container>
</template>

<script>
import {listProject,delProject,addProject,updateProject,testDb,genScaffold,dbTables,genFun,syncField} from '@/api/devtool/gencode'
export default {
   data(){
        return {
            genSingleTableCodeVisible:false,
            drawerType:"add",
            isLoading:true,
            pageSize:10,
            totalNum:0,
            tableData:[],
            dbTableData:[],
            currentPage:1,
            drawerDialog:false,
            checkDialogType:false,
            checkDetail:{},
            quryForm:{},
            dbDtoList:[],
            projectDbInfoForm:{},
            projectForm:{},
            tableData:[],
            projectFormRules:{
                projectName: [
                    { required: true, message: '请填写工程名称', trigger: 'blur' }
                ],
                projectPort: [
                    { required: true, message: '请填写端口号', trigger: 'blur' }
                ],
                groupId: [
                    { required: true, message: '请填写groupId', trigger: 'blur' }
                ],
                artifactId: [
                    { required: true, message: '请填写artifactId', trigger: 'blur' }
                ],
                fileEncoding: [
                    { required: true, message: '请填写fileEncoding', trigger: 'blur' }
                ],
                jdkVersion: [
                    { required: true, message: '请填写JDK版本', trigger: 'blur' }
                ],
                packageName: [
                    { required: true, message: '请填写基础包名', trigger: 'blur' }
                ]
            },
            projectDbInfoFormRules:{},
            multipleSelectionTable:[],
            multipleSelection:[],
            cloneDbTableData:[]
        };
   },
    created() {
        this.initData()
    },
    methods: {
        filterTable(tableName){
            if(this.cloneDbTableData.length > 0 && tableName.length > 0){
               this.dbTableData =  this.cloneDbTableData.filter(item=> item.tableName.includes(tableName))
            }else{
                this.dbTableData = JSON.parse(JSON.stringify(this.cloneDbTableData))
            }
        },
        genTableCode(){
            let data = {}
            if(!this.projectDbInfoForm.dbInfo) {
                this.$message({
                    message: "请选择数据源",
                    type: 'warning'
                })
                return
            }
            data.dbId= this.projectDbInfoForm.dbInfo.dbId
            data.projectId = this.projectDbInfoForm.projectId
            data.dbName = this.projectDbInfoForm.dbInfo.dbName
            data.tableList = this.multipleSelectionTable
            if(data.tableList.length <=0){
                this.$message({
                    message: "请选择表",
                    type: 'warning'
                })
                return
            }
            genFun(data).then(res=>{

            })

        },
        syncField(row){
            let data = {}
            data.dbId= this.projectDbInfoForm.dbInfo.dbId
            data.dbName = this.projectDbInfoForm.dbInfo.dbName
            data.tableName = row.tableName
            data.tableId = row.tableId
            syncField(data).then(res=>{
                if(res.success == true){
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                }
           })
        },
        selectdb(dbInfo){
            dbTables(dbInfo.dbId).then(res=>{
                if(res.success == true){
                    this.dbTableData = res.obj
                    this.cloneDbTableData =JSON.parse(JSON.stringify(res.obj))
                }
            })
        },
        handleTable(row){
            this.genSingleTableCodeVisible = true
            this.$nextTick(()=>{
                this.$refs["projectDbInfo"].clearValidate();//清空表单
           })
           this.cloneDbTableData = []
           this.projectDbInfoForm = {}
           this.projectDbInfoForm.projectId = row.projectId
           this.dbTableData = []
           this.dbDtoList = row.dbDto
        },
        genScaffold(row){
            genScaffold(row.projectId).then(res=>{
                
            })
        },
        testDb(index){
            this.$refs['projectForm'].validate((valid) => {
                if (valid) { 
                   let dbInfo =  this.projectForm.dbDto[index]
                    testDb(dbInfo).then(res=>{
                        if(res.success == true){
                            this.$message({
                                message: "链接成功！！！",
                                type: 'success'
                            })
                        }
                    })
                }
            })
        },
        delDataSource(index){
            this.projectForm.dbDto.splice(index,1)
        },
        addDataSource(){
            this.projectForm.dbDto.push({dbDriverClass:"1",dbPrimary:"0",dbIp:"",dbPort:3306,dbName:"", dbUser:"",dbPassword:"" })
        },
        closeDrawer(){
			this.drawerDialog = false
		},
        getDbDriverType(type){
            switch(type){
                case "1": 
                  return "mysql"
                default:
                  return "未知驱动类型"
            }
        },
        delhandle(row){
            this.$confirm(`确定要（删除）【${row.projectName}】吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            delProject({projectId:row.projectId}).then(res=>{
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
            Object.assign(this.checkDetail,row)
        },
        formhandle(row,type,projectForm){
            this.drawerType = type
            if(this.drawerType == "add") {
                this.drawerDialog = true
                this.$nextTick(()=>{
                    this.$refs[projectForm].clearValidate();//清空表单
                })
                this.projectForm = {
                        projectId:'',
                        projectName:'',
                        projectDesc:"",
                        projectPort:"",
                        teamName:"",
                        leader:"",
                        artifactId:"",
                        groupId:"",
                        contextPath:"",
                        fileEncoding:"UTF-8",
                        jdkVersion:"1.8",
                        dbDto:[
                            {
                               dbDriverClass:"1",
                               dbPrimary:"1",
                               dbIp:"",
                               dbPort:3306,
                               dbName:"",
                               dbUser:"",
                               dbPassword:""
                            }
                        ]
                    }
            }else{
                this.drawerDialog = true
                this.$nextTick(()=>{
                    this.$refs[projectForm].clearValidate()
                })
                // 深拷贝对象
                let data =JSON.parse(JSON.stringify(row))
                this.projectForm = data
            }
        },

        checkPrimaryDb(dbList){
            if(dbList.length > 0){
                let tempDb = dbList.filter((item,key,arr) => {
                    return item.dbPrimary == "1";  
                })
                if(tempDb.length == 0) {
                    this.$message({
                        message: "请选择一个主库作为数据源",
                        type: 'warning'
                    })
                   return false;
                }
                if(tempDb.length > 1) {
                    this.$message({
                        message: "至多选择一个主库作为数据源",
                        type: 'warning'
                    })
                   return false;
                }
            }else{
                this.$message({
                    message: "请填写数据源",
                    type: 'warning'
                })
                return false;
            }
            return true
        },
        onSubmit(){
            this.$refs['projectForm'].validate((valid) => {
                if (valid) { 
                   if(!this.checkPrimaryDb(this.projectForm.dbDto)){
                       return false;
                   }
                   if(this.drawerType == 'add') {
                       addProject(this.projectForm).then(res=>{
                            if(res.success == true){
                                this.dialogVisible = false
                                this.$message({
                                    message: res.message,
                                    type: 'success'
                                })
                                this.initData()
                                this.closeDrawer()
                            }
                       })
                   }else{
                       updateProject(this.projectForm).then(res=>{
                            if(res.success == true){
                                this.dialogVisible = false
                                this.$message({
                                    message: res.message,
                                    type: 'success'
                                })
                                this.initData()
                                this.closeDrawer()
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
            this.listProject(this.quryForm)
        },
        resetQuryForm(){
           this.quryForm = {}
           this.currentPage = 1
           this.quryForm.pageNo = 1
           this.quryForm.pageSize = this.pageSize
           this.listProject(this.quryForm)
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.currentPage = 1
            this.quryForm.pageNo = this.currentPage
            this.quryForm.pageSize = val
            this.listProject(this.quryForm)
        },
        handleCurrentChange(val) {
            this.quryForm.pageNo = this.currentPage
            this.quryForm.pageSize =this.pageSize
            this.listProject(this.quryForm)
        },
        initData(){
            this.currentPage = 1
            this.listProject({})
        },
        listProject(data){
            listProject(data).then(res=>{
                this.tableData = res.obj.list
                this.totalNum = res.obj.total
                this.isLoading =false
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleSelectionTable(val){
            this.multipleSelectionTable = val
        }
    }
};
</script>
<style scoped lang="scss">
/deep/ .el-input-number{
  width: 100%;
}
.col-text{
    text-align: right;
}
.text-center{
    text-align: center;
    font-weight: bold;
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

</style>
