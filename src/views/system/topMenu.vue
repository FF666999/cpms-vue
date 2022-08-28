<template>
    <basic-container>
	    <el-row>
            <el-col :span="2">
                <el-button
                    type="primary"
                    @click="formhandle('','add','topMenuForm')"
                    size="mini"
                    icon="el-icon-plus">
                    新增
                </el-button>
            </el-col>
            <el-col :span="2" class="grid-button">
                <el-button
                    plain
                    @click="configureMenu()"
                    size="mini" icon="el-icon-setting">
                    配置菜单
                </el-button>
                <el-popover
                    placement="right"
                    title="提示"
                    width="250"
                    popper-class="question-tips-content"
                    trigger="hover"
                    content="顶部菜单个性化设置，添加的顶部菜单只有自己可见！！！">
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
        prop="topMenuName"
        label="菜单名称"
        width="250">
        </el-table-column>
		<el-table-column
        prop="icon"
        label="菜单图标"
         align="center"
        width="100">
         <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
        </template>
        </el-table-column>
        <el-table-column
        prop="sort"
        label="排序"
        :show-overflow-tooltip="true"
        width="100">
        </el-table-column>

        <el-table-column
        prop="type"
        label="类型"
        width="100">
         <template slot-scope="scope">
            {{scope.row.type == 0 ? "菜单" :"外链"}}
        </template>
        </el-table-column>
        <el-table-column
        prop="path"
        label="外链URL"
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
            <el-button @click="checkInfo(scope.row)"  type="text" size="small"><i class="el-icon-view"></i>查看</el-button>
            <el-button @click="formhandle(scope.row,'edit','topMenuForm')" type="text" size="small"><i class="el-icon-edit"></i>编辑</el-button>
            <el-button @click="delhandle(scope.row)"  type="text" size="small"><i class="el-icon-delete"></i>删除</el-button>
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
            <el-form  :model="topMenuForm" ref="topMenuForm" :rules="rules" label-width="88px">
                <el-row :gutter="20">
                    <el-col :span="11">
                        <el-form-item label="菜单名称:" prop="topMenuName">
                            <el-input clearable v-model="topMenuForm.topMenuName" placeholder="请输入菜单名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="菜单图标:" prop="icon">
                            <el-input clearable v-model="topMenuForm.icon" @focus="focusHandle" placeholder="请选择菜单图标"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
               <el-row :gutter="20">
                    <el-col :span="11">
                        <el-form-item label="菜单排序:">
                            <el-input-number v-model="topMenuForm.sort" controls-position="right"  :min="0" :max="10000"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="菜单类型:">
                            <el-radio v-model="topMenuForm.type" @change="handlerType"  label="0">菜单</el-radio>
                            <el-radio v-model="topMenuForm.type" @change="handlerType"  label="1">外链</el-radio>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                 <el-row :gutter="20" >
                    <el-col :span="11">
                        <el-form-item label="外链url:" prop="path">
                            <el-input v-model="topMenuForm.path"  :disabled = "pathDisabled" ref="input_path" clearable  placeholder="请输入外链url"></el-input>
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
        title="查看"
        :visible.sync="checkDialogType"
        width="45%"
        >
        <el-row :gutter="2" class="row-text">
            <el-col :span="2" class="col-text">
                菜单名称:
            </el-col> 
            <el-col :span="9" >
                {{topMenuInfo.topMenuName}}
            </el-col> 
             <el-col :span="2" class="col-text">
                菜单图标:
            </el-col> 
            <el-col :span="9">
                <i :class="topMenuInfo.icon"></i>
            </el-col> 
        </el-row>
        <el-row :gutter="10" class="row-text">
            <el-col :span="2" class="col-text">
                排序:
            </el-col> 
            <el-col :span="9" >
                {{topMenuInfo.sort}}
            </el-col> 
             <el-col :span="2" class="col-text">
                类型:
            </el-col> 
            <el-col :span="9">
              {{topMenuInfo.type == 0 ? "菜单" :"外链"}}
            </el-col> 
        </el-row>
        <el-row :gutter="10" class="row-text">
            <el-col :span="2" class="col-text">
                外链URL:
            </el-col> 
            <el-col :span="9" >
                {{topMenuInfo.path}}
            </el-col> 
        </el-row>
        </el-dialog>

        <el-dialog
            title="图标库"
            :visible.sync="icondialog"
            width="70%"
            >
            <sys-icon @selectedIcon="getselectIcon"></sys-icon>
        </el-dialog>

         <el-dialog
            class="tetee menu-dialog"
            title="配置下级菜单"
            :visible.sync="configureMenuDialogType"
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
                <el-button @click="configureMenuDialogType = false" size="mini">取消</el-button>
                <el-button type="primary" @click="submitConfigMenu" size="mini">确定</el-button>
            </span>
        </el-dialog>
       
  </basic-container>
</template>

<script>
import sysIcon  from "@/components/common/sysIcon";
import {listTopMenu,addTopMenu,updateTopMenu,deleteTopMenu,configTopMenu} from '@/api/system/topMenu'
import {userOwnedMenus} from '@/api/system/menu'
import {validateURL} from "@/util/validate"

