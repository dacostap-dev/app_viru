<template>
    <div>
         <b-form action="#" class="m-2"  @submit.prevent="login">
          <b-form-group label-cols="4" label-cols-lg="2" label="Email:">
            <b-form-input type="text" required
                          name="email"
                          v-model="email"
                          placeholder="Ingrese su email">
            </b-form-input>
          </b-form-group>

          <b-form-group label-cols="4" label-cols-lg="2" label="password:">
            <b-form-input type="password" 
                          name="text"
                          v-model="pass"
                          placeholder="Ingresa tu clave">
            </b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
    
        </b-form>
    </div>
</template>
<script>
export default {
    data(){
        return {
            email: '',
            pass: ''
        }
    },
    methods: {
        login(){
            this.$store.dispatch('solicitarToken', {
             email: this.email, 
             password: this.pass
            }).then(response => {
              this.$router.push({name: 'home'})
              console.log(response)
            })
              
        }
    }
}
</script>