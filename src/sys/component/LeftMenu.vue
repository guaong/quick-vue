<template>
  <div>
    <a-menu
      mode="inline"
      @openChange="onOpenChange"
      @click="onClick"
      theme="dark">

      <template v-for="item in permissions">
        <a-menu-item v-if="!item.children" :key="item.path">
          <a-icon :type="item.icon"/>
          <span>{{ item.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item"/>
      </template>

    </a-menu>
  </div>
</template>

<script>
  import { Menu } from 'ant-design-vue';
  // 不知道什么原因导致的title和icon中间有空隙,只能通过增加<a-sub-menu>中title和icon的间距
  const SubMenu = {
    template: `
      <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon :type="menuInfo.icon" /><span style="margin-left:4px;">{{ menuInfo.title }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.children" :key="item.path">
            <a-icon :type="item.icon" />
            <span>{{ item.title }}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.path" :menu-info="item" />
        </template>
      </a-sub-menu>
    `,
    name: 'SubMenu',
    // must add isSubMenu: true
    isSubMenu: true,
    props: {
      ...Menu.SubMenu.props,
      // Cannot overlap with properties within Menu.SubMenu.props
      menuInfo: {
        type: Object,
        default: () => ({}),
      },
    },
  };
  export default {
    name: "LeftMenu",
    components:{
      'sub-menu': SubMenu,
    },
    props:{
      permissions: {
        type: Array,
        required: true,
        default: () => []
      }
    },
    data() {
      return {
        collapsed: false,
      };
    },
    methods: {
      onOpenChange(){

      },
      onClick(e){
        if (this.$route.path !== e.key){ // 如果点击的还是当前路由就不发生变化
          this.$router.push({path: e.key});
        }
      }
    },
  }

</script>

<style scoped>

</style>
