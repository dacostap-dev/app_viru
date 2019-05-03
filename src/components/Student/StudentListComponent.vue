<template>

  <div>
    <b-container>
      <b-row>

        <b-input-group>
            <b-form-input @keyup.enter="filter()" type="text" v-model="search" placeholder="Buscador..">
            </b-form-input>
          <b-input-group-append>
            <b-button @click ="filter()" variant="outline-secondary">Button</b-button>
          </b-input-group-append>
        </b-input-group>

      </b-row>

      <b-row class="mt-2">

         <b-list-group >

             <Student v-for="stu in students" :key="stu.id" :stu="stu">
             </Student>   
      
        </b-list-group>

     
      </b-row>
    </b-container>

  </div>

</template>
<script>
import {mapState} from "vuex";
import Student from "@/components/Student/StudentComponent.vue";

export default {
    data(){
      return{
        search: ''
      }
    },
    components: {
        Student
    },
    mounted(){
        this.$store.commit('ModulsList', '')
    },
    computed:{
        ...mapState(['promotionSelected','students'])    
    },
      methods:{
    filter(){
      this.$store.dispatch('getStudentsFiltered', {id:this.promotionSelected.id, name:this.search});
    }
  }
}
</script>