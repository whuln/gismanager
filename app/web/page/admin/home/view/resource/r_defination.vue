<template>
  <div>
    <fieldset>
      <legend>添加资源定义</legend>
      <el-form ref="form_rd" :model="resource_defination" label-width="80px" size="mini">
        <el-form-item label="资源类名">
          <el-input v-model="resource_defination.name"></el-input>
        </el-form-item>
        <el-tooltip class="item" effect="dark" content="多个字段用','(英文半角)隔开" placement="bottom">
          <el-form-item label="资源字段">
            <el-input v-model="resource_defination.fields"></el-input>
          </el-form-item>
        </el-tooltip>
        <el-form-item size="mini">
          <el-button type="primary" @click="onAdd">创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </fieldset>
    <fieldset >
      <legend>查看资源定义</legend>
      <el-table
      :data="rd_list"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="资源类名"
        width="280">
      </el-table-column>
      <el-table-column
        prop="fields"
        label="资源字段"
       >
      </el-table-column>    
    </el-table>
    </fieldset>
  </div>
</template>
<script type="babel">
import { SET_RD_LIST,SET_SAVE_RD, DELETE_RD } from '../../store/app/mutation-type';
export default {
  data() {
    return {
      resource_defination: {
        name: "",
        fields: ""
      }, //第一个字符串是资源名，后续为资源字段。
      q:{
        resource_name:"",
        pageIndex: 1,
        pageSize: 100
      },
      rds: {},
      tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
    };
  },
  methods: {
    fetchApi(store, json) {
      return store.dispatch(SET_RD_LIST, json);
    },
    onAdd() {
      this.$store.dispatch(SET_SAVE_RD, this.resource_defination);
      this.$message(`添加成功`);
    }
  },
  computed:{
    rd_list() {
      return this.$store.state.rdList;
    }
  },
  beforeMount(){
    // this.$message("beforeMount")
    this.fetchApi(this.$store, this.q);
   
  }
};
</script>
 <style scoped>
.el-icon-my-export {
  font-size: 16px;
}
.el-icon-my-export:before {
  content: "\e611";
}
</style>
