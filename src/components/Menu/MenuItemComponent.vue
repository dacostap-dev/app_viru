<template>
    <div>
         <b-list-group-item href="#" @click="select" :variant = "isActive === true ? 'secondary' : '' ">{{option.title}}</b-list-group-item>
    </div>
</template>
<script>
export default {
    props:['option'],
    methods:{
         select(){
             let route = {name: this.option.ruta, params: {ruta: this.option.ruta}}
            this.$router.push(route);
            this.$store.commit('OptionSelected', this.option)
        }
    },
    computed:{
        isActive(){
            if(this.$store.state.optionSelected){
              return this.option.ruta == this.$store.state.optionSelected.ruta
            }
            return false
        }
    }
}
</script>