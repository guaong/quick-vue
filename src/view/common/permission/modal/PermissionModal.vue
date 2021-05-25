<template>
  <a-modal
    :visible="visible"
    @cancel="close"
    @close="close"
    title="新增菜单"
    :width="900"
    okText="添加"
    cancelText="取消"
    @ok="handleSubmit">

    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
      <a-form-item label="菜单名称">
        <a-input placeholder="请输入菜单名称"
                 v-decorator="['title', validatorRules.title]"></a-input>
      </a-form-item>
      <a-form-item label="前端组件所在路径">
        <a-input placeholder="例如:/view/test.vue要写view/test"
                 v-decorator="['component', validatorRules.component]"></a-input>
      </a-form-item>
      <a-form-item label="路由地址">
        <a-input placeholder="例如:/example/test"
                 v-decorator="['path', validatorRules.path]"></a-input>
      </a-form-item>
      <a-form-item label="父菜单">
        <!--        <a-input placeholder=""-->
        <!--                 v-decorator="['pid', validatorRules.pid]"></a-input>-->
        <a-tree-select
          placeholder="请选择父菜单"
          v-decorator="['pid', validatorRules.pid]"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :tree-data="treeData"
        >

        </a-tree-select>
      </a-form-item>
      <a-form-item label="菜单类型">
        <a-input placeholder="请选择菜单类型"
                 v-decorator="['type', validatorRules.type]"></a-input>
      </a-form-item>
      <a-form-item label="优先级">
        <a-input placeholder="请输入优先级,数字越小优先级越高"
                 v-decorator="['sort', validatorRules.sort]"></a-input>
      </a-form-item>
    </a-form>

  </a-modal>
</template>

<script>
  export default {
    name: "PermissionModal",
    data() {
      return {
        visible: false,
        treeData: [],
        form: this.$form.createForm(this),
        url: {
          add: '/permission/permission/add',
          getPermissionList: '/permission/permission/getPermissionSelectTreeList'
        },
        validatorRules: {
          title: {rules: [{required: true, message: '请输入菜单名称'}]},
          component: {rules: [{required: true, message: '请输入路径'}]},
          path: {rules: [{required: true, message: '请输入地址'}]},
          pid: {rules: [{required: true, message: '请选择父菜单'}]},
          type: {rules: [{required: true, message: '请选择菜单类型'}]},
          sort: {rules: [{required: true, message: '请输入优先级'}]}
        }
      }
    },
    created() {

    },
    methods: {
      loadData() {
        this.axios.get(this.url.getPermissionList).then((response) => {
          this.treeData = response.data.result;
          this.treeData.push()
        })
      },
      add() {
        this.edit({pid:0})
      },
      edit(record) {
        this.visible = true;
        this.loadData();
        this.$nextTick(() => {
          this.form.setFieldsValue({
            'id':record.id,
            'title':record.title,
            'component':record.component,
            'path':record.path,
            'pid':record.pid + '',
            'create_time': record.create_time,
            'create_by': record.create_by,
            'update_time': record.update_time,
            'update_by':record.update_by,
            'delete_time':record.delete_time,
            'delete_by':record.delete_by,
            'delete_flag':record.delete_flag,
            'type':record.type,
            'sort':record.sort,
            'icon':record.icon
          });
        });
      },
      close() {
        this.visible = false;
        this.form.resetFields();
      },
      handleSubmit() {
        var that = this;
        this.form.validateFields((err, values) => {
          if (!err) {
            var formData = values;
            that.axios.post(this.url.add, formData).then((response) => {
              if (response.data.success) {
                that.$message.success(response.data.result)
              } else {
                that.$message.error(response.data.result)
              }
              this.close();
              this.$emit("ok");
            });
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>

