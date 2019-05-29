<template>
    <div>
        <b-row class="justify-content-md-center">
        <b-col cols="8">
            <h1>Detalle del {{Modul.name}}</h1>
            <b-form class="m-3"  @submit.prevent="updateModul()">
            <b-form-group label-align="left"  label-cols="5" label="Nombre:">
                <b-form-input type="text" required
                            name="name"
                            v-model="Modul.name"
                            placeholder="Ingresa el asesor de la promoción">
                </b-form-input>
            </b-form-group>

            <b-form-group label-align="left"  label-cols="5"  label="Fecha de Solicitud:">
                <b-form-input type="text" 
                            name="text"
                            v-model="Modul.solicitud"
                            placeholder="dd/mm/yyyy">
                </b-form-input>
            </b-form-group>

             <b-form-group label-align="left"  label-cols="5"  label="Fecha de Memorandum:">
                <b-form-input type="text" 
                            name="text"
                            v-model="Modul.memorandum"
                            placeholder="dd/mm/yyyy">
                </b-form-input>
            </b-form-group>

            <b-form-group  label-align="left" label-cols="5"  label="Informe/Horas:">
                <b-form-input type="number" 
                            name="text"
                            v-model="Modul.informe"
                            placeholder="Horas">
                </b-form-input>
            </b-form-group>
         
            <b-form-group label-align="left"  label-cols="5"  label="Ficha de Evaluación:">
                <b-form-input type="text" 
                            name="text"
                            v-model="Modul.f_evaluacion"
                            placeholder="dd/mm/yyyy">
                </b-form-input>
            </b-form-group>

            <b-form-group label-align="left" label="Otras opciones: ">
             <b-row class="justify-content-md-center">
               
                    <b-form-checkbox class="mxy-2 my-2" id="proyecto" v-model="Modul.proyecto" name="proyecto" value="1" unchecked-value="0">
                        Tiene Proyecto
                    </b-form-checkbox>
                
               
                    <b-form-checkbox class="mx-2 my-2" id="recibo" v-model="Modul.recibo" name="recibo" value="1" unchecked-value="0">
                        Tiene Recibo
                    </b-form-checkbox>
              
                    <b-form-checkbox class="mx-2 my-2" id="supervision" v-model="Modul.f_supervision" name="supervision" value="1" unchecked-value="0">
                        Ficha de Supervision
                    </b-form-checkbox>
               
             </b-row>
          

  
            </b-form-group>

            <b-button @click="back()"><i class="fas fa-arrow-circle-left"></i> Atrás</b-button>  
            <b-button class="ml-2" type="submit" variant="primary">Guardar</b-button>
            
        
            </b-form>
        </b-col>
        </b-row>
    </div>
</template>
<script>
import {mapState} from "vuex";
export default {
    data(){
        return{
            Modul: null,
            options: [
                {text: 'Si', value: '1'},
                {text: 'No', value: '0'},
            ]
        }
    },
    created(){
        this.ClonarModulo();
    },
    methods:{
        ClonarModulo(){
            this.Modul = Object.assign({}, this.modulSelected);
        },
        updateModul(){
            this.$store.dispatch('updateModul', this.Modul)
        },
        back(){
           this.$store.dispatch('getModuls', this.studentSelected)
           this.$router.push('/promotions/'+ this.promotionSelected.id + '/'+ this.studentSelected.name.replace(' ', ''));
        },
    },
    computed:{
        ...mapState(['modulSelected', 'promotionSelected', 'studentSelected']),
    }
}
</script>