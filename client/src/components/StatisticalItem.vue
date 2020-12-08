<template>

  <tr>
    <td>
      <img src="../../public/img/avatar.png" alt />
    </td>
    <td>
      <p id="customerName">{{user.username}}</p>
      <div class="outSide">
        <div  v-if="this.user.last >0" class="inSide" v-bind:style="{width:progresser+'%'}"></div>
		<div v-else class="inSide" v-bind:style="{width:100+'%'}"></div>
      </div>
    </td>
    <td>
      <p>{{user.state}}</p>
    </td>
    <td>
      <p id="countWill">1</p>
    </td>
    <td>
      <p id="willPrice">{{user.price}} $</p>
    </td>
    <td>
      <p id="totalPrice">{{user.price}}$</p>
    </td>
    <td>
      <button id="deleteButton" class="btn deleteButton action" @click.prevent="deleteUser(user.userId)">Delete</button>
      <button id="editButton" class="btn editButton action">Edit</button>
    </td>
  </tr>

</template>

<script>
export default {
  name: "StatisticalItem",
  props: {
    msg: String,
    user: Object
  },
  data() {
    return {
      progress: 0,
      completed: false,
      tempo: 1800
    };
  },
  methods: {
    timer: function(tempo) {
      let vm = document.getElementsByClassName("inSide");
      let setIntervalRef = setInterval(function() {
        vm.progresser++;
        if (vm.progresser == 100) {
          clearInterval(setIntervalRef);
          vm.completed = true;
        }
      }, tempo);
	},
	deleteUser(id){
		var data = {id:id}
		this.$emit('delUser',data)
		this.$store.dispatch('deleteUser',data)
	}
  },
  computed: {
    progresser: function() {
      
      return 100 - this.user.last;
    }
  },
  created: function() {
    this.timer(this.tempo);
  }
};
</script>

<style lang="scss" scoped>
$color-orange-0: #f9a825;
$color-gray-0: #9b9b9b;

tr {
  border-bottom: 1.5px solid black;
  #firstCol,
  #thirdCol,
  #forthCol,
  #fifthCol,
  #sixthCol {
    width: 10%;
  }
  #secondCol {
    width: 40%;
    text-align: left;
  }
  #customerName {
    text-align: left;
  }
  th,
  td {
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
    img {
      display: block;
      height: 60px;
      width: 60px;
      border-radius: 50%;
    }
    .action {
      background-color: $color-gray-0;
      padding: 5px 10px;
      width: 70px;
      &:hover {
        background-color: $color-orange-0;
        border: $color-orange-0;
      }
      &:focus {
        outline: none;
        border: 0;
        box-shadow: none;
      }
    }
  }
  .outSide {
    display: block;
    padding: 2px;
    width: 80%;
    height: 10px;
    border: 0;
    border-radius: 5px;
    background-color: $color-orange-0;
    .inSide {
      display: block;
      background-color: #fff;
      //width: 10%;
      height: 100%;
      border: 0;
      border-radius: 5px;
    }
  }
}
</style>