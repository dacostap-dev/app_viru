<template>
    <div>
        <b-list-group-item class="hover border" @click="selectStudent()">
                <b-row class="" align-h="center">
                    <b-col cols="2" md="2" class="text-center">
                        <b-img v-if="stu.genero === 'female'" src="@/users/avatar-female.png" rounded="circle" width="60" height="60" class="m-1" />
                        <b-img v-else src="@/users/avatar-male.png" rounded="circle" width="60" height="60" class="m-1" />
                    </b-col>
                    <b-col cols="6" align-self="center" class="d-none d-md-block">
                        <p class="mb-1">
                        {{stu.name}}
                        </p>
                    </b-col>
                    <b-col cols="2" align-self="center" class="d-none d-md-block">
                        <b-button  @click.stop="showModal()" variant="outline-primary" class="mb-1"><i class="fas fa-2x fa-edit"></i></b-button>
             
                    </b-col>
                      <b-col cols="1" align-self="center" class="d-none d-md-block">
                        <b-button @click.stop="eliminar()" variant="outline-danger" class="mb-1"><i class="fas fa-2x fa-trash-alt"></i></b-button>                
                    </b-col>
                    
                </b-row>
        </b-list-group-item>

            <b-modal 
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
            ref="modal_update" centered title="Editar Alumno">
             <b-form class="m-3"  ref="form" @submit.stop.prevent="handleSubmit">  
                <b-form-group label-align="left" label-cols="4" label-cols-lg="3" label="Nombre:">
                <b-form-input  v-model="alumno.name" :state="nameState" placeholder="Ingresa el nombre del alumno" required></b-form-input>
                </b-form-group>

                <b-form-group label-align="left" label-cols="4" label-cols-lg="3" label="Email:">
                <b-form-input  v-model="alumno.email" :state="emailState" placeholder="Ingresa el email del alumno" required></b-form-input>
                </b-form-group>


             </b-form>
            </b-modal>
    </div>
</template>

<script>

export default {
    props: ['stu'],
    data(){
        return{
            alumno: null,
            nameState: null,
            emailState: null
        }
    },
    created(){
        this.ClonarAlumno();
    },
    methods:{
        eliminar(){
            this.$bvModal.msgBoxConfirm(`Deseas eliminar al alumno ${this.stu.name}?`, {
                    title: 'Confirmación',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'YES',
                    cancelTitle: 'NO',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                    }).then((value)=>{
                        if(value == true){
                            this.$store.dispatch('eliminarStudent', this.stu)
                        }
                     
                    })
    
        },
        ClonarAlumno(){
           this.alumno = Object.assign({}, this.stu);
        },
        selectStudent(){
           this.$store.commit('StudentSelected', this.stu)
           this.$store.dispatch('getModuls', this.stu)
           this.$router.push('/promotions/'+ this.$route.params.id + '/'+ this.stu.name.replace(' ', ''));
          
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
      //  console.log( {id: this.promo.id, name: this.nombre});
       // this.$store.dispatch('updatePromotion', {id: this.promo.id, name: this.nombre})
            this.$store.dispatch('updateStudent', this.alumno)
            console.log(this.alumno)
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
    },
}
</script>
