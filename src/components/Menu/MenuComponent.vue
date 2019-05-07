<template>
    <div>
        <b-list-group>
        <b-list-group-item>Menu</b-list-group-item>
        <MenuItem v-for="option in options" :key="option.id" :option="option">
        </MenuItem>
        </b-list-group> 
    </div>
</template>
<script>
import MenuItem from "@/components/Menu/MenuItemComponent.vue";
export default {
    data(){
        return{
            options: [{
                    "id": 1,
                    "title" : 'Registrar Promoción',
                    "ruta" : 'create'
                 },
                 {
                    "id": 2,
                    "title" : 'Ver Promociones',
                    "ruta" : 'promotions'
                 },
                 {
                    "id": 3,
                    "title" : 'Buscar Alumno',
                    "ruta" : 'buscar'
                 },    
                 {
                    "id": 4,
                    "title" : 'Salir',
                    "ruta" : 'exit'
                 },
                 ]
                        
        }
    },
    components:{
        MenuItem
    },
}
</script>