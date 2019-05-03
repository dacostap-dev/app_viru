<template>
    <div>
    <b-card @click="selectPromotion"
      header="Promoción"
      header-text-variant="white"
      header-tag="header"
      header-bg-variant="primary"
      footer-tag="footer"
      footer-bg-variant="info"
      footer-text-variant="white"
      footer-border-variant="dark"
      :title="promo.name"
      style="max-width: 20rem;"
    >
    <b-card-text>
      
    </b-card-text>
     <a  @click.stop="showModal()" slot="footer">Editar <i class="fas fa-edit"></i> </a>
    </b-card>


      <b-modal 
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      ref="modal_update" centered title="Editar Promoción">
         <b-form class="m-3"  ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group label-cols="4" label-cols-lg="2" label="Nombre:">
            <b-form-input type="text" required
                          name="name"
                          :state="nameState"
                          v-model="nombre"
                          placeholder="Ingresa el nombre de la promoción">
            </b-form-input>
          </b-form-group>
        </b-form>
      </b-modal>
    


    </div>


    
</template>
<script>

export default {
    data(){
      return{
        nombre:'',
        nameState: null,
      }
    },
    props: ['promo'],
    methods: {
      selectPromotion(){
      console.log(this.promo.id)
      this.$router.push('/promotions/'+ this.promo.id);
      this.$store.dispatch('getStudents', this.promo)
      },
      showModal() {
       this.$refs['modal_update'].show()
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }

        //Axios update
       console.log( {id: this.promo.id, name: this.nombre});
       this.$store.dispatch('updatePromotion', {id: this.promo.id, name: this.nombre})

         this.$nextTick(() => {
         this.$refs.modal_update.hide()
        })
      },    
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid ? 'valid' : 'invalid'
        return valid
      },
      resetModal() {
        this.nombre = ''
        this.nameState = null
      }

    }
}

</script>