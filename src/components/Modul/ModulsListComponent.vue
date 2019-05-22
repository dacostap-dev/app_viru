<template>
    <div>
      <b-container>
       
        <b-row>
          <b-col cols="8">
            <h2 class="display-5 text-left">Alumno: {{studentSelected.name}}</h2>
          </b-col>
          <b-col cols="4">
            <b-button @click="showModal()" variant="outline-primary">Añadir nuevo modulo</b-button>
          </b-col>
        </b-row>
        <b-row>
         <b-button class="ml-2" @click="back()"><i class="fas fa-arrow-circle-left"></i> Regresar</b-button>
         <b-button v-if="moduls.length !== 0" class="ml-2" @click="pdf">Exportar PDF</b-button>  
        </b-row>
          
     
        <b-row v-if="moduls.length !== 0">
            <b-card-group  class="mt-4">
              <Modul v-for="modul in moduls" :key="modul.id" :modul="modul" />
            </b-card-group>

        </b-row>

        <p v-else class="text-center mt-5 mb-5">No tiene Modulos</p> 

        <b-row class="m-2">
          <download-excel
              :data = "datosExcel"
              :title = "titulo"
              name = "Modulo.xls">
              Descargar Datos
            <i class="fas fa-download"></i>
          </download-excel>
        </b-row>
    
         <b-modal 
          @show="resetModal"
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
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
      pdf(){
            var array = []
                if(this.moduls){ // para evitar que salte un error al no encontrar modulos por la demora de la petición ajax
                  this.moduls.forEach(function(modul){
                        array.push({'name': modul.name, 
                        'informe': modul.informe, 
                        'memo': modul.memorandum, 
                        'recibo': modul.recibo == 1 ? 'Si' : 'No', 
                        'solicitud': modul.solicitud, 
                        'f_supervision': modul.f_supervision, 
                        'f_evaluacion': modul.f_evaluacion})
                    })
                }
            let columns = [
               {title: 'Nombre', dataKey: "name"}, 
               {title: 'Fecha de Informe', dataKey: "informe"},
               {title: 'Fecha de Memorandum', dataKey: "memo"},
               {title: 'Tiene Recibo', dataKey: "recibo"},  
               {title: 'Fecha de Solicitud', dataKey: "solicitud"},
               {title: 'Ficha de Supervisión', dataKey: "f_supervision"}, 
               {title: 'Ficha de Evaluación', dataKey: "f_evaluacion"},  
            ];
            
            let doc = new jsPDF('landscape');
            doc.text('Alumno: ' + this.studentSelected.name, 10, 10);
            doc.autoTable(columns, array, {     
              styles: {halign: 'center',
              lineColor: [44, 62, 80],
              lineWidth: 0.15},
              
            //  columnStyles: {Nombre: {halign: 'center', fillColor: [0, 255, 0]}}, // Cells in first column centered and green
              margin: {top: 25},
                  
            })
            doc.save("Modulos_" + this.studentSelected.name +".pdf");
      },
      back(){
        this.$router.push('/home/promotions/'+ this.promotionSelected.id);   
        this.$store.dispatch('getStudents', this.promotionSelected.id)
      },
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
        if(this.nombre==null){
          this.nameState = false
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
        ...mapState(['moduls', 'studentSelected', 'promotionSelected']),
         datosExcel(){
            var array = []
            if(this.moduls){ // para evitar que salte un error al no encontrar modulos por la demora de la petición ajax
               this.moduls.forEach(function(modul){
                    array.push({'Nombre del Módulo': modul.name, 
                    'Fecha de informe': modul.informe, 
                    'Fecha de Memorandum': modul.memorandum, 
                    'Tiene Recibo': modul.recibo == 1 ? 'Si' : 'No', 
                    'Fecha de Solicitud': modul.solicitud, 
                    'Ficha de Supervisión': modul.f_supervision, 
                    'Fecha de Evaluación': modul.f_evaluacion})
                })
            }
               
            return array
        },
        titulo(){
            return 'Alumno: ' + this.studentSelected.name
        }
    }
}
</script>