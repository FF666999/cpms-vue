<template>
  <div>
    <div class="wel__header" style="margin-bottom:20px;">
      <div class="wel__info">
        <img :src="userInfo.userAvatar"
             alt=""
             class="wel__info-img">
        <div class="wel__info-content">
          <div class="wel__info-title">
            你好！，{{userInfo.userName}}
          </div>
          <div class="wel__info-subtitle">
            cpms是一款简洁实用的后台管理开发脚手架
          </div>
        </div>
      </div>
    </div>
      <el-row :span="24">
        <el-col :span="18">
          <basic-container id="left-container">
              <p align="center">
                  <img src="https://img.shields.io/badge/Spring%20Cloud-Hoxton.SR5-green.svg" alt="Downloads">
                  <img src="https://img.shields.io/badge/SpringBoot-2.2.7.RELEASE-brightgreen.svg" alt="Build Status">
                  <img src="https://img.shields.io/badge/spring%20cloud%20alibaba-2.2.1.RELEASE-red.svg" alt="Build Status">
                  <img src="https://img.shields.io/badge/JDK-11-informational.svg" alt="Coverage Status">
                  <img src="https://img.shields.io/badge/mysql-5.7+-informational.svg" alt="Downloads">
                  <img src="https://img.shields.io/badge/mybatis%20plus-3.4.3-yellow.svg" alt="Downloads">
                  <img src="https://img.shields.io/badge/redission-3.16.0+-important.svg" alt="Downloads">
                  <img src="https://img.shields.io/badge/openfeign-2.2.3.RELEASE-yellowgreen.svg" alt="Downloads">
                <img src="https://img.shields.io/badge/xxl%20job-2.3.0-blue.svg" alt="Downloads">
                <img src="https://img.shields.io/badge/lombok-1.18.12-green.svg" alt="Downloads">
                <img src="https://img.shields.io/badge/fastjson-1.2.75-green.svg" alt="Downloads">
                <img src="https://img.shields.io/badge/guava-30.1.1%20jre-informational.svg" alt="Downloads">

                <a target="_blank" href="https://gitee.com/gldcty/cpms-core-framework">
                  <img src="https://img.shields.io/badge/cpms%20core%20framework-1.0.0-blue.svg" alt="Downloads">
                </a>
                <a target="_blank" href="https://www.cpms.vip">
                  <img src="https://img.shields.io/badge/Copyright-@cpms-success.svg" alt="Downloads">
                </a>
              </p>  
              <p>
                  <b>介绍：</b>
              </p>
              <div>
                <p>
                  项目名：cpms 是Concise practical management system 的首字母缩写，意思是：简洁实用的后台管理系统
                </p>
                 <p>
                 cpms-cloud是基于微服务框架spring-cloud-alibaba搭建的一套多租户后台管理系统脚手架，采用前后端分离架构，前端使用vue2.0和element-ui2.0开发。<br/><br/>

                 该脚手架是一套通用且可快速进行二次开发的后台微服务框架。已经集成了管理系统最基础的后台模块，包括：菜单管理、用户管理、租户管理、角色管理、部门管理、权限管理以及后台操作日志管理等模块。
                </p>
                 <p>
                  后续会不断添加新的功能模块~~~~~~
                  </p>
              </div>
              <p>
                  <b>相关项目：</b>
              </p>
              <div>
                <p> cpms-cloud微服务架构：<a style="color:#095eab;" href=" https://gitee.com/gldcty/cpms-cloud" target="_blank">https://gitee.com/gldcty/cpms-cloud</a></p>

                <p>cpms单体架构：<a style="color:#095eab;" href="https://gitee.com/gldcty/cpms" target="_blank">https://gitee.com/gldcty/cpms</a></p>

                <p>cpms-core-framework核心组件库: <a style="color:#095eab;" href="https://gitee.com/gldcty/cpms-core-framework" target="_blank">https://gitee.com/gldcty/cpms-core-framework</a></p>
              </div>
              <div>
                <img src="https://gitee.com/gldcty/cpms-cloud/raw/master/doc/img/cpms-cloud.drawio.png">
              </div>
          </basic-container>
        </el-col>
        <el-col :span="6">
          <basic-container id="right-container">
            <p style="font-weight:bolder;">QQ交流群</p>
            <img  src="https://gitee.com/gldcty/cpms-cloud/raw/master/doc/img/qq-qun-01.png"/>
          </basic-container>
        </el-col>
    </el-row>

   
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "wel",
  data () {
    return {
     
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    option1 () {
      return {
        span: 6,
      };
    },
 
  },
  created () { },
  methods: {}
};
</script>

<style scoped="scoped" lang="scss">
.wel {
  &__header {
    padding: 25px 40px;
    border-bottom: 1px solid #e8e8e8;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
  }
  &__info {
    display: flex;
    align-items: center;
    &-img {
      border-radius: 72px;
      display: block;
      width: 72px;
      height: 72px;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    &-content {
      position: relative;
      margin-left: 24px;
      color: rgba(0, 0, 0, 0.45);
      line-height: 22px;
    }
    &-title {
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 12px;
    }
    &-subtitle {
      position: relative;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
      line-height: 22px;
    }
  }
  &__extra {
    &-item {
      position: relative;
      padding: 0 32px;
      display: inline-block;
      &:last-child {
        &::after {
          display: none;
        }
      }
      &:after {
        background-color: #e8e8e8;
        position: absolute;
        top: 30px;
        right: 0;
        width: 1px;
        height: 40px;
        content: "";
      }
    }
    &-title {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 4px;
    }
    &-subtitle {
      color: rgba(0, 0, 0, 0.85);
      font-size: 30px;
      line-height: 38px;
      margin: 0;
      span {
        color: rgba(0, 0, 0, 0.45);
        font-size: 20px;
      }
    }
  }
}
#left-container{
  img{
    margin:0 5px;
  }
}
</style>
