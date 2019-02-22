<template>
  <div>
    <div class="search">
      <el-row class="clear">
        <label>标题:</label>
        <el-input class="search-input" clearable v-model="q.title" placeholder="图层资源标题"></el-input>
        <label>键值:</label>
        <el-input class="search-input" clearable v-model="q.key" placeholder="图层资源键值"></el-input>
        <label>描述:</label>
        <el-input class="search-input" clearable v-model="q.description" placeholder="图层资源描述"></el-input>
        <el-button class="search-button" type="primary" @click="query()">查询</el-button>
        <el-button
          class="add-button"
          type="success"
          @click="dialogAddVisible = true,mode='add'"
        >添加底图</el-button>
      </el-row>

      <el-dialog width="60%" :title="mode=='add'?'添加资源':'修改资源'" :visible.sync="dialogAddVisible">
        <el-form ref="formadd" :model="basemap">
          <el-form-item label="title" prop="title" :label-width="formLabelWidth">
            <el-input v-model="basemap.title"></el-input>
          </el-form-item>
          <el-form-item label="key" prop="key" :label-width="formLabelWidth">
            <el-input v-model="basemap.key"></el-input>
          </el-form-item>
          <el-form-item label="thumbnail" prop="thumbnail" :label-width="formLabelWidth">
            <el-input v-model="basemap.thumbnail"></el-input>
          </el-form-item>
          <el-form-item label="description" prop="description" :label-width="formLabelWidth">
            <el-input v-model="basemap.description"></el-input>
          </el-form-item>
          <el-form-item label="layers" prop="layers" :label-width="formLabelWidth">
            <edit-table :fields="fields" v-model="basemap.layers"></edit-table>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddVisible = false">关 闭</el-button>
          <el-button v-if="mode=='add'" @click="reset()">重 置</el-button>
          <el-button v-if="mode=='add'" type="primary" @click="write()">添 加</el-button>
          <el-button v-if="mode=='update'" type="primary" @click="update()">修 改</el-button>
        </div>
      </el-dialog>
    </div>
    <el-table
      :data="basemapList"
      v-loading="loading"
      element-loading-text="拼命加载中"
      border
      style="width: 100%;"
    >
      <!-- <el-table-column
          type="selection"
          width="55">
      </el-table-column>-->
      <el-table-column prop="title" label="标题">
        <!-- <template slot-scope="props">
            <router-link :to="'/article/detail/'+ props.row.id">{{props.row.title}}</router-link>
        </template>-->
      </el-table-column>

      <el-table-column prop="key" label="键值"></el-table-column>
      <el-table-column prop="description" label="描述">
        <template slot-scope="props">{{props.row.description}}</template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="props">
          <router-link :to="{params: {id: props.row.id}}" tag="span">
            <el-button
              type="info"
              size="small"
              icon="edit"
              @click="handleEdit(props.$index, props.row)"
            >查看|修改</el-button>
          </router-link>
          <el-button
            type="danger"
            size="small"
            icon="delete"
            @click="handleDelete(props.$index, props.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 16px">
      <!-- <div style="float:left">
           <el-button
            type="danger"
            icon="delete"
            size="small"
            :disabled="batchSelectArray.length === 0"
            @click="batchDel"
            slot="handler">
            <span>批量删除</span>
        </el-button>
      </div>-->
      <div style="float:right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="q.pageIndex"
          :page-sizes="[10, 15, 20, 50]"
          :page-size="q.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<style>
</style>
<script type="babel">
import EditTable from "../../component/EditTable";
import {
  SET_BASEMAP_LIST,
  DELETE_BASEMAP,
  SET_SAVE_BASEMAP,
  UPDATE_BASEMAP
} from "../../store/app/mutation-type";
export default {
  components: {
    EditTable
  },
  data() {
    return {
      dialogAddVisible: false,
      mode: "add",
      basemapupdate: {},
      basemapadd: {
        title: "",
        description: "",
        key: "",
        thumbnail: "",
        layers: []
      },
      formLabelWidth: "120px",
      q: {
        title: undefined,
        description: undefined,
        key: undefined,
        pageIndex: 1,
        pageSize: 10
      },
      //请求时的loading效果
      loading: false,
      //批量选择数组
      batchSelectArray: []
    };
  },
  methods: {
    fetchApi(store, json) {
      return store.dispatch(SET_BASEMAP_LIST, json);
    },
    query() {
      this.fetchApi(this.$store, this.q);
    },
    write() {
      //添加图层资源
      this.$store.dispatch(
        SET_SAVE_BASEMAP,
        JSON.parse(JSON.stringify(this.basemap))
      );
      this.$message(`添加成功`);
    },
    update() {
      this.$confirm("将修改当前图层资源, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.loading = true;
        this.$store.dispatch(UPDATE_BASEMAP, this.basemap);
        this.loading = false;
        this.$message(`修改成功`);
      });
    },
    reset() {
      this.$refs["formadd"].resetFields();
    },
    handleSelectionChange(val) {
      console.log("handleSelectionChange", val);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.q.pageSize = val;
      this.fetchApi(this.$store, this.q);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.q.pageIndex = val;
      this.fetchApi(this.$store, this.q);
    },
    handleEdit(index, row) {
      this.basemapupdate = row;
      // console.log(row);
      this.mode = "update";
      this.dialogAddVisible = true;
      // this.$message(`你点击了编辑操作 index:${index}, id:${row.id}`);
    },
    handleDelete(index, row) {
      this.$store.dispatch(DELETE_BASEMAP, { id: row.id });
      this.$message(`删除[${row.title}]成功!`);
    },
    //批量选择
    batchSelect(val) {
      this.batchSelectArray = val;
    },
    //批量删除
    batchDel() {
      this.$confirm("将批量删除选择文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.loading = true;
        //todo 执行批量删除
        this.$message.success("删除成功");
        this.loading = false;
      });
    }
  },
  computed: {
    total() {
      return this.$store.state.basemapTotal;
    },
    basemapList() {
      return this.$store.state.basemapList;
    },
    basemap() {
      if ("add" == this.mode) {
        return this.basemapadd;
      }

      if ("update" == this.mode) {
        return this.basemapupdate;
      }
    },
    maplyrList() {
      return this.$store.state.maplyrList;
    },
    fields() {
      let fs = [
        "type",
        "mode",
        "dataType",
        { name: "resourceId", options: [] }
      ];

      this.maplyrList.forEach(l => {
        fs[3].options.push(l.title);
      });

      return fs;
    }
  },
  beforeMount() {
    if (!(this.basemapList && this.basemapList.length > 0)) {
      this.fetchApi(this.$store, this.q);
    }
  }
};
</script>