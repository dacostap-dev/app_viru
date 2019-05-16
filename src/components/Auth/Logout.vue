<template>
    <div>
        
    </div>
</template>
<script>
export default {

    created(){
        this.$store.commit('NuevoToken', ''),
        localStorage.removeItem('token'),
        this.$router.push({name: 'login'})
    }
    
}
</script>