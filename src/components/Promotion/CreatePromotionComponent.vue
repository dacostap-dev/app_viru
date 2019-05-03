<template>
    <div>
      <b-col cols="7">
        <b-form class="m-3"  @submit.prevent="postPromotions">
          <b-form-group label-cols="4" label-cols-lg="2" label="Nombre:">
            <b-form-input type="text" required
                          name="name"
                          v-model="nombre"
                          placeholder="Ingresa el nombre de la promoción">
            </b-form-input>
          </b-form-group>

          <b-form-group label-cols="4" label-cols-lg="2" label="Fecha:">
            <b-form-input type="text" 
                          name="text"
                          placeholder="Ingresa el año">
            </b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
    
        </b-form>
      
      </b-col>
    </div>
</template>
<script>
export default {
    data(){
      return {
         nombre: ''
      }
    },
    methods:{
      postPromotions(){
                this.$store.dispatch('postPromotions', {name: this.nombre});
                console.log('oshe si')
      }
    }
}
</script>