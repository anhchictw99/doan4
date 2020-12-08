<template>
  <div>
    <div class="registerForm">
      <form id="registerForm" action>
        <h1>Profile User</h1>
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

        </div>
        <div class="registerInfo phoneNumber">
          <label for="phoneNumber">Phone number</label>
          <input type="tel" v-model="phone" id="phone" placeholder="Enter your phone ..." />

        </div>
        <div class="registerInfo socialID">
          <label for="socialID">Social ID</label>
          <input
            type="number"
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
        <button type="button" @click="editButtonUser" class="btn btn-warning">Continue</button>
      </form>
    </div>


  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "EditUser",
  props: {
    msg: String
  },
  data() {
    return {
      homeAddress:'',
      fullName:'',
      password:''
    };
  },
  methods: {
    editButtonUser() {
      var data = {
        username: this.signTurnusername,
        password:this.password,
        socialId: this.signTurnsocialId,
        email: this.signTurnemail,
        phone: this.signTurnphone,
        
      };
      this.$store.dispatch("editButtonUser", data);
    }
  },

  created: function() {
    this.$store.dispatch("editUser");
  },
  computed: {
    ...mapState([
      "signEdituser",
      "signTurn",
      "signTurnusername",
      "signTurnsocialId",
      "signTurnemail",
      "signTurnphone"
    ]),
    username: {
      get() {
        return this.$store.state.signEdituser.username;
      },
      set(value) {
        this.$store.commit("TURNUSERNAME", value);
      }
    },
    
    socialId: {
      get() {
        return this.$store.state.signEdituser.socialId;
      },
      set(value) {
        this.$store.commit("TURNSOCIALID", value);
      }
    },
    email: {
      get() {
        return this.$store.state.signEdituser.email;
      },
      set(value) {
        this.$store.commit("TURNEMAIL", value);
      }
    },
    phone: {
      get() {
        return this.$store.state.signEdituser.phone;
      },
      set(value) {
        this.$store.commit("TURNPHONE", value);
      }
    }
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


</style>