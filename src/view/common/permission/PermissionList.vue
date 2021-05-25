<template>
  <div class="quick-page">
    <a-card>
      <div class="quick-table-operate">
        <a-row :guiter="24">
          <a-col :span="2">
            <a-button type="primary" size="large" icon="plus" @click="add">新增菜单</a-button>
          </a-col>
        </a-row>
      </div>
      <a-table
        :columns="columns"
        :data-source="dataSource"
        bordered
        :pagination="false"
        rowKey="id"
        :scroll="{y: true}"
        class="quick-table">

        <template slot="operate" slot-scope="text, record, index">
          <span>
            <a @click="edit(record)">编辑</a>
            <a @click="del(record.id)" style="margin-left: 10px">删除</a>
          </span>
        </template>

      </a-table>
    </a-card>
    <permission-modal ref="permissionModal" @ok="reload"></permission-modal>
  </div>
</template>

<script>

  import {Base} from "../../../sys/js/Base";
  import '@/assets/main.css';
  import PermissionModal from "./modal/PermissionModal"

  export default {
    name: "PermissionList",
    mixins: [Base],
    components: {
      PermissionModal
    },
    data() {
      return {
        columns: [
          {
            title: '菜单名',
            dataIndex: 'title',
            align: "left"
          },
          {
            title: '路径',
            dataIndex: 'path',
            align: "left"
          },
          {
            title: '组件名',
            dataIndex: 'component',
            align: "left",
          },
          {
            title: '类型',
            dataIndex: 'type',
            align: 'left',
            customRender: function (text) {
              if (text === 1) {
                return '菜单'
              }
            }
          },
          {
            title: '操作',
            dataIndex: 'operate',
            scopedSlots: {customRender: 'operate'},
          }
        ],
        url: {
          list: '/permission/permission/list',
          delete: '/permission/permission/delete'
        }
      }
    },
    methods: {
      add() {
        this.$refs.permissionModal.add();
      },
      edit(record) {
        this.$refs.permissionModal.edit(record);
      },
      del(id) {
        var that = this;
        this.$confirm({
          title: "确认删除",
          content: "是否删除选中数据?",
          okText:'确认',
          cancelText: '取消',
          onOk: function () {
            that.axios.delete(that.url.delete, {params: {id:id}}).then((response) => {
              if (response.data.success) {
                that.$message.success(response.data.result)
              } else {
                that.$message.error(response.data.result)
              }
              that.loadData(1);
            })
          }
        });

      },
      reload(){
        this.loadData(1);
      }
    }
  }
</script>

<style scoped>

</style>

