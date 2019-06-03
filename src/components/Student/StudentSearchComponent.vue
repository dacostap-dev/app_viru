<template>
    <div>
      <b-container>
        <b-row>
            <b-input-group >
                <b-form-input class="border" @keyup.enter="search()" type="text" v-model="buscador" placeholder="Buscar Alumno">
                </b-form-input>
            <b-input-group-append>
                <b-button @click ="search()" variant="outline-secondary">Button</b-button>
            </b-input-group-append>
            </b-input-group>
        </b-row>

         <b-row class="mt-2 justify-content-md-center">    
         <b-list-group style="width: 40rem;">
    
            <b-list-group-item v-for="stu in students" :key="stu.id">
                    <b-row class="" align-h="center">
                        <b-col cols="2" md="2" class="text-center">
                            <b-img :src="stu.genero === 'female' ? female : male" rounded="circle" width="60" height="60" class="m-1" />
                        </b-col>
                        <b-col cols="6" align-self="center" class="d-none d-md-block">
                            <p class="mb-1">
                            {{stu.name}}
                            </p>
                        </b-col>
                        <b-col cols="2" align-self="center" class="d-none d-md-block">
                            <b-button  @click.stop="showModal(stu)" variant="outline-primary" class="mb-1"><i class="fas fa-2x fa-eye"></i></b-button>
                        </b-col>              
                    </b-row>

                    
            </b-list-group-item>
        </b-list-group>
        </b-row>
      </b-container>

            <b-modal 
                ref="modal_search" centered title="Datos del Alumno">
                <b-form class="m-3"  ref="form" >  
                    <b-form-group label-align="left" label-cols="4" label-cols-lg="3" label="Nombre:">
                    <b-form-input disabled v-model="alumno.name" required></b-form-input>
                    </b-form-group>

                    <b-form-group label-align="left" label-cols="4" label-cols-lg="3" label="Email:">
                    <b-form-input disabled v-model="alumno.email" required></b-form-input>
                    </b-form-group>


                    <b-form-group label-align="left" label-cols="4" label-cols-lg="3" label="Promoción:">
                    <b-form-input disabled v-model="promotion.name" required></b-form-input>
                    </b-form-group>

                </b-form>
            </b-modal>

    </div>
</template>
<script>
import {mapState} from "vuex";

export default {
    data(){
        return{
            buscador: '',
            alumno: Object,
            promotion: Object
        }
    },
    created(){
        this.$store.commit('StudentsList', null)
    },
   
    methods:{
        search(){
            if(this.buscador!=''){
                this.$store.dispatch('getAllStudents', this.buscador);
            }
        },
        showModal(stu) {
          this.$refs['modal_search'].show()
          this.alumno = stu
          this.promotion = this.alumno.promotion
        },
    },
    computed:{
        ...mapState(['students']),
         female(){
            return `http://www.mwattorneys.com/wp-content/uploads/avatar-female.png`
        },
        male(){
            return `https://images.vexels.com/media/users/3/129616/isolated/preview/fb517f8913bd99cd48ef00facb4a67c0-businessman-avatar-silhouette-by-vexels.png`
        }    
    },
}
</script>