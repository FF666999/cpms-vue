<template>
  <div class="top-menu">
    <el-menu :default-active="activeIndex"
             mode="horizontal"
             text-color="#333">
      <template v-for="(item,index) in items">
        <el-menu-item :index="item.topMenuId+''"
                      @click.native="openMenu(item)"
                      :key="index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { resetRouter } from '@/router/router'
export default {
  name: "top-menu",
  data () {
    return {
      activeIndex: "0",
      items: []
    };
  },
  inject: ["index"],
  created () {
    this.getTopMenu();
  },
  computed: {
    ...mapGetters(["tagCurrent", "menu","tagWel", "tagList","tag"])
  },
  methods: {
    openTag (item) {
      let tag;
      if (item.name) {
        tag = this.findTag(item.name).tag;
      } else {
        tag = item;
      }
      this.$router.push({
        path: this.$router.$avueRouter.getPath({
          name: tag.label,
          src: tag.value
        }, tag.meta),
        query: tag.query
      });
    },
    findTag (value) {
      let tag, key;
      this.tagList.map((item, index) => {
        if (item.value === value) {
          tag = item;
          key = index;
        }
      });
      return { tag: tag, key: key };
    },
     // 因需清除每个keep-alive页面的缓存，需一个一个的激活tag到前台做删除
    activeTag (tagList) {
      tagList.forEach(item => {
        this.openTag(item);
           this.$store.commit("DEL_TAG", item);
      });
    },
    closeAllTags () {
        this.activeTag(this.tagList)
        this.$router.push({
          path: this.$router.$avueRouter.getPath({
            src: this.tagWel.value
          }),
          query: this.tagWel.query
        });
    },
    openMenu (item) {
        if(item.meta.menu) {
            this.$store.dispatch("GetMenu", item.topMenuId).then(data => {
                if (data.length !== 0) {
                  resetRouter();
                  this.$router.$avueRouter.formatRoutes(data, true);
                }
                let itemActive,
                childItemActive = 0;
                if(this.menu.length == 0) {
                  return
                }
                if (item.path) {
                  itemActive = item;
                } else {
                  if (this.menu[childItemActive].length == 0) {
                      itemActive = this.menu[childItemActive];
                  } else {
                      itemActive = this.menu[childItemActive].children[childItemActive];
                  }
                }
                if(itemActive) {
                  this.closeAllTags(item)
                  this.$router.push({
                    path: this.$router.$avueRouter.getPath({
                        name: itemActive.label,
                        src: itemActive.path
                    })
                  });
                }
            });
        }else{
            window.open(item.path,'_blank')        
        }
    },
    getTopMenu () {
      this.$store.dispatch("GetTopMenu").then(res => {
        this.items = res;
      });
    }
  }
};
</script>