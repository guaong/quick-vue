<template>
  <a-modal
    :visible="visible"
    @cancel="close"
    @close="close"
    title="代码生成"
    okText="生成"
    cancelText="取消"
    @ok="handleSubmit">

    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
      <a-form-item label="导出路径">
        <a-input placeholder="例如:D:/example/{tableName}"
                 v-decorator="['exportUrl', {rules:[{ required:true, message:'请输入导出路径' }]}]"></a-input>
      </a-form-item>
      <a-form-item label="导出包名">
        <a-input placeholder="例如:com.example.{tableName}"
                 v-decorator="['packageUrl', {rules:[{ required:true, message:'请输入导出包名' }]}]"></a-input>
      </a-form-item>
    </a-form>

  </a-modal>
</template>

<script>
  export default {
    name: "AutoGenerateModal",
    data() {
      return {
        visible: false,
        tableNames: [],
        form: this.$form.createForm(this),
        url: {
          batchGenerate: '/quick/quick/batchGenerate'
        }
      }
    },
    methods: {
      show(tableNameArr) {
        this.visible = true;
        this.tableNames = tableNameArr;
        // this.$nextTick(() => {
        //   this.form.setFieldsValue({tableNames: tableNameArr})
        // })
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
            formData.tableNames = this.tableNames;
            that.axios.post(this.url.batchGenerate, formData).then((response) => {
              if (response.data.success){
                that.$message.success(response.data.result)
              }else {
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
