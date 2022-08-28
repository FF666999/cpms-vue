<template>
    <div id="icon-container">
        <span class="icon-span" v-for="(item,index) in iconList" :key="index" @click="selectedIcon(item)">
            <i  :class="item" ></i>
            <p class="icon-p">{{item}}</p>
        </span>
    </div>
</template>
<script>
export default {
    name: 'sysIcon',
    props:{
        
    },
    data() {
        return{
            iconList:[
                "el-icon-delete-solid","el-icon-delete","el-icon-s-tools","el-icon-setting","el-icon-user-solid","el-icon-user","el-icon-phone","el-icon-phone-outline",
                "el-icon-more","el-icon-more-outline","el-icon-eleme","el-icon-platform-eleme","el-icon-s-platform","el-icon-s-operation","el-icon-s-home","el-icon-s-custom",
                "el-icon-s-data","el-icon-s-grid","el-icon-postcard","el-icon-star-on","el-icon-star-off","el-icon-s-goods","el-icon-goods","el-icon-warning","el-icon-warning-outline",
                "el-icon-question","el-icon-info","el-icon-postcard","el-icon-picture","el-icon-s-promotion","el-icon-share","el-icon-menu","el-icon-discount","el-icon-news",
                "el-icon-thumb","el-icon-cpu","el-icon-connection","el-icon-set-up","el-icon-chat-round","el-icon-chat-line-round","el-icon-chat-dot-round","el-icon-message","el-icon-position",
                "el-icon-time","el-icon-view","el-icon-switch-button","el-icon-copy-document","el-icon-location","el-icon-alarm-clock","el-icon-lock","el-icon-mic","el-icon-set-up",
                "el-icon-c-scale-to-original","el-icon-date","el-icon-s-unfold","el-icon-s-fold","el-icon-s-marketing","el-icon-s-comment","el-icon-edit-outline","el-icon-c-scale-to-original","el-icon-monitor",
                
                "el-icon-reading","el-icon-headset","el-icon-coordinate","el-icon-data-line","el-icon-office-building","el-icon-school","el-icon-coin","el-icon-money","el-icon-bank-card","el-icon-s-cooperation",
                "el-icon-full-screen"
            ],
        }
    },
    methods:{
        selectedIcon(icon){
           this.$emit("selectedIcon",icon)
        }
    }

}
</script>

<style lang="scss" scoped>
.icon-span{
    margin: 6px 15px;
    text-align: center;
    display: inline-block;
    width:80px;
    height:90px;
    overflow:hidden;
    transition:all .4s;
	-moz-transition:all .4s;
	-webkit-transition:all .4s;
	-o-transition:all .4s;
}
#icon-container .icon-span:hover{
    transform:scale(1.4);
}

.icon-p{
    font-size: 5px !important;
}


#icon-container {
      height: 370px;
      background: #fff;
      padding: 22px 32px 28px;
      border-radius: 10px;
      overflow-y: auto;
}

</style>
