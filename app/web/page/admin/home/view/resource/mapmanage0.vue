<template>
    <div>
        layers:
        <edit-table :fields="fields" v-model="layers" ></edit-table>
        <el-button @click="onTest"></el-button>
    </div>
</template>
<script>
import EditTable from '../../component/EditTable'
export default {
    data(){
        return {
           
            fields:['type','mode','dataType',{name:"resourceId", options:['f1','f2']}],
            size:3,
            layers:[]
        }
    },
    components:{
        EditTable
    },
   beforeMount(){
   
   },
   methods:{
   
       onTest(){
        //    alert(this.result.length)
           console.log(this.layers)
           alert(this.fields.length)
       }
   },
   computed:{
    
   }
    
}
</script>