export default {
    components: {
        sysIcon
    },
  	data() {
        var URLValid = (rule, value,callback) =>{
			if (!validateURL(value)) {
				callback(new Error("URL格式不合法"));
			}else{
				callback();
			}
		}
		return {
            filterText:'',
            configureMenuDialogType:false,
            icondialog:false,
            dialogType:"add",
            dialogVisible:false,
            checkDialogType:false,
            multipleSelection:[],
            isLoading:true,
            pathDisabled:true,
            tableData: [],
            menuTree:[],
            topMenuForm:{
                topMenuId:'',
                topMenuName:'',
                icon:'',
                sort:0,
                type:'0',
                path:''
            },
            topMenuInfo:{},
            rules:{
                topMenuName:[
					{ required: true, message: '请填写菜单名称', trigger: 'blur' },
				],
				icon:[
					{ required: true, message: '请选择菜单图标', trigger: 'change' },
				]
            },
            selectedTopMenuId:null,
            pathRule:[
                { required: true, message: '请输入外链URL', trigger: 'blur' },
                { required: true,validator: URLValid,  trigger: 'blur' }
            ]
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
         
        submitConfigMenu(){
            let selectedNodes = this.$refs.menuTree.getCheckedNodes(false,true)
            if(selectedNodes.length ==0){
                this.$message({
                    message: "请选择下级菜单",
                    type: 'warning'
				})
				return
            }
            let menuIds =  selectedNodes.map(e=>e.menuId)
            configTopMenu({relationMenuIds:[...menuIds].join(","),topMenuId:this.selectedTopMenuId}).then(res=>{
                if(res.success == true){
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.configureMenuDialogType = false
                    this.listTopMenu()
                }
            })
        },
        
        getMenuTreeNodes(){
            userOwnedMenus().then(e=>{
                this.menuTree = e.obj
            })
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        configureMenu(){
            if(this.multipleSelection.length <=0){
				this.$message({
                    message: "请先选择顶部菜单",
                    type: 'warning'
				})
				return
			}
			if(this.multipleSelection.length > 1){
				this.$message({
                    message: "不能选择多个顶部菜单",
                    type: 'warning'
				})
				return
			}
            if(this.multipleSelection[0].type == 1){
				this.$message({
                    message: "外链类型不能配置菜单",
                    type: 'warning'
				})
				return
			}

            this.selectedTopMenuId = this.multipleSelection[0].topMenuId
            let allParentId = this.getParentMenuId(this.menuTree)
            let allMenuId = this.multipleSelection[0].relationMenuIds !=null ? this.multipleSelection[0].relationMenuIds.split(",") : []
            this.configureMenuDialogType = true
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

        handlerType(type){
            if(type=='0'){
                this.pathDisabled = true
                if(this.rules.hasOwnProperty("path")) {
                   delete this.rules["path"]
                   this.$nextTick(()=>{
                    this.$refs["topMenuForm"].clearValidate("path");
                   })
                }
            }else{
                this.pathDisabled = false
                if(!this.rules.hasOwnProperty("path")) {
                   this.rules.path = this.pathRule
                }
            }
        },
        getselectIcon(icon){
            this.icondialog = false
            this.topMenuForm.icon = icon
        },
        focusHandle(){
            this.icondialog = true
        },
        onSubmit(){
            this.$refs['topMenuForm'].validate((valid) => {
                if(valid){
                    let data = {}
                    data.topMenuId = this.topMenuForm.topMenuId
                    data.topMenuName = this.topMenuForm.topMenuName
                    data.icon = this.topMenuForm.icon
                    data.sort = this.topMenuForm.sort
                    data.type = this.topMenuForm.type
                    data.path = this.topMenuForm.type == '0' ? '' : this.topMenuForm.path
                    if(this.dialogType == 'add') {
                        addTopMenu(data).then(res=>{
                            if(res.success == true){
                                this.$message({
                                    message: res.message,
                                    type: 'success'
                                })
                                this.dialogVisible = false
                                this.initData()
                            }
                        })
                    }else{
                        updateTopMenu(data).then(res=>{
                            if(res.success == true){
                                this.$message({
                                    message: res.message,
                                    type: 'success'
                                })
                                this.dialogVisible = false
                                this.initData()
                            }
                        })
                    }
                }
            })
        },
        delhandle(row){
            this.$confirm(`确定要（删除）【${row.topMenuName}】 吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                deleteTopMenu({topMenuId:row.topMenuId}).then(res=>{
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
        formhandle(row,type,form){
            this.dialogType = type
            this.dialogVisible = true
            if(this.dialogType == 'add') {
                this.topMenuForm  = {
                    topMenuId:'',
                    topMenuName:'',
                    icon:'',
                    sort:0,
                    type:'0',
                    path:''
                }
                this.handlerType(this.topMenuForm.type)
            }else{
                this.topMenuForm.topMenuId = row.topMenuId
                this.topMenuForm.topMenuName = row.topMenuName
                this.topMenuForm.icon = row.icon
                this.topMenuForm.sort = row.sort
                this.topMenuForm.type = row.type
                this.topMenuForm.path = row.path
                this.handlerType(this.topMenuForm.type)
            }
            this.$nextTick(()=>{
                this.$refs[form].clearValidate();//清空表单
            })
        },
        checkInfo(row){
            this.checkDialogType = true
            this.topMenuInfo = row
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        initData(){
             this.listTopMenu()
             this.getMenuTreeNodes()
        },
        listTopMenu(){
            listTopMenu().then(res=>{
                this.tableData = res.obj
                this.isLoading =false
            })   
        }
    },
    watch: {
      	filterText(val) {
        	this.$refs.menuTree.filter(val);
      	},
   }
}
</script>
<style scoped lang="scss">
/deep/ .el-input-number{
  width: 100%;
}
/deep/ .el-dialog__header{
    border-bottom: 1px solid #e5e4e4;
}
.menu-dialog /deep/ .el-dialog__body{
    padding: 20px 20px;
}
.input-path-error-msg{
    font-size:12px !important;
    color:#F56C6C !important;
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
</style>
