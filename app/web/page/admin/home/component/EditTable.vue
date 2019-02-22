<template>
  <div v-bind:result="result">
    <el-button @click="onAdd">+</el-button>
    <el-button @click="onDelete">-</el-button>
    <div v-if="show">
      <el-row v-for="i in size">
        <el-col :span="colspan" v-for="f in fields">
          <el-input v-if="typeof(f) == 'string'" size="medium" v-model="result[i-1][f]">
            <span slot="prepend">{{f}}</span>
          </el-input>
          <!-- <el-select 
            filterable
            allow-create
            v-if="typeof(f) == 'object'"
            v-model="result[i-1][f.name]"           
          >           
            <el-option
              style="text-align:right;"
              v-for="opt in f.options"
              :key="opt"
              :label="opt"
              :value="opt"
            ></el-option>
          </el-select>-->
          <label-select v-if="typeof(f) == 'object'" :content="f" v-model="result[i-1][f.name]"/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import LabelSelect from "./LabelSelect.vue";
export default {
  model: {
    prop: "result",
    event: "change"
  },
  props: { fields: Array, result: Array },
  data() {
    return {
      size0: 1,
      querysugg: {}
    };
  },
  components: { LabelSelect },
  beforeMount() {

    if (this.result.length == 0) {
      for (let i = 0; i < this.size0; i++) {
        this.result.push({});
      }
    }

    this.$on("change", fs => {
      return fs;
    });
  },
  methods: {
    onAdd() {
      this.result.push({});
      this.size++;
    },
    onDelete() {
      this.result.pop();
      this.size--;
    },
    onInput() {
      this.$emit("change", this.result);
    }
  },
  computed: {
    show() {
      return this.result.length > 0;
    },
    colspan() {
      return 24 / (this.fields.length + 1);
    },
    size(){
      return this.result.length == 0 ? this.size0 : this.result.length;
    }
  }
};
</script>
