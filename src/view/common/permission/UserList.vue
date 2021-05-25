<template>
  <div class="quick-page">
    <a-card>
      <!--      <div class="quick-table-operate">-->
      <!--        <a-row :guiter="24">-->
      <!--          <a-col :span="7">-->
      <!--            <a-input-search-->
      <!--              placeholder="请输入表名"-->
      <!--              allowClear-->
      <!--              enter-button-->
      <!--              size="large"-->
      <!--              @search="onSearch"></a-input-search>-->
      <!--          </a-col>-->
      <!--          <a-col :span="2" :offset="1">-->
      <!--            <a-button type="primary" size="large" icon="code" @click="generateCode">生成代码</a-button>-->
      <!--          </a-col>-->
      <!--        </a-row>-->
      <!--      </div>-->
      <a-table
        :columns="columns"
        :data-source="dataSource"
        bordered
        :pagination="pagination"
        rowKey="id"
        @change="tablePageChange"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        class="quick-table">

      </a-table>
    </a-card>
  </div>
</template>

<script>

  import {Base} from "../../../sys/js/Base";

  export default {
    name: "UserList",
    mixins: [Base],
    data() {
      return {
        columns: [
          {
            title: '编号',
            dataIndex: 'id',
            align: "center"
          },
          {
            title: '姓名',
            dataIndex: 'name',
            align: "center"
          },
          {
            title: '年龄',
            dataIndex: 'age',
            align: "center"
          },
          {
            title: '联系方式',
            dataIndex: 'phone',
            align: "center",
            customRender: function (text) {
              return (text == null || text === '') ? '-' : text;
            }
          },
          {
            title: '性别',
            dataIndex: 'sex',
            align: "center",
            customRender: function (text) {
              return (text == null || text === '') ? '-' : (text === 1 ? '男' : '女');
            }
          }
        ],
        url: {
          list: '/permission/user/list'
        }
      }
    }
  }
</script>

<style scoped>

</style>
