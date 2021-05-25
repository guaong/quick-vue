<template>
  <div class="quick-page">
    <a-card>
      <div class="quick-table-operate">
        <a-row :guiter="24">
          <a-col :span="7">
            <a-input-search
              placeholder="请输入表名"
              allowClear
              enter-button
              size="large"
              @search="onSearch"></a-input-search>
          </a-col>
          <a-col :span="2" :offset="1">
            <a-button type="primary" size="large" icon="code" @click="generateCode">生成代码</a-button>
          </a-col>
        </a-row>
      </div>
      <a-table
        :columns="columns"
        :data-source="dataSource"
        bordered
        :scroll="{y:600}"
        :pagination="false"
        rowKey="tableName"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        class="quick-table">

      </a-table>
    </a-card>
    <auto-generate-modal ref="autoGenerateModal" @ok="clearChecked"/>
  </div>
</template>

<script>
  import '@/assets/main.css';
  import AutoGenerateModal from './modal/AutoGenerateModal'

  export default {
    name: "AutoGenerate.vue",
    components:{
      AutoGenerateModal
    },
    created() {
      this.loadData();
    },
    data() {
      return {
        columns: [
          {
            title: '表名',
            dataIndex: 'tableName',
            align: "left"
          }, {
            title: '所属数据库',
            dataIndex: 'tableCat',
            align: "left"
          }, {
            title: '注释',
            dataIndex: 'remark',
            align: "left",
            customRender: function (text) {
              return (text == null || text === '') ? '-' : text;
            }
          }],
        url: {
          getTables: 'http://localhost:8080/quick/quick/getTables',
        },
        dataSource: [],
        search: undefined,
        params:{},
        selectedRowKeys: [],
      };
    },
    methods: {
      loadData() {
        this.axios.get(this.url.getTables,{params:this.params}).then((response) => {
          this.dataSource = response.data.result
        })
      },
      onSelectChange(selectedRowKeys) {
        this.selectedRowKeys = selectedRowKeys;
      },
      onSearch(value){
        this.search = value;
        this.params.search = this.search;
        this.loadData();
      },
      generateCode(){
        if (!this.checkSelected()) return;
        // 弹出弹窗
        this.$refs.autoGenerateModal.show(this.selectedRowKeys);
      },
      checkSelected(){
        if (this.selectedRowKeys.length === 0){
          this.$message.warn("请至少选择一条数据!");
          return false;
        }
        return true;
      },
      clearChecked(){
        this.selectedRowKeys = []
      }
    }
  }
</script>

<style scoped>

</style>
