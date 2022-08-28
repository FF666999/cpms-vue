<template>
    <basic-container>
        <el-row>
            <el-col :span="2" v-has="'sys_menu_add'">
                <el-button
                    type="primary"
                    @click="formhandle(null,'add')"
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
        prop="name"
        label="菜单名称"
        width="160">
        </el-table-column>
        <el-table-column
        prop="code"
        label="菜单编码"
        width="180">
        </el-table-column>
        <el-table-column
        prop="alias"
        label="菜单别名"
        width="120">
        </el-table-column>

        <el-table-column
        prop="path"
        label="路由地址"
        width="120">
        </el-table-column>
        <el-table-column
        prop="icon"
        label="图标"
        align="center"
        width="80">
        <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
        </template>
        </el-table-column>
        <el-table-column
        align="center"
        prop="sort"
        label="排序"
        width="80">
        </el-table-column>
        <el-table-column
        align="center"
        prop="openFlag"
        label="新窗口"
        width="80">
            <template slot-scope="scope">
            {{scope.row.openFlag ==0 ? "否": "是"}}
            </template>
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
            <el-button @click="checkInfo(scope.row)" type="text" size="small" v-has="'sys_menu_view'"><i class="el-icon-view"></i>查看</el-button>
            <el-button @click="formhandle(scope.row,'edit')" type="text" size="small" v-has="'sys_menu_edit'"><i class="el-icon-edit"></i>编辑</el-button>
            <el-button @click="delhandle(scope.row)"  type="text" size="small" v-has="'sys_menu_delete'"><i class="el-icon-delete"></i>删除</el-button>
        </template>
        </el-table-column>
        </el-table>

        <el-dialog
        class="tetee"
        :title="dialogType==='add'?'新增':'编辑'"
        :visible.sync="dialogVisible"
        width="50%"
        :close-on-click-modal="false"
        >
            <el-form :model="menuForm"  ref="menuForm" :rules="rules" label-width="98px">
                <el-row :gutter="20">
                    <el-col :span="22">
                       <el-form-item label="上级菜单:" prop="parentId">
                             <el-cascader
                                :key="menuForm.menuId"
                                class="select-menu"
                                placeholder="请选择上级菜单"
                                :options="menuTree"
                                :props="props"
                                v-model="menuForm.parentId"
                                :disabled="disabledSelect"
                                clearable
                                filterable>
                            </el-cascader>
                        </el-form-item>
                    </el-col> 
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="11">
                        <el-form-item label="菜单名称:" prop="name">
                            <el-input  clearable  v-model="menuForm.name" placeholder="请输入菜单名称..."  />
                        </el-form-item>
                    </el-col> 
                    <el-col :span="11">
                        <el-form-item label="菜单编码:" prop="code">
                            <el-input clearable v-model="menuForm.code" placeholder="如：menu_manage、sys_menu_add" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                     <el-col :span="11">
                        <el-form-item label="菜单排序:">
                            <el-input-number v-model="menuForm.sort" @change="handleSort" :min="0" :max="1000000" ></el-input-number>
                        </el-form-item>
                    </el-col> 
                      <el-col :span="11">
                        <el-form-item label="菜单别名:" prop="alias">
                            <el-input clearable v-model="menuForm.alias" placeholder="如：menu、add"/>
                        </el-form-item>
                     </el-col>
                </el-row>
                 <el-row :gutter="20">
                    <el-col :span="11">
                        <el-form-item label="菜单类型:">
                             <el-radio v-model="menuForm.type" @change="handleType" label="0">菜单</el-radio>
                             <el-radio v-model="menuForm.type" @change="handleType" label="1">按钮</el-radio>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="11">
                        <el-form-item label="新窗口:">
                             <el-radio :disabled = "radioDisabled" v-model="menuForm.openFlag" label="0">否</el-radio>
                             <el-radio :disabled = "radioDisabled" v-model="menuForm.openFlag" label="1">是</el-radio>
                        </el-form-item>
                    </el-col> -->
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="11">
                        <el-form-item label="路由地址:" prop="path">
                            <el-input  clearable  :disabled = "pathDisabled"  v-model="menuForm.path" placeholder="如：/system/dept、/system/role"  />
                        </el-form-item>
                    </el-col> 
                    <el-col :span="11">
                        <el-form-item label="菜单图标:" prop="icon">
                            <el-input clearable v-model="menuForm.icon" :disabled = "iconDisabled" @focus="focusHandle" placeholder="请选择菜单图标..." />
                        </el-form-item>
                    </el-col>
                </el-row>
           </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </span>
        </el-dialog>
         <el-dialog
            title="图标库"
            :visible.sync="icondialog"
            width="70%"
            >
            <sys-icon @selectedIcon="getselectIcon"></sys-icon>
        </el-dialog>
        
        <el-dialog
        class="tetee"
        title="查看"
        :visible.sync="checkDialogType"
        width="50%"
        >
        <el-row :gutter="2" class="row-text">
            <el-col :span="3" class="col-text">
                菜单名称：
            </el-col> 
            <el-col :span="9" >
                {{menuInfo.name}}
            </el-col> 
             <el-col :span="3" class="col-text">
                菜单编码：
            </el-col> 
            <el-col :span="9">
                {{menuInfo.code}}
            </el-col> 
        </el-row>
        <el-row :gutter="2" class="row-text">
            <el-col :span="3" class="col-text">
                父级菜单：
            </el-col> 
            <el-col :span="9" >
                {{menuInfo.parentName}}
            </el-col> 
             <el-col :span="3" class="col-text">
                菜单别名：
            </el-col> 
            <el-col :span="9">
                {{menuInfo.alias}}
            </el-col> 
        </el-row>
        <el-row :gutter="10" class="row-text">
            <el-col :span="3" class="col-text">
                路由地址：
            </el-col> 
            <el-col :span="9" >
                {{menuInfo.path}}
            </el-col> 
             <el-col :span="3" class="col-text">
                菜单图标：
            </el-col> 
            <el-col :span="9">
              <i :class="menuInfo.icon"></i>
            </el-col> 
        </el-row>
        <el-row :gutter="2" class="row-text">
            <el-col :span="3" class="col-text">
                菜单排序：
            </el-col> 
            <el-col :span="9" >
                {{menuInfo.sort}}
            </el-col> 
             <el-col :span="3" class="col-text">
                菜单类型：
            </el-col> 
            <el-col :span="9">
                {{menuInfo.type == '0' ? '菜单':'按钮'}}
            </el-col> 
        </el-row>
         <!-- <el-row :gutter="2" class="row-text">
            <el-col :span="3" class="col-text">
                新窗口：
            </el-col> 
            <el-col :span="9" >
                {{menuInfo.openFlag == '0' ? '否': '是'}}
            </el-col> 
        </el-row> -->
        </el-dialog>
   </basic-container>
