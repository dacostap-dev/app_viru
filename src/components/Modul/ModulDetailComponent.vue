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
                            placeholder="Ingresa el año">
                </b-form-input>
            </b-form-group>

             <b-form-group label-cols="5"  label="Fecha de Memorandum:">
                <b-form-input type="text" 
                            name="text"
                            v-model="Modul.memorandum"
                            placeholder="Ingresa el año">
                </b-form-input>
            </b-form-group>

             <b-form-group label-cols="5"  label="Fecha de Solicitud:">
                <b-form-input type="text" 
                            name="text"
                            v-model="Modul.solicitud"
                            placeholder="Ingresa el año">
                </b-form-input>
            </b-form-group>

            <b-form-group class="text" label="Tiene Recibo">
                <b-form-radio-group
                    v-model="Modul.recibo"
                    :options="options"
                    name="radio-inline"
                ></b-form-radio-group>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
        
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
        }
    },
    computed:{
        ...mapState(['modulSelected'])
    }
}
</script>