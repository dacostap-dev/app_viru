<template>
  <div class="login-wrapper border border-light">
    <form class="form-signin" @submit.prevent="login">
      <h2 class="form-signin-heading">Iniciar Sesión</h2>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
      <b-alert v-if="errors==400" variant="danger" show>Usuario Incorrecto</b-alert>
      <button class="btn btn-lg btn-primary btn-block" type="submit"><b-spinner v-if="bandera" small type="grow"></b-spinner> Ingresar</button>
    </form>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
   beforeCreate: function() {
        document.body.className = 'login';
    },
    data(){
        return {
            email: '',
            password: '',
            bandera: false
        }
    },
    methods: {
        login(){
            this.bandera = true
            this.$store.dispatch('solicitarToken', {
             email: this.email, 
             password: this.password
            }).then(response => {
              this.bandera = false
              this.$router.push({name: 'home'})
              console.log(response)
            })
              
        }
    },
    computed:{
      ...mapState(['errors'])
    }
}
</script>

<style lang="css">

.login-wrapper {
  background: #fff;
  width: 40%;
  margin: 12% auto;
}

.form-signin {
  max-width: 330px;
  padding: 10% 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>