</template>

<script>
import {listMenu,addMenu,editMenu,delMenu} from '@/api/system/menu'
import sysIcon  from "@/components/common/sysIcon";
import {getAllParentNodeByChildNode} from '@/util/util'
var pathRule = [{ required: true, message: '请填写菜单路由地址', trigger: 'blur' }]
var iconRule = [{ required: true, message: '请选择菜单图标', trigger: 'change' }]
export default {
    components: {
        sysIcon
    },
    data() {
        return {
            disabledSelect:false,
            checkDialogType:false,
            radioDisabled:false,
            pathDisabled:false,
            iconDisabled:false,
            dialogType:"add",
            dialogVisible:false,
            icondialog: false,
            isLoading:true,
            menuTree:[],
            multipleSelection: [],
            tableData: [],
            menuForm:{
                menuId:"",
                parentId:[],
                name:"",
                code:"",
                alias:"",
                path:"",
                icon:"",
                component:"",
                sort:0,
                type:"0",
                openFlag:"0"
            },
            menuInfo:{},
            rules:{
                name: [
                    { required: true, message: '请填写菜单名称', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请填写菜单编码', trigger: 'blur' }
                ],
                alias: [
                    { required: true, message: '请填写菜单别名', trigger: 'blur' }
                ],
                path : [
                    { required: true, message: '请填写菜单路由地址', trigger: 'blur' }
                ],
                icon : [
                    { required: true, message: '请选择菜单图标', trigger: 'change' }
                ]
            }
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
                children: 'children',  // 子级字段名
                disabled:'disabled'
                }
            }
        },
    },

    created() {
        this.initData()
    },
    methods: {
        checkInfo(row){
           this.checkDialogType = true
           this.menuInfo = row
           let arrTree = getAllParentNodeByChildNode(this.menuTree,this.menuInfo.parentId+"","menuId")
           let nameLink = arrTree.map(e=> e.name).join(">");
           this.menuInfo.parentName = nameLink
        },
        initData(){
            this.listMenu({})
            this.getMenuTreeNodes()
        },
        handleType(type){
            if(type == '0'){
                this.pathDisabled  = false
                this.radioDisabled = false
                this.iconDisabled  = false
                if(!this.rules.hasOwnProperty("path")) {
                   this.rules.path = pathRule
                }
                 if(!this.rules.hasOwnProperty("icon")) {
                   this.rules.icon = iconRule
                }
            }else{
                this.pathDisabled  = true
                this.radioDisabled = true
                this.iconDisabled  = true
                 if(this.rules.hasOwnProperty("path")) {
                   delete  this.rules["path"]
                   this.$nextTick(()=>{
                    this.$refs["menuForm"].clearValidate("path");
                   })
                }
                if(this.rules.hasOwnProperty("icon")) {
                   delete  this.rules["icon"]
                   this.$nextTick(()=>{
                    this.$refs["menuForm"].clearValidate("icon");
                   })
                }
            }
        },
        handleSort(num){
            this.menuForm.sort = num
        },
        getselectIcon(icon){
            this.icondialog = false
            this.menuForm.icon = icon
        },
        focusHandle(){
            this.icondialog = true
        },
        onSubmit(){
            this.$refs['menuForm'].validate((valid) => {
                if(valid){
                    let data = {}
                    data.name = this.menuForm.name
                    data.alias = this.menuForm.alias
                    data.path  = this.menuForm.path
                    data.icon  = this.menuForm.icon
                    data.code = this.menuForm.code
                    data.menuId = this.menuForm.menuId
                    data.sort = this.menuForm.sort
                    data.parentId = this.menuForm.parentId.length > 0 ? this.menuForm.parentId[this.menuForm.parentId.length - 1] : 0
                    data.type = this.menuForm.type
                    data.openFlag = this.menuForm.openFlag
                    if(data.type != '0'){
                        data.openFlag = '0'
                        data.path  = ''
                        data.icon  = ''
                    }
                    if(this.dialogType == "add") {
                        addMenu(data).then(res=>{
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
                        if(data.menuId == data.parentId) {
                            this.$message({
                                message: "不能选自己作为父节点",
                                type: 'warning'
                            })
                            return
                        }
                        editMenu(data).then(res=>{
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
                }
            })
        },
        delhandle(row){
            this.$confirm(`确定要（删除）【${row.name}】节点吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            delMenu({menuId:row.menuId}).then(res=>{
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
        formhandle(row,type){
            this.dialogVisible = true
            this.dialogType = type
            this.disabledSelect = false
            this.$nextTick(()=>{
                this.$refs["menuForm"].clearValidate();//清空表单
            })
            if(this.dialogType == "add") {
                this.emptyMenuform()
                this.handleType(this.menuForm.type)
            }else{
                this.menuForm.menuId = row.menuId
                this.menuForm.name = row.name
                this.menuForm.path = row.path
                this.menuForm.icon = row.icon 
                this.menuForm.code = row.code
                this.menuForm.alias = row.alias
                this.menuForm.sort = row.sort
                this.menuForm.type = row.type+""
                this.menuForm.openFlag = row.openFlag+""
                this.handleType(this.menuForm.type)
                if(row.parentId != 0) {
                    let arrTree = getAllParentNodeByChildNode(this.menuTree,row.parentId+"","menuId")
                    let arr = arrTree.map(e=> e.menuId);
                    this.menuForm.parentId = arr
                }else{
                    this.disabledSelect = true
                    this.menuForm.parentId = ["0"]
                }
            }
        },
        getMenuTreeNodes(){
            listMenu({type:0}).then(e=>{
                this.menuTree = e.obj
            })
        },
        emptyMenuform(){
            this.menuForm = {
                menuId:"",
                parentId:[],
                name:"",
                code:"",
                alias:"",
                path:"",
                icon:"",
                component:"",
                sort:0,
                type:"0",
                openFlag:"0"
            }
        },
       
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        listMenu(data){
            listMenu(data).then(e=>{
                this.tableData = e.obj
                this.isLoading =false
            })
        }
    },

  }
</script>
<style scoped lang="scss">
 /deep/ .el-dialog__header{
    border-bottom: 1px solid #e5e4e4;
}

/deep/ .el-input-number{
  width: 100%;
}

.col-text{
    text-align: center;
}
.row-text{
    margin-bottom: 10px !important;
}
/deep/ .select-menu {
	width: 100%;
}
</style>
