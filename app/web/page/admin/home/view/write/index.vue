<template>
  <div>
    <div class="search">
      <el-row class="clear">资源类型：
        <el-select v-model="r_name" placeholder="请选择">
          <el-option v-for="item in rd_list" :key="item.name" :label="item.name" :value="item.name"></el-option>
        </el-select>
        <el-button class="add-button" type="success" icon="el-icon-document" @click="submit()">添加资源</el-button>
      </el-row>
    </div>
    <div class="editor-container" v-if="isShowEditor">
      <!-- <markdown-editor
        id="contentEditor"
        ref="contentEditor"
        v-model="resource.content"
        :height="500"
        :zIndex="20"
      ></markdown-editor>-->
      <keep-alive>
        <el-form ref="form" :model="resource" label-width="150px">
          <el-form-item label="资源键值">
            <el-input v-model="resource.key"></el-input>
          </el-form-item>
          <el-form-item v-for="fd in fields" :label="fd">
            <el-input v-model="resource[fd]"></el-input>
          </el-form-item>
        </el-form>
      </keep-alive>
    </div>
  </div>
</template>
<style>
.editor-container {
  width: 100%;
}
</style>
<script type="babel">
import {
  SET_RD_LIST,
  SET_SAVE_RD,
  DELETE_RD
} from "../../store/app/mutation-type";
import { all } from "q";
export default {
  components: {
    MarkdownEditor: () => import("component/MarkdownEditor/index.vue")
  },
  data() {
    return {
      isShowEditor: false,
      r_name: "",
      key: "",
      resource: { type: this.r_name, key: "" },
      rc_list: []
    };
  },
  computed: {},
  methods: {
    markdown2Html() {
      import("showdown").then(showdown => {
        const converter = new showdown.Converter();
        this.resource.html = converter.makeHtml(this.content);
      });
    },
    submit() {
      // this.$store.dispatch(SET_SAVE_ARTICLE, this.resource);
      console.log(this.resource);
      // this.$message(`添加成功`);
    },
    fetchApi(store, json) {
      return store.dispatch(SET_RD_LIST, json);
    },
    onAdd() {
      this.$store.dispatch(SET_SAVE_RD, this.resource_defination);
      this.$message(`添加成功`);
    }
  },
  mounted() {
    this.isShowEditor = true;
  },
  computed: {
    rd_list() {
      return this.$store.state.rdList;
    },
    fields() {
      var self = this,
        fs = "";
      for (let i = 0; i < this.rd_list.length; i++) {
        let rd = this.rd_list[i];

        if (rd.name == this.r_name) {
          fs = rd.fields;
        }

        return rd.fields.split(",");
      }
      alert(fs);
      return fs.split(",");
    }
  },
  beforeMount() {
    // this.$message("beforeMount")
    this.fetchApi(this.$store, this.q);
  }
};
</script>