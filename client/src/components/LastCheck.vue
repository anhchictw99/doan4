<template>
  <div class="forgotPass">
    <div class="forgotPass__content container">
      <form action>
        <h1>Forgot Password </h1>
        <p>
          If you have forgotten your username or password, you can request to have your username emailed to
          you and to reset your password. When you fill in your registered email address, you will be sent
          instructions on how to reset your password.
        </p>


        <div class="sendReq">
          <button type="submit" @click="lastCheck">Go to Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LastCheck",
  props: {
    msg: String
  },
  data(){
      return {
          email:''

      }
  },
  methods: {
    lastCheck() {
      var data = {
        param: this.$route.params.id,
     
      };
      this.$store.dispatch("lastCheck", data);
    },



  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
$color-orange-0: #f9a825;

.forgotPass {
  width: 100vw;
  height: 100vh;
  padding-top: 200px;
  .forgotPass__content {
    h1 {
      color: $color-orange-0;
    }
    label {
      font-weight: bold;
      width: 150px;
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
    .sendReq {
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
</style>