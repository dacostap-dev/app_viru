<template>
<div>

    <h1>Sistema de Gestión de alumnos</h1>

   <b-row>
        <b-col cols="3">
          <Menu></Menu>
        </b-col>
        <b-col cols="9">
             <router-view></router-view>
        </b-col>
  </b-row>
</div>
</template>

<script>
// @ is an alias to /src
import Menu from '@/components/Menu/MenuComponent.vue'

export default {
  name: 'home',
  components: {
    Menu
  }
}
</script>
