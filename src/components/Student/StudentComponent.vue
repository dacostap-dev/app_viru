<template>
    <div>
        <b-list-group-item @click="selectStudent()">
                <b-row class="" align-h="center">
                    <b-col cols="3" md="3" class="text-center">
                        <b-img :src="stu.genero === 'female' ? female : male" rounded="circle" width="60" height="60" class="m-1" />
                    </b-col>
                    <b-col cols="5" align-self="center" class="d-none d-md-block">
                        <p class="mb-1">
                        {{stu.name}}
                        </p>
                    </b-col>
                    <b-col cols="2" align-self="center" class="d-none d-md-block">
                        <p class="mb-1">
                        <i class="fas fa-edit">Editar</i>
                        </p>
                    </b-col>
                      <b-col cols="2" align-self="center" class="d-none d-md-block">
                        <p class="mb-1">
                        <i class="fas fa-trash-alt">Eliminar</i>
                        </p>
                    </b-col>
                    
                </b-row>
        </b-list-group-item>
    </div>
</template>

<script>

export default {
    props: ['stu'],
    methods:{
        selectStudent(){
           this.$router.push('/promotions/'+ this.$route.params.id + '/'+ this.stu.name.replace(' ', ''));
           this.$store.dispatch('getModuls', this.stu)
        }
    },
    computed:{
        female(){
            return `http://www.mwattorneys.com/wp-content/uploads/avatar-female.png`
        },
        male(){
            return `https://images.vexels.com/media/users/3/129616/isolated/preview/fb517f8913bd99cd48ef00facb4a67c0-businessman-avatar-silhouette-by-vexels.png`
        }
    }
}
</script>