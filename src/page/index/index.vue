<template>
  <div class="avue-contail"
       :class="{'avue--collapse':isCollapse,}">
    <div class="avue-layout"
         :class="{'avue-layout--horizontal':isHorizontal}">
      <div class="avue-sidebar">
        <!-- 左侧导航栏 -->
        <logo />
        <sidebar />
      </div>
      <div class="avue-main">
        <!-- 顶部导航栏 -->
        <top  ref="top" />
        <!-- 顶部标签卡 -->
        <tags />
        <!-- 主体视图层 -->
        <div style="flex:auto;overflow-y:auto;overflow-x:hidden;"
             id="avue-view"
             v-show="!isSearch">
          <keep-alive>
            <router-view class="avue-view"
                         v-if="$route.meta.keepAlive && isRefresh" />
          </keep-alive>
          <router-view class="avue-view"
                       v-if="!$route.meta.keepAlive && isRefresh" />
        </div>
        <div class="avue-footer">
          <p class="copyright">© 2018-2021 Avue designed by smallwei</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import tags from "./tags";
import logo from "./logo";
import top from "./top/";
import sidebar from "./sidebar/";
import admin from "@/util/admin";
import { validatenull } from "@/util/validate";
import { calcDate } from "@/util/date.js";
import { getStore } from "@/util/store.js";
var Event = new Vue();//定义一个空的Vue实例 用于监听兄弟组件之间的通信
export default {
  components: {
    top,
    logo,
    tags,
    sidebar
  },
  name: "index",
  provide () {
    return {
      index: this
    };
  },
  data () {
    return {
      //搜索控制
      isSearch: false,
      //刷新token锁
      refreshLock: false,
      //刷新token的时间
      refreshTime: ""
    };
  },
  created () {
    //实时检测刷新token
    this.refreshToken();
  },
  mounted () {
    this.init();
  },
  computed: mapGetters(["isHorizontal",  "isRefresh", "isLock", "isCollapse", "website", "menu"]),
  props: [],
  methods: {
    // 屏幕检测
    init () {
      this.$store.commit("SET_SCREEN", admin.getScreen());
      window.onresize = () => {
        setTimeout(() => {
          this.$store.commit("SET_SCREEN", admin.getScreen());
        }, 0);
      };
    },
  
    // 10分钟检测一次token
    refreshToken () {
      this.refreshTime = setInterval(() => {
        const token = getStore({
          name: "token",
          debug: true
        }) || {};
        const date = calcDate(token.datetime, new Date().getTime());
        if (validatenull(date)) return;
        if (date.seconds >= this.website.tokenTime && !this.refreshLock) {
          this.refreshLock = true;
          this.$store
            .dispatch("RefeshToken")
            .then(() => {
              this.refreshLock = false;
            })
            .catch(() => {
              this.refreshLock = false;
            });
        }
      }, 1000);
    }
  }
};
</script>