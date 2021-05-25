import Vue from 'vue'

export const Base = {
  data() {
    return {
      params: {},
      dataSource: [],
      pagination: {
        pageNo: 1,
        pageSize: 10,
        total:0,
        current:1
      },
      selectedRowKeys: []
    }
  },
  created() {
    this.loadData()
  },
  computed: {},
  methods: {
    // 加载数据
    loadData(i) {
      if (!this.url.list) {
        this.$message.error("找不到请求数据的链接!")
        return;
      }
      this.params.pageNo = this.pagination.current;
      this.params.pageSize = this.pagination.pageSize;
      if (i){
        this.params.pageNo = 1;
      }
      this.axios.get(this.url.list, {params: this.params}).then((response) => {
        if ((this.dataSource = response.data.result.records) !== undefined){
          this.pagination.total = response.data.result.total;
          this.pagination.current = response.data.result.current;
        }else {
          this.dataSource = response.data.result;
        }
      })
    },

    onSelectChange() {
    },

    tablePageChange(pagination, filters, sorter){
      this.pagination = pagination;
      this.loadData();
    }
  }
}
