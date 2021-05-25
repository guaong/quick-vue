<template>
  <div id="app">
    <top-menu style="width: 100%;height: 8%;background: black"/>
    <left-menu style="width: 18%;float: left;" :permissions="permissions"/>
    <router-view style="width: 82%;height: 92%;float: left;"/>
  </div>
</template>

<script>
  import LeftMenu from '@/sys/component/LeftMenu'
  import TopMenu from '@/sys/component/TopMenu'

  export default {
    name: 'App',
    components: {LeftMenu, TopMenu},
    created() {
      // 获取permissionList
      this.axios.get(this.url.getPermissionList).then((response) => {
        this.permissions = response.data.result
        // 加入router中
        let routes = [];
        for (let i = 0; i < this.permissions.length; i++){
          this.getRoute(this.permissions[i], routes);
        }
        //  router.addRoutes() is deprecated and has been removed in Vue Router 4.
        //  Use router.addRoute() instead.
        this.$router.addRoutes(routes)
      })
      // this.permissions =
      //   [
      //   //   {
      //   //   path: '/a',
      //   //   title: '菜单1',
      //   //   name: 'SysMainPage',
      //   //   key: '1',
      //   //   component: 'view/sys/SysMainPage',
      //   //   children: [{path: '/c', title: '菜单1.1', name:'Test1', key: '1.1', component: 'view/sys/Test1'}]
      //   // },
      //     {path: '/a', title: '菜单列表', component: 'view/common/permission/PermissionList'},
      //     {path: '/b', title: '用户列表', component: 'view/common/permission/UserList'},
      //     {path: '/d', title: '代码生成器',  component: 'view/common/autoGenerate/AutoGenerate'}
      //   ];
    },
    data() {
      return {
        permissions: [],
        url:{
          getPermissionList : '/permission/permission/getPermissionList'
        }
      }
    },
    methods:{
      getRoute(permission, routes){
        let route = {
          path: permission.path,
          name: permission.name,
          // vue这个@后面一定要加/,否则报错
          // permission.component为/view/sys/Test2要改为view/sys/Test2
          // ljwy
          component: (resolve) => require([`@/${permission.component}`] ,resolve)
        };
        routes.push(route);
        if (!permission.children) return;
        for (let i = 0; i < permission.children.length; i++){
          this.getRoute(permission.children[i], routes);
        }
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background: black;
    height: 100%;
  }
</style>
