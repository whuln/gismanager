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
        >添加地图</el-button>
      </el-row>

      <el-dialog width="60%" :title="mode=='add'?'添加资源':'修改资源'" :visible.sync="dialogAddVisible">
        <el-form ref="formadd" :model="map">
          <el-form-item label="title" prop="title" :label-width="formLabelWidth">
            <el-input v-model="map.title"></el-input>
          </el-form-item>
          <el-form-item label="key" prop="key" :label-width="formLabelWidth">
            <el-input v-model="map.key"></el-input>
          </el-form-item>
          <el-form-item label="thumbnail" prop="thumbnail" :label-width="formLabelWidth">
            <el-input v-model="map.thumbnail"></el-input>
          </el-form-item>
          <el-form-item label="description" prop="description" :label-width="formLabelWidth">
            <el-input v-model="map.description"></el-input>
          </el-form-item>
          <el-form-item label="initZoom" prop="initZoom" :label-width="formLabelWidth">
            <el-input v-model="map.initZoom"></el-input>
          </el-form-item>
          <el-form-item label="minZoom" prop="minZoom" :label-width="formLabelWidth">
            <el-input v-model="map.minZoom"></el-input>
          </el-form-item>
          <el-form-item label="maxZoom" prop="maxZoom" :label-width="formLabelWidth">
            <el-input v-model="map.maxZoom"></el-input>
          </el-form-item>
          <el-form-item label="suitableMaxZoom" prop="suitableMaxZoom" :label-width="formLabelWidth">
            <el-input v-model="map.suitableMaxZoom"></el-input>
          </el-form-item>
          <el-form-item label="defaultBasemap" prop="defaultBasemap" :label-width="formLabelWidth">
            <el-input v-model="map.defaultBasemap"></el-input>
          </el-form-item>
          <el-form-item label="supportView" prop="supportView" :label-width="formLabelWidth">
            <el-input v-model="map.supportView"></el-input>
          </el-form-item>
           fullExtent:
            <el-form-item label="xMin" prop="fullExtent.xMin" :label-width="formLabelWidth">
                 <el-input v-model="map.fullExtent.xMin" ></el-input>
            </el-form-item>
            <el-form-item label="yMin" prop="fullExtent.yMin"  :label-width="formLabelWidth">
                 <el-input v-model="map.fullExtent.yMin" ></el-input>
            </el-form-item>
            <el-form-item label="xMax" prop="fullExtent.xMax"  :label-width="formLabelWidth">
                 <el-input v-model="map.fullExtent.xMax" ></el-input>
            </el-form-item>
            <el-form-item label="yMax" prop="fullExtent.yMax"  :label-width="formLabelWidth">
                 <el-input v-model="map.fullExtent.yMax" ></el-input>
            </el-form-item>
            <el-form-item label="wkid" prop="fullExtent.wkid" :label-width="formLabelWidth">
                 <el-input v-model="map.fullExtent.wkid" ></el-input>
            </el-form-item>
            initExtent:
            <el-form-item label="xMin" prop="initExtent.xMin" :label-width="formLabelWidth">
                 <el-input v-model="map.initExtent.xMin" ></el-input>
            </el-form-item>
            <el-form-item label="yMin" prop="initExtent.yMin"  :label-width="formLabelWidth">
                 <el-input v-model="map.initExtent.yMin" ></el-input>
            </el-form-item>
            <el-form-item label="xMax" prop="initExtent.xMax"  :label-width="formLabelWidth">
                 <el-input v-model="map.initExtent.xMax" ></el-input>
            </el-form-item>
            <el-form-item label="yMax" prop="initExtent.yMax"  :label-width="formLabelWidth">
                 <el-input v-model="map.initExtent.yMax" ></el-input>
            </el-form-item>
            <el-form-item label="wkid" prop="initExtent.wkid" :label-width="formLabelWidth">
                 <el-input v-model="map.initExtent.wkid" ></el-input>
            </el-form-item>
            initPosition:
            <el-form-item label="x" prop="initPosition.x"  :label-width="formLabelWidth">
                 <el-input v-model="map.initExtent.x" ></el-input>
            </el-form-item>
            <el-form-item label="y" prop="initPosition.y"  :label-width="formLabelWidth">
                 <el-input v-model="map.initExtent.y" ></el-input>
            </el-form-item>
            <el-form-item label="wkid" prop="initPosition.wkid" :label-width="formLabelWidth">
                 <el-input v-model="map.initPosition.wkid" ></el-input>
            </el-form-item>
             <el-form-item label="basemaps" prop="basemaps" :label-width="formLabelWidth">
            <edit-table :fields="basemapfields" v-model="map.basemaps"></edit-table>
          </el-form-item>
          <el-form-item label="elevationLayers" prop="elevationLayers" :label-width="formLabelWidth">
            <edit-table :fields="lyrfields" v-model="map.elevationLayers"></edit-table>
          </el-form-item>
          <el-form-item label="thematicRasterLayers" prop="thematicRasterLayers" :label-width="formLabelWidth">
            <edit-table :fields="lyrfields" v-model="map.thematicRasterLayers"></edit-table>
          </el-form-item>
           <el-form-item label="thematicVectorLayers" prop="thematicVectorLayers" :label-width="formLabelWidth">
            <edit-table :fields="lyrfields" v-model="map.thematicVectorLayers"></edit-table>
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
      :data="mapList"
      v-loading="loading"
      element-loading-text="拼命加载中"
      border
      style="width: 100%;"
    >    
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
  SET_MAP_LIST,
  DELETE_MAP,
  SET_SAVE_MAP,
  UPDATE_MAP
} from "../../store/app/mutation-type";
export default {
  components: {
    EditTable
  },
  data() {
    return {
      dialogAddVisible: false,
      mode: "add",
      mapupdate: {},
      mapadd: {
        title: "",
        description: "",
        key: "",
        thumbnail: "",
        initZoom:6,
        minZoom:6,
        maxZoom:12,
        suitableMaxZoom:15,
        defaultBasemap:0,
        supportView:["2d","3d"],
        // 全图范围
        fullExtent: { xMin: 95, yMin: 32, xMax: 120, yMax: 42, wkid: 4490 },
        // 初始范围
        initExtent: { xMin: 95, yMin: 32, xMax: 120, yMax: 42, wkid: 4490 },
        // 初始中心位置
        initPosition: { x: 107.5, y: 53, wkid: 4490 },
        // 地图基础底图
        basemaps: [
            /* 本地地图资源 */
            // { type: "basemap", resourceId: "BM-SL-20181120", title: "黄河矢量底图",  },
            // { type: "basemap", resourceId: "BM-YX-20181120", title: "黄河影像底图" },
            // { type: "basemap", resourceId: "BM-DX-20181120", title: "黄河地形底图" },
            /* 互联网地图资源 */
            // { type: "basemap", resourceId: "BM-TMAP-SL" },
            // { type: "basemap", resourceId: "BM-TMAP-YX" },
            // { type: "basemap", resourceId: "BM-TMAP-DX" },
        ],       
        // 高程图层，三维场景中加载，作为基础高程数据图层使用
        elevationLayers: [

        ],
        // 业务栅格图层，作为业务图层，显示时需插到底图矢量数据和栅格数据之间显示
        thematicRasterLayers: [
           
        ],
        // 业务矢量图层，作为业务图层，显示在所有图层最上面
        thematicVectorLayers: [

        ],
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
      return store.dispatch(SET_MAP_LIST, json);
    },
    query() {
      this.fetchApi(this.$store, this.q);
    },
    write() {
      //添加图层资源
      this.$store.dispatch(
        SET_SAVE_MAP,
        JSON.parse(JSON.stringify(this.map))
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
        this.$store.dispatch(UPDATE_MAP, this.map);
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
      this.mapupdate = row;
      // console.log(row);
      this.mode = "update";
      this.dialogAddVisible = true;
      // this.$message(`你点击了编辑操作 index:${index}, id:${row.id}`);
    },
    handleDelete(index, row) {
      this.$store.dispatch(DELETE_MAP, { id: row.id });
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
      return this.$store.state.mapTotal;
    },
    mapList() {
      return this.$store.state.mapList;
    },
    map() {
      if ("add" == this.mode) {
        return this.mapadd;
      }

      if ("update" == this.mode) {
        return this.mapupdate;
      }
    },
    maplyrList() {
      return this.$store.state.maplyrList;
    },
    lyrfields() {
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
    },
    basemapList() {
      return this.$store.state.basemapList;
    },
    basemapfields() {
      let fs = [
        "type",
        "title",      
        { name: "resourceId", options: [] }
      ];

      this.basemapList.forEach(l => {
        fs[2].options.push(l.key);
      });

      return fs;
    }
  },
  beforeMount() {
    if (!(this.mapList && this.mapList.length > 0)) {
      this.fetchApi(this.$store, this.q);
    }
  }
};
</script>