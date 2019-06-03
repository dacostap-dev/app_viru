<template>
<div>
<b-container fluid>
  <b-row class="ml-1">
     <b-card  no-body class="mb-2">
      <b-card-body class="no-padding">
      <b-row no-gutters>
      <b-img src="@/images/banner.jpg"></b-img>
      </b-row>
      </b-card-body>
    </b-card>

  </b-row>

   <b-row>
        <b-col cols="3">
          <Menu></Menu>
        </b-col>
        <b-col cols="8" class="mt-3">
   
        <b-card no-body class="h-100">
          <b-card-body class="no-padding">
          <router-view></router-view>
           </b-card-body>
        </b-card>

        </b-col>
  </b-row>
</b-container>

</div>
</template>

<script>
// @ is an alias to /src
import Menu from '@/components/Menu/MenuComponent.vue'

export default {
  beforeCreate: function() {
        document.body.className = 'home';
  },
  name: 'home',
  components: {
    Menu
  }
}
</script>
<style lang="css">
  .no-padding {
    padding: 8px !important;
}
</style>