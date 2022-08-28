## 介绍

cpms-vue-ui是[cpms](https://gitee.com/gldcty/cpms)单体服务框架的后台管理系统UI界面，基于avue基础layout布局，并且使用vue2.0和element-ui2.0开发的后台管理，后台已经集成了网站常用的功能（包括：菜单管理、用户管理、权限管理等功能），基于它你可以快速开发出一款
符合自己业务的后台管理系统


```
# 进入项目
cd cpms-vue-ui

# 安装依赖
npm install --registry=https://registry.npm.taobao.org  或 cnpm install

# 启动服务
npm run dev

#生产打包
npm run build

```
#### 功能模块

1. 用户管理：用户是租户管理员，维护租户管理员信息

2. 部门管理：配置租户组织机构（公司、部门、小组）

3. 岗位管理：配置租户用户所属担任职务。

4. 菜单管理：配置系统菜单，操作权限，按钮权限标识等。

5. 角色管理：角色菜单权限分配

6. 操作日志：系统操作日志记录和查询

7. 顶部菜单：个性化配置，将常用功能模块归类

8. 租户管理：添加租户信息，并生成租户管理员账号信息，添加租户权限

9. 持续更新新模块......

#### 前端技术栈

| 框架       | 版本   | 描述                   |
| ---------- | ------ | ---------------------- |
| Avue       | 2.0.0  | 基于avue基础layout布局 |
| vue        | 2.5.16 | vue全家桶              |
| element-ui | 2.15.6 |                        |
| ......     |        |                        |


#### 相关项目：
cpms-cloud微服务：https://gitee.com/gldcty/cpms-cloud

cpms单体架构：https://gitee.com/gldcty/cpms

cpms-core-framework核心组件库:https://gitee.com/gldcty/cpms-core-framework

#### 后台界面预览图

<table>
        <tr>
        <td><img src="https://gitee.com/gldcty/cpms-cloud/raw/master/doc/img/pic12.png"/></td>
        <td><img src="https://gitee.com/gldcty/cpms-cloud/raw/master/doc/img/pic11.png"/></td>
    </tr>
    <tr>
        <td><img src="https://gitee.com/gldcty/cpms-cloud/raw/master/doc/img/pic10.png"/></td>
        <td><img src="https://gitee.com/gldcty/cpms-cloud/raw/master/doc/img/pic09.png"/></td>
    </tr>
    <tr>
        <td><img src="https://gitee.com/gldcty/cpms-cloud/raw/master/doc/img/pic08.png"/></td>
        <td><img src="https://gitee.com/gldcty/cpms-cloud/raw/master/doc/img/pic07.png"/></td>
    </tr>
    <tr>
        <td><img src="https://gitee.com/gldcty/cpms-cloud/raw/master/doc/img/pic06.png"/></td>
        <td><img src="https://gitee.com/gldcty/cpms-cloud/raw/master/doc/img/pic05.png"/></td>
    </tr>
    <tr>
        <td><img src="https://gitee.com/gldcty/cpms-cloud/raw/master/doc/img/pic04.png"/></td>
        <td><img src="https://gitee.com/gldcty/cpms-cloud/raw/master/doc/img/pic03.png"/></td>
    </tr>
    <tr>
        <td><img src="https://gitee.com/gldcty/cpms-cloud/raw/master/doc/img/pic01.png"/></td>
        <td><img src="https://gitee.com/gldcty/cpms-cloud/raw/master/doc/img/pic02.png"/></td>
    </tr>
</table>


