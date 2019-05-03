<template>
    <div>
          <b-card @click="selectModul"
            header="Modul"
            :border-variant="color"
            header-text-variant="white"
            header-tag="header"
            :header-bg-variant="color"
            :title="modul.name"
            style="max-width: 20rem;"
            >
            <b-card-text>
             Asesor - {{modul.asesor}}
            </b-card-text>

          </b-card>
    </div>
</template>
<script>
export default {
    props: ['modul'],
    methods: {
      selectModul(){
        this.$store.commit('ModulSelected', this.modul)
        this.$router.push({name: 'modul.detail' , params:{ 
          modul:this.modul.name.replace(' ', '')}
          })
      }
    },
    computed:{
      color(){
        if(this.modul.informe == ''){
          return 'danger'
        }
        if(this.modul.memorandum == ''){
          return 'danger'
        }
        if(this.modul.solicitud == ''){
          return 'danger'
        }
        if(this.modul.recibo == '0'){
          return 'danger'
        }
         return 'primary'
      }
    }
}
</script>