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
      <b-row>
        <b-col cols="">
          <b-card-group class="mt-4" columns>
            <Promotion v-for="promo in promotions" :key="promo.id" :promo="promo">
            </Promotion>
          </b-card-group> 
        </b-col>   
      </b-row>
    </b-container>

  </div>
  

</template>

<script>
import {mapState} from "vuex";
import Promotion from "@/components/Promotion/PromotionComponent.vue";


export default {
   name: 'home',
   data(){
     return{
       search: ''
     }
   },
   components: {
    Promotion
  },
  mounted(){
    this.$store.dispatch('getPromotions');
    this.$store.commit('StudentsList', '')
    },
  methods:{
    filter(){
      this.$store.dispatch('getPromotionsFiltered', this.search);
    }
  },
  computed:{
       ...mapState(['promotions']),

  }
}
</script>
