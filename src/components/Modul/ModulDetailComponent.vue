<template>
    <div>
        <b-col cols="11">
            <h1>Detalle del {{Modul.name}}</h1>
            <b-form class="m-3"  @submit.prevent="updateModul()">
            <b-form-group label-cols="5" label="Nombre:">
                <b-form-input type="text" required
                            name="name"
                            v-model="Modul.name"
                            placeholder="Ingresa el asesor de la promoción">
                </b-form-input>
            </b-form-group>

            <b-form-group label-cols="5"  label="Fecha de Informe:">
                <b-form-input type="text" 
                            name="text"
                            v-model="Modul.informe"
                            placeholder="dd/mm/yyyy">
                </b-form-input>
            </b-form-group>

             <b-form-group label-cols="5"  label="Fecha de Memorandum:">
                <b-form-input type="text" 
                            name="text"
                            v-model="Modul.memorandum"
                            placeholder="dd/mm/yyyy">
                </b-form-input>
            </b-form-group>

             <b-form-group label-cols="5"  label="Fecha de Solicitud:">
                <b-form-input type="text" 
                            name="text"
                            v-model="Modul.solicitud"
                            placeholder="dd/mm/yyyy">
                </b-form-input>
            </b-form-group>

            <b-form-group label-cols="5"  label="Ficha de Supervisión:">
                <b-form-input type="text" 
                            name="text"
                            v-model="Modul.f_supervision"
                            placeholder="dd/mm/yyyy">
                </b-form-input>
            </b-form-group>

                <b-form-group label-cols="5"  label="Ficha de Evaluación:">
                <b-form-input type="text" 
                            name="text"
                            v-model="Modul.f_evaluacion"
                            placeholder="dd/mm/yyyy">
                </b-form-input>
            </b-form-group>

            <b-form-group class="text" label="Tiene Recibo">
                <b-form-radio-group
                    v-model="Modul.recibo"
                    :options="options"
                    name="radio-inline"
                ></b-form-radio-group>
            </b-form-group>

            <b-button class="mr-2" type="submit" variant="primary">Guardar</b-button>
            <b-button @click="back()"><i class="fas fa-arrow-circle-left"></i> Cancelar</b-button>  
        
            </b-form>
        </b-col>
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