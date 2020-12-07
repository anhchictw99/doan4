<template>
<section class="adminLogin">
    
    <div class="adLogin__content container">
      <form action="">
        <h1>Create your own will</h1>
        <p>Sign in as adminstrator</p>
        <div class="loginForm">
          <input type="text"  id="adminName" v-model="userAdmin" placeholder="Email ...">
          <input type="password"  id="adminPass" v-model="password" placeholder="Password ...">
          <div class="loginButton">
            <a href="#" @click="loginAdmin">Login</a>
          </div>
        </div>
        <a id="forgotPass" href="#">Forgot your password ?</a>
      </form>
    </div>
    
  </section>

</template>

<script>

import {mapState} from 'vuex'
export default {
    name: 'AdminLogin',
    props: {
        msg: String
    },
    data(){
      return {
          
         
       userAdmin:'',
       password:''
          

      }
    },
    methods:{
    loginAdmin() {
        console.log('vui')
        var data = {userAdmin:this.userAdmin,password:this.password}
        this.$store.dispatch('loginAdmin',data)
    }
      

  },
  computed:{
      ...mapState(['signTurnon','signTurn'])
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">
$color-orange-0: #f9a825;

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.adminLogin {
    padding-top: 200px;
    position: relative;
    .adLogin__content {
        form {
            display: block;
            width: 30%;
            margin: 0 auto;
            text-align: center;
            h1 {
                font-size: 35px;
            }
            .loginForm {
                display: block;
                input {
                    width: 100%;
                    padding: 7px 15px 7px;
                    border: 1.5px solid black;
                    border-radius: 25px;
                    margin-bottom: 10px;
                    &:focus {
                        outline: none;
                        box-shadow: none;
                    }
                }
                .loginButton {
                    display: block;
                    background-color: $color-orange-0;
                    padding: 7px 15px 7px;
                    border: 1.5px solid $color-orange-0;
                    border-radius: 25px;
                    a {
                        color: black;
                        text-decoration: none;
                    }
                }
            }
            #forgotPass {
                display: block;
                color: $color-orange-0;
                text-decoration: none;
                margin-top: 20px;
            }
        }
    }
}
</style>