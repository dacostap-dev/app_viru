import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex, axios)

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

export default new Vuex.Store({
  state: {
    promotions: [],
    promotionSelected: null,
    studentSelected: null,
    modulSelected: null,
    students: [],
    moduls: [],
    errors: [],
    token: localStorage.getItem('token') || null
  },
  mutations: {
    ModulsList(state, modul){
      state.moduls = modul
    },
    PromotionsList(state, promotions){
      state.promotions = promotions
    },
    PromotionSelected(state, promotion){
      state.promotionSelected = promotion
    },
    StudentSelected(state, student){
      state.studentSelected = student
    },
    ModulSelected(state, modul){
      state.modulSelected = modul
    },
    StudentsList(state, students){
      state.students = students
    },
    errorsList(state, error){
      state.errors = error
    },
    NuevoToken(state, token){
      state.token = token
    }
  },
  actions: {
    solicitarToken(context, credentials){
      return new Promise((resolve, reject) => {
        return axios.post('/login', {
          email: credentials.email, 
          password: credentials.password
        })
          .then(response => {
            const token = response.data.token
            localStorage.setItem('token', token)
            context.commit('NuevoToken', token)
            resolve(response)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token; // Luego de logearse se utilizara el token en el header para todas los request
        }).catch(error => {
            if(error.response && error.response.status === 400){
              console.log('Usuario Incorrecto')
            }
            reject(error)
        })
      })
    },
    eliminarStudent(context, params){
      return axios.delete('/student/' +params.id).then((response)=>{
        this.dispatch('getStudents', params.promotion_id)
        console.log(response.data)
      })
    },
    updateModul(context, params){
      return axios.put('/modul/'+ params.id, params).then(() => {
        console.log('funcionó')
      })
    },
    updatePromotion(context, params){
      return axios.put('/promotion/'+ params.id, params).then((response)=>{      
        context.commit('PromotionsList', response.data);     
      console.log(response.data)
      })
    },
    updateStudent(context, params){
      return axios.put('/student/'+ params.id, params).then((response)=>{      
       this.dispatch('getStudents', params.promotion_id);  
      console.log(response.data)
      })
    },
    getModuls(context, stu){
      return axios.get('/modul/'+ stu.id).then((response)=>{
        context.commit('ModulsList', response.data)
      })
    },
    getStudents(context, promo_id){
      return axios.get('/student/' +promo_id).then((response)=>{
        context.commit('StudentsList', response.data)  
        console.log(response.data)
      })
    },
    getAllStudents(context, buscador){
      return axios.get('/student?name='+buscador).then((response)=>{
        context.commit('StudentsList', response.data)  
        console.log(response.data)
      })
    },
    getStudentsFiltered(context,params){
      return axios.get('/student/'+params.id + '?name=' +params.name).then((response)=>{
        context.commit('StudentsList', response.data)
        console.log('respuesta')
        console.log(response.data)
      })
    },
    getPromotions(context){
      return axios.get('/promotion').then((response)=>{
        context.commit('PromotionsList', response.data)
        console.log(response.data)
      }).catch(function (error){
          if(error.response && error.response.status === 500){
            context.commit('errorsList', error.response.status)
            console.log('se produjo error 500')
          }
      });
    },
    getPromotionsFiltered(context,name){
      return axios.get('/promotion?name='+ name).then((response)=>{
        context.commit('PromotionsList', response.data)
        console.log(response.data)
      })
    },
    postPromotions(context, params){
      return axios.post('/promotion', params)
        .then((response)=>{
          if(response.data.success){
            context.commit('PromotionsList', response.data)
            console.log(this.state.promotions)
          }
      })
    },
    postStudent(context, params){
      return axios.post('/student', params).then((response)=>{
        if(response.data.success){
          this.state.students.push(response.data.student)
          console.log(response.data)
        }
      })
    },
    postModul(context, params){
      return axios.post('/modul', params).then((response)=>{
        if(response.data.success){
          console.log(response.data)
            this.state.moduls.push(response.data.modul)
        }
      })
    }
  }
})
