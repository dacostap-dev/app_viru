<template>
    <div>
         <b-list-group-item @click="select" :class = "{active: isActive}">{{option.title}}</b-list-group-item>
    </div>
</template>
<script>
export default {
    props:['option'],
    methods:{
         select(){
             let route = {name: this.option.ruta, params: {ruta: this.option.ruta}}
            this.$router.push(route);
        }
    },
    computed:{
        isActive(){
            return this.option.ruta == this.$route.params.ruta;
        }
    }
}
</script>