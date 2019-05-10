<template>

  <div>
    <b-container>
      <h1 class="display-5 text-left ml-4">Promoción: {{promotionSelected.name}} </h1>
      <b-row align-h="center">

        <b-input-group style="width: 41rem;">
            <b-form-input @keyup.enter="filter()" type="text" v-model="search" placeholder="Buscador..">
            </b-form-input>
          <b-input-group-append>
            <b-button @click ="filter()" variant="outline-secondary">Button</b-button>
          </b-input-group-append>
        </b-input-group>

      </b-row>
      <b-row class="mt-2 ml-4">
        <b-button  @click="showModal" variant="outline-primary">Añadir nuevo alumno <i class="fas fa-plus-square"></i></b-button>
      </b-row>

      <b-row class="mt-2 justify-content-md-center">

         <b-list-group style="width: 40rem;">

             <Student v-for="stu in students" :key="stu.id" :stu="stu">
             </Student>   
      
        </b-list-group>

      </b-row>

         <b-modal 
          @show="resetModal"
          @hidden="resetModal"
          @ok="handleOk"
          ref="student_register" centered title="Agregar Alumno">
            <b-form class="m-3"  ref="form" @submit.stop.prevent="handleSubmit">

              <b-form-group label-align="left" label-cols="4" label-cols-lg="3" label="Nombre:">
              <b-form-input  v-model="nombre" :state="nameState" required></b-form-input>
              </b-form-group>

               <b-form-group label-align="left" label-cols="4" label-cols-lg="3" label="Apellidos:">
              <b-form-input  v-model="apellido" :state="apellidoState" required></b-form-input>
              </b-form-group>

               <b-form-group label-align="left" label-cols="4" label-cols-lg="3" label="Email:">
              <b-form-input  v-model="email" type="email" :state="emailState" required></b-form-input>
              </b-form-group>

               <b-form-group  label-align="left" label="Género:">
                <b-form-radio-group required
                    v-model="genero"
                    :state="generoState"
                    :options="options"
                    name="radio-inline"
                ></b-form-radio-group>
              </b-form-group>

              
            </b-form>
          </b-modal>
          
    </b-container>

  </div>

</template>
<script>
import {mapState} from "vuex";
import Student from "@/components/Student/StudentComponent.vue";

export default {
    data(){
      return{
        search: '',
        nombre: '',
        apellido: '',
        nombreCompleto: '',
        email: '',
        genero : '',
        nameState: null,
        apellidoState: null,
        emailState: null,
        generoState: null,

          options: [
                {text: 'Hombre', value: 'male'},
                {text: 'Mujer', value: 'female'},
            ]
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
      },
      showModal(){
        this.$refs['student_register'].show()
      },
      handleOk(bvModalEvt) {
        this.nameState = null
        this.apellidoState = null
        this.emailState = null
        this.generoState = null
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        this.nombreCompleto = this.apellido + ' ' + this.nombre 
        this.$store.dispatch('postStudent', {name: this.nombreCompleto, email: this.email, genero: this.genero, promotion_id: this.promotionSelected.id})

        
        this.$nextTick(() => {
         this.$refs.student_register.hide()
        })
      },
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        console.log(valid)
        if(this.nombre==''){
          this.nameState = valid 
        }
      
        if(this.apellido==''){
          this.apellidoState = valid 
        }

        if(this.email==''){
          this.emailState = valid 
        }
       
        if(this.genero==''){
          this.generoState = valid 
        }
        return valid
      },
      resetModal() {
        this.nombre = ''
        this.nameState = null
        this.apellido = ''
        this.apellidoState = null
        this.email = ''
        this.emailState = null
        this.genero = ''
        this.generoState = null
      }
  }
}
</script>



