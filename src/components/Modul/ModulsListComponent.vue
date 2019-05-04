<template>
    <div>
      <b-container>
      <b-row>
        <b-button @click="showModal()" variant="outline-primary">Añadir nuevo modulo</b-button>
      </b-row>

       <b-row>
          <b-card-group class="mt-4" columns>
            <Modul v-for="modul in moduls" :key="modul.id" :modul="modul" />
          </b-card-group> 
      </b-row>
   
         <b-modal 
          @show="resetModal"
          @hidden="resetModal"
          @ok="handleOk"
          ref="modul_register" centered title="Agregar Modulo">
            <b-form class="m-3"  ref="form" @submit.stop.prevent="handleSubmit">
              <b-form-group label-cols="4" label-cols-lg="2" label="Nombre:">
              <b-form-select v-model="nombre" :state="nameState" :options="options"></b-form-select>
              </b-form-group>
            </b-form>
          </b-modal>
          
      </b-container>
      
    </div>
</template>
<script>
import Modul from "@/components/Modul/ModulComponent.vue";
import {mapState} from "vuex";
export default {
    props:['name'],
    components:{
      Modul
    },
    data(){
      return{
        nombre: null,
        nameState: null,
          options: [
          { value: null, text: 'Seleccione un Modulo' },
          { value: 'Modulo 1', text: 'Modulo 1' },
          { value: 'Modulo 2', text: 'Modulo 2' },
          { value: 'Modulo 3', text: 'Modulo 3' },
          { value: 'Modulo 4', text: 'Modulo 4' },
          { value: 'Modulo 5', text: 'Modulo 5' },
        ]
      }
    },
    methods:{
      showModal(){
        this.$refs['modul_register'].show()
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

        this.$store.dispatch('postModul', {name: this.nombre, student: this.studentSelected.id})
        
        this.$nextTick(() => {
         this.$refs.modul_register.hide()
        })
      },
      checkFormValidity() {
        if(this.nombre == null){
          return false
        }else{
          return true
        }
      },
      resetModal() {
        this.nombre = null
        this.nameState = null
      }

    },
    computed: {
        ...mapState(['moduls', 'studentSelected'])
    }
}
</script>