<template>
    <div>
      <h4>Datos de la Promoción:</h4>
      <b-row align-h="center"> 
        <b-col cols="9">
          <b-form class="m-2"  @submit.prevent="postPromotions">
            <b-form-group label-cols="6" label-cols-lg="3" label="Nombre:">
              <b-form-input type="text" required
                            name="name"
                            v-model="nombre"
                            placeholder="Ingresa el nombre de la promoción">
              </b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Crear</b-button>
      
          </b-form>
        
        </b-col>
      </b-row>

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