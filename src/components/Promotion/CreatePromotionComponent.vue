<template>
    <div>
      <b-card class="h-100 mt-3">

      <h4 class="lead">Datos de la Promoción:</h4>
          <b-row align-h="center"> 
            <b-col cols="9">
              <b-form class="m-2"  @submit.prevent="postPromotions">
                <b-form-group label-cols="6" label-cols-lg="2" label="Nombre:">
                  <b-form-input type="text" required
                                name="name"
                                v-model="nombre"
                                placeholder="Ingresa el nombre de la promoción">
                  </b-form-input>
                </b-form-group>

                <b-button type="submit" :disabled='btn' variant="secondary">Crear Promoción</b-button>
          
              </b-form>
            
            </b-col>
          </b-row>
  
     </b-card>
   

    </div>
</template>
<script>
export default {
    data(){
      return {
         nombre: '',
         btn: false
      }
    },
    methods:{
      postPromotions(){
                this.btn = true
                this.$store.dispatch('postPromotions', {name: this.nombre}).then(()=>{
                       this.$bvModal.msgBoxOk(`Se registró la Promoción ${this.nombre}`, {
                        title: 'Confirmación',
                        size: 'sm',
                        buttonSize: 'sm',
                        okVariant: 'success',
                        headerClass: 'p-2 border-bottom-0',
                        footerClass: 'p-2 border-top-0',
                        centered: true
                      })
                this.btn = false
                this.nombre = ''
                });
              
      }
    }
}
</script>