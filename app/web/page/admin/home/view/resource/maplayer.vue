<template>
  <div>
      <div class="search">
        <el-row class="clear">
              <label> 标题:</label><el-input class="search-input" clearable v-model="q.title" placeholder="图层资源标识"></el-input>
              <label> 描述:</label><el-input class="search-input" clearable v-model="q.description" placeholder="图层资源描述"></el-input>
              <label> 链接:</label><el-input class="search-input" clearable v-model="q.url" placeholder="图层资源url"></el-input>
              <el-button class="search-button" type="primary" @click="query()">查询</el-button>
              <el-button class="add-button" type="success" @click="dialogAddVisible = true,mode='add'">添加图层</el-button>
        </el-row>

        
        <el-dialog :title="mode=='add'?'添加资源':'修改资源'" :visible.sync="dialogAddVisible">
          <el-form ref="formadd" :model="maplayer">
            <el-form-item label="title"  prop="title" :label-width="formLabelWidth">
              <el-input v-model="maplayer.title" ></el-input>
            </el-form-item>
            <el-form-item label="version" prop="version" :label-width="formLabelWidth">
              <el-input v-model="maplayer.version" ></el-input>
            </el-form-item>
            <el-form-item label="category" prop="category" :label-width="formLabelWidth">
              <el-input v-model="maplayer.category" ></el-input>
            </el-form-item>
            <el-form-item label="description" prop="description" :label-width="formLabelWidth">
              <el-input v-model="maplayer.description" ></el-input>
            </el-form-item>
             <el-form-item label="url" prop="url" :label-width="formLabelWidth">
              <el-input v-model="maplayer.url" ></el-input>
            </el-form-item>
             <el-form-item label="serviceType" prop="serviceType" :label-width="formLabelWidth">
              <el-input v-model="maplayer.serviceType" ></el-input>
            </el-form-item>
             <el-form-item label="capabilities" prop="capabilities" :label-width="formLabelWidth">
              <el-input v-model="maplayer.capabilities" ></el-input>
            </el-form-item>
             <el-form-item label="wkid" prop="wkid" :label-width="formLabelWidth">
              <el-input v-model="maplayer.wkid" ></el-input>
            </el-form-item>
            <el-form-item label="minZoom" prop="minZoom" :label-width="formLabelWidth">
              <el-input v-model="maplayer.minZoom" ></el-input>
            </el-form-item>
            <el-form-item label="maxZoom" prop="maxZoom" :label-width="formLabelWidth">
              <el-input v-model="maplayer.maxZoom" ></el-input>
            </el-form-item>
            extent:
            <el-form-item label="xMin" prop="extent.xMin" :label-width="formLabelWidth">
                 <el-input v-model="maplayer.extent.xMin" ></el-input>
            </el-form-item>
            <el-form-item label="yMin" prop="extent.yMin"  :label-width="formLabelWidth">
                 <el-input v-model="maplayer.extent.yMin" ></el-input>
            </el-form-item>
            <el-form-item label="xMax" prop="extent.xMax"  :label-width="formLabelWidth">
                 <el-input v-model="maplayer.extent.xMax" ></el-input>
            </el-form-item>
            <el-form-item label="yMax" prop="extent.yMax"  :label-width="formLabelWidth">
                 <el-input v-model="maplayer.extent.yMax" ></el-input>
            </el-form-item>
            <el-form-item label="wkid" :label-width="formLabelWidth">
                 <el-input v-model="maplayer.extent.wkid" ></el-input>
            </el-form-item>
            publishInfo:
            <el-form-item label="author" prop="publishInfo.author" :label-width="formLabelWidth">
                 <el-input v-model="maplayer.publishInfo.author" ></el-input>
            </el-form-item>
            <el-form-item label="date" prop="publishInfo.date" :label-width="formLabelWidth">                
                 <el-date-picker
                  v-model="maplayer.publishInfo.date"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="server" prop="publishInfo.server" :label-width="formLabelWidth">
                 <el-input v-model="maplayer.publishInfo.server" ></el-input>
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
        :data="maplyrList"
        v-loading="loading"
        element-loading-text="拼命加载中"
        border
      
        style="width: 100%;">
        <!-- <el-table-column
          type="selection"
          width="55">
        </el-table-column> -->
        <el-table-column
          prop="title"
          label="标题">
          <!-- <template slot-scope="props">
            <router-link :to="'/article/detail/'+ props.row.id">{{props.row.title}}</router-link>
          </template> -->
        </el-table-column>
        
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>  
        <el-table-column
          prop="url"
          label="链接">
           <template slot-scope="props">
           {{props.row.url}}
          </template>
        </el-table-column> 
        <el-table-column
          label="操作"
          width="180">
          <template slot-scope="props">
            <router-link :to="{params: {id: props.row.id}}" tag="span">
              <el-button type="info" size="small" icon="edit" @click="handleEdit(props.$index, props.row)">查看|修改</el-button>
            </router-link>
            <el-button type="danger" size="small" icon="delete" @click="handleDelete(props.$index, props.row)">删除</el-button>
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
        </div> -->
        <div style="float:right">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="q.pageIndex"
              :page-sizes="[10, 15, 20, 50]"
              :page-size="q.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
        </div>
      </div>
  </div>
</template>
<style>

</style>
<script type="babel">
import { SET_MAPLAYER_LIST, DELETE_MAPLAYER, SET_SAVE_MAPLAYER, UPDATE_MAPLAYER } from '../../store/app/mutation-type';
export default {
  components: {},
  data() {
    return {      
      dialogAddVisible:false,
      mode: 'add',
      maplayerupdate:{},
      maplayeradd: {
          title: "",
          version: "1.0.0",
          category: "地图服务",
          description: "",
          url: "",
          serviceType: "MapService",
          capabilities: ["WMS", "WTMS"],
          wkid: 4490,
          extent: { xMin:  95, yMin: 32, xMax: 120, yMax: 42, wkid: 4490 },
          minZoom: 6,
          maxZoom: 12,
          publishInfo: {
              author: "HHCH",
              date: "",
              server: "ArcGIS Server"
          }
        },
        formLabelWidth: '120px',
      q: {
        title: undefined,
        description: undefined,
        url: undefined,
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
      return store.dispatch(SET_MAPLAYER_LIST, json);
    },
    query() {
      this.fetchApi(this.$store, this.q);
    },
    write() {
      //添加图层资源
      this.$store.dispatch(SET_SAVE_MAPLAYER, JSON.parse(JSON.stringify(this.maplayer)));
      this.$message(`添加成功`);
    },
    update(){
      this.$confirm("将修改当前图层资源, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.loading = true;
        this.$store.dispatch(UPDATE_MAPLAYER, this.maplayer);
        this.loading = false;
        this.$message(`修改成功`);
      });
    },
    reset(){
       this.$refs['formadd'].resetFields();
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
      this.maplayerupdate = row;
      console.log(row)
      this.mode = 'update';
      this.dialogAddVisible = true;
      // this.$message(`你点击了编辑操作 index:${index}, id:${row.id}`);
    },
    handleDelete(index, row) {
      this.$store.dispatch(DELETE_MAPLAYER, { id: row.id });
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
      return this.$store.state.maplyrTotal;
    },
    maplyrList() {
      return this.$store.state.maplyrList;
    },
     maplayer(){
       if('add' == this.mode){
         return this.maplayeradd;
       }

       if('update' == this.mode){
         return this.maplayerupdate;
       }
       
     }
  },
  beforeMount() {
    if (!(this.maplyrList && this.maplyrList.length > 0)) {
      this.fetchApi(this.$store, this.q);
    }
  }
};
</script>