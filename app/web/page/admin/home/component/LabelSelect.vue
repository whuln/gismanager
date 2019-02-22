<template>
  <div v-bind:result="result">
    <el-tag type="info" size="large">{{content.name}}</el-tag>
    <el-select filterable allow-create @change="onChange" v-model="value">
       <el-option             
              v-for="opt in content.options"
              :key="opt"
              :label="opt"
              :value="opt"
            ></el-option>
    </el-select>
  </div>
</template>
<script>
export default {
    data(){
        return {
             value:""
        }
    },
  model: {
    prop: "result",
    event: "change"
  },
  props: { content:Object, result: String },
  beforeMount() {
    this.$on("change", val => {
      return val;
    });

    this.value = this.result;
  },
  methods:{
      onChange(val){
          this.$emit("change",val);
      }
  } 
};
</script>

