<template>
  <div class="resetPass">
    <div class="resetPass__content container">
      <h1>Reset Password </h1>
      <form action>
        <div class="enter__pass">
          <p>
            Please enter your new password. If you do not want to change your password this time, please
            close the window.
          </p>
          <div class="newPass">
            <label for="newPass">New Password</label>
            <input
              type="password"
              id="newPass"
              v-model="newPass"
              placeholder="Enter your new password ..."
            />
          </div>
          <h2 v-if="isCheck"> Password confirm not similar </h2>
          <div class="confirmPass">
            <label for="newPass__confirm">Confirm New Password</label>
            <input
              type="password"
              id="newPass__confirm"
              v-model="newPass__confirm"
              placeholder="Confirm your password ..."
            />
          </div>
          <div class="confirm">
            <button type="submit" @click="changePass">Confirm</button>
            <button class="ml-3" type="submit" @click="returnLogin">Login</button>
          </div>
          
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResetPass",
  props: {
    msg: String
  },
  data() {
    return {
      newPass: "",
      newPass__confirm: "",
      isCheck:false,
      //param: this.$router.params.id
    };
  },
  methods: {
    changePass() {
      if (this.newPass == this.newPass__confirm) {
        var data = {
          newPass: this.newPass,
          param: this.$route.params.id
        };
        this.$store.dispatch("changePass", data);
      }else{
          return this.isCheck = true;
      }
    },
    returnLogin(){
        this.$router.push('/login')
    }
  },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
$color-orange-0: #f9a825;

.resetPass {
  height: 100vh;
  width: 100vw;
  .resetPass__content {
    padding-top: 200px;
    h1 {
      color: $color-orange-0;
    }
    form {
      .enter__pass {
        label {
          font-weight: bold;
          width: 200px;
        }
        input {
          background-color: #e6e6e6;
          border: 0;
          width: 400px;
          padding: 10px 15px;
          border-radius: 25px;
          margin: 5px 0;
          color: $color-orange-0;
          &:focus {
            border: 0;
            outline: none;
            box-shadow: none;
          }
        }
        .confirm {
          button {
            padding: 7px 30px;
            border: 0;
            margin-top: 10px;
            border-radius: 25px;
            background-color: $color-orange-0;
            &:focus {
              box-shadow: none;
              border: 0;
              outline: none;
            }
          }
        }
      }
    }
  }
}
</style>