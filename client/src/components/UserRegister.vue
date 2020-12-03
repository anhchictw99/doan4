<template>
  <div>
    <div class="registerForm">
      <form id="registerForm" action>
        <h1>User register</h1>
        <div class="registerInfo userName">
          <label for="userName">Username</label>
          <input type="text" v-model="username" id placeholder="Enter your username ..." />
        </div>
        <div class="registerInfo passWord">
          <label for="password">Password</label>
          <input
            type="password"
            v-model="password"
            id="password"
            placeholder="Enter you password ..."
          />
        </div>
        <div class="registerInfo email">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" placeholder="userEmail@gmail.com ..." />
          <i v-if="isEmail" class="fa fa-check-circle"></i>
          <button
            v-else
            type="button"
            data-toggle="modal"
            data-target="#verifyModalEmail"
            @click="checkEmail"
            class="btn"
          >Verify</button>
        </div>
        <div class="registerInfo phoneNumber">
          <label for="phoneNumber">Phone number</label>
          <input type="tel" v-model="phone" id="phone" placeholder="Enter your phone ..." />
          <i v-if="isPhone" class="fa fa-check-circle"></i>
          <button
            v-else
            type="button"
            data-toggle="modal"
            data-target="#verifyModalPhone"
            @click.prevent="checkPhone"
            class="btn"
          >Verify</button>
        </div>
        <div class="registerInfo socialID">
          <label for="socialID">Social ID</label>
          <input
            type="text"
            v-model="socialId"
            id="socialID"
            placeholder="Enter your social ID ..."
          />
        </div>
        <div class="registerInfo homeAddress">
          <label for="homeAddress">Home address</label>
          <input
            type="text"
            v-model="homeAddress"
            id="homeAddress"
            placeholder="Enter your address"
          />
        </div>
        <div class="registerInfo fullName">
          <label for="fullName">Full name</label>
          <input
            type="text"
            name
            v-model="fullName"
            id="fullName"
            placeholder="Enter your full name ..."
          />
        </div>
        <button type="button" @click="regisUser" class="btn btn-warning">Continue</button>
      </form>
    </div>
    <!-- The Modal -->

    <!-- </div> -->
    <!-- The Modal -->
    <div class="modal" id="verifyModalEmail">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h3>Verify your Email</h3>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <input
              type="text"
              v-model="checkpopEmail"
              id="verifyCode"
              placeholder="Enter your code ..."
            />
            <p v-if="isEmail==false" class="alert alert-danger">Your verify code is not correct !</p>
            <a href="#">Haven't recieve verify code yet ?</a>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button
              type="button"
              @click="popMail"
              class="btn btn-danger"
              data-dismiss="modal"
            >Verify</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" id="verifyModalPhone">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h3>Verify your Phone</h3>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <input
              type="text"
              v-model="checkpopPhone"
              id="verifyCode"
              placeholder="Enter your code ..."
            />
            <p v-if="isEmail==false" class="alert alert-danger">Your verify code is not correct !</p>
            <a href="#">Haven't recieve verify code yet ?</a>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button
              type="button"
              @click="popPhone"
              class="btn btn-danger"
              data-dismiss="modal"
            >Verify</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "UserRegister",
  props: {
    msg: String
  },
  data() {
    return {
      username: "",
      password: "",
      email: "",
      phone: "",
      socialId: "",
      homeAddress: "",
      fullName: "",
      checkpopEmail: "",
      checkpopPhone: "",
      isEmail: false,
      isPhone: false,
      isPopEmail: false,
      isPopPhone: false
    };
  },
  methods: {
    //   userLogin(){
    //       var data= {
    //           username: this.username,
    //           password:this.password

    //       }
    //       this.$store.dispatch('userLogin',data)
    //   },
    //   enterCode(){
    //       var data ={ random:this.random}
    //       this.$store.dispatch('enterCode',data)
    //   },
    checkEmail() {
      var data = { email: this.email };
      this.$store.dispatch("checkEmail", data);
    },
    checkPhone() {
      var data = { email: this.phone };
      this.$store.dispatch("checkPhone", data);
    },
    regisUser() {
      if (this.isEmail == true && this.isPhone == true) {
        var data = {
          username: this.username,
          password: this.password,
          email: this.email,
          phone: this.phone,
          socialId: this.socialId,
          homeAddress: this.homeAddress,
          fullName: this.fullName
        };
        this.$store.dispatch("regisUser", data);
      } else {
        this.$store.dispatch("regisUserFail");
      }
    //   var data = {
    //     username: this.username,
    //     password: this.password,
    //     email: this.email,
    //     // phone:this.phone,
    //     socialId: this.socialId
    //     //homeAddress:this.homeAddress,
    //     //fullName:this.fullName
    //   };
    //   this.$store.dispatch("regisUser", data);
    },
    popMail() {
      if (this.checkpopEmail == this.signCheckmail) {
        return (this.isEmail = true);
      } else {
        return (this.isEmail = false);
      }
    },
    popPhone() {
      console.log("đúng");
      if (this.checkpopPhone == this.signCheckphone) {
        console.log("đúng");
        return (this.isPhone = true);
      } else {
        return (this.isPhone = false);
      }
    }
  },
  computed: {
    ...mapState(["signCheckmail", "signCheckphone"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">
$color-orange-0: #f9a825;

.registerForm {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(../../public/img/AdobeStock_225477140.jpg);
  background-repeat: no-repeat;
  background-size: cover;

  form {
    position: relative;
    width: 50%;
    padding: 20px 60px;
    background-color: rgba(0, 0, 0, 0.342);

    h1 {
      font-size: 50px;
      color: $color-orange-0;
      margin-bottom: 25px;
    }
    .registerInfo {
      label {
        padding: 7px 0;
        margin-bottom: 15px;
        color: white;
      }
      input {
        position: absolute;
        right: 25%;
        width: 40%;
        border-radius: 30px;
        padding: 7px 15px 7px;
        border: 0;
        &:focus {
          outline: none;
          border: 0;
          box-shadow: none;
        }
      }
      i {
        color: $color-orange-0;
        font-size: 35px;
        padding: 2px 0;
        position: absolute;
        right: 20%;
      }
      button {
        // display: none;
        position: absolute;
        right: 10%;
        padding: 7px 15px 7px;
        border-radius: 30px;
        background-color: $color-orange-0;
        border: 0;
        &:hover {
          background-color: rgb(199, 133, 11);
        }
        &:focus {
          border: 0;
          outline: none;
          box-shadow: none;
        }
      }
    }
  }
}

#verifyModalPhone {
  .modal-dialog {
    max-width: 350px;
    .modal-content {
      padding: 10px 20px;
      .modal-header {
        background-color: white;
        padding: 10px 0;
        border: 0;
        h3 {
          display: block;
          width: 100%;
          margin: 0;
          margin: 0;
          text-align: center;
          color: $color-orange-0;
        }
        button:focus {
          outline: none;
          box-shadow: none;
          border: 0;
        }
      }
      .modal-body {
        input {
          width: 100%;
        }
        a {
          padding-left: 8px;
          font-size: 15px;
          display: block;
          width: 100%;
          color: black;
          transition: 0.3s all;
          &:hover {
            color: $color-orange-0;
            text-decoration: none;
          }
        }
        p {
          margin: 0;
          margin-bottom: 5px;
          padding: 2px 8px;
          border-radius: 20px;
        }
      }
      .modal-footer {
        display: flex;
        justify-content: flex-end;
        padding: 0 1rem;
        padding-bottom: 10px;
        border: 0;
        button {
          padding: 5px 15px;
          &:focus {
            outline: none;
            box-shadow: none;
            border: 0;
          }
          &:hover {
            border: 1px solid rgb(199, 133, 11);
            background-color: rgb(199, 133, 11);
          }
        }
      }
    }
  }
}
#verifyModalEmail {
  .modal-dialog {
    max-width: 350px;
    .modal-content {
      padding: 10px 20px;
      .modal-header {
        background-color: white;
        padding: 10px 0;
        border: 0;
        h3 {
          display: block;
          width: 100%;
          margin: 0;
          margin: 0;
          text-align: center;
          color: $color-orange-0;
        }
        button:focus {
          outline: none;
          box-shadow: none;
          border: 0;
        }
      }
      .modal-body {
        input {
          width: 100%;
        }
        a {
          padding-left: 8px;
          font-size: 15px;
          display: block;
          width: 100%;
          color: black;
          transition: 0.3s all;
          &:hover {
            color: $color-orange-0;
            text-decoration: none;
          }
        }
        p {
          margin: 0;
          margin-bottom: 5px;
          padding: 2px 8px;
          border-radius: 20px;
        }
      }
      .modal-footer {
        display: flex;
        justify-content: flex-end;
        padding: 0 1rem;
        padding-bottom: 10px;
        border: 0;
        button {
          padding: 5px 15px;
          &:focus {
            outline: none;
            box-shadow: none;
            border: 0;
          }
          &:hover {
            border: 1px solid rgb(199, 133, 11);
            background-color: rgb(199, 133, 11);
          }
        }
      }
    }
  }
}
</style>