<template>
  <div>
   
    <section class="statistical">
      <div class="statistical__content">
        <h1>Bảng thống kê</h1>
        <div class="adminOptions d-flex">
          <h4>Options :</h4>
          <button
            type="button"
            class="btn"
            data-toggle="modal"
            data-target="#changePrice"
          >Change will's price</button>
          <button id="sortByDay" @click.prevent="sortState"> User đã thanh toán</button>
        </div>
        <table>
          <tr>
            <th id="firstCol"></th>
            <th id="secondCol">Customer</th>
            <th id="thirdCol">State</th>
            <th id="forthCol">Count</th>
            <th id="firthCol">Price</th>
            <th id="fifthCol">Total</th>
            <th id="actions">Actions</th>
          </tr>

           <statistical-item 
          v-on:delUser="deleteUser"
          v-for="(user,index) in signStatical" 
          v-bind:user="user"
          v-bind:key="index"
          />
          
          
        </table>
      </div>

      <!-- The Modal -->
      <div class="modal" id="changePrice">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <h3>Change will price</h3>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
              <div class="willDuration">
                <label for="threeMonths">3 Months</label>
                <input
                  type="text"
                  id="threeMonths"
                  v-model="price1"
                  placeholder="Enter new price ..."
                />
              </div>
              <div class="willDuration">
                <label for="sixMonths">6 Months</label>
                <input
                  type="text"
                  id="sixMonths"
                  v-model="price2"
                  placeholder="Enter new price ..."
                />
              </div>
              <div class="willDuration">
                <label for="oneYear">1 Year</label>
                <input type="text" id="oneYear" v-model="price3" placeholder="Enter new price ..." />
              </div>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                @click="changePrice"
                data-dismiss="modal"
              >Submit</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import StatisticalItem from './StatisticalItem'
// import StatisticalItem from "./StatisticalItem";
export default {
  name: "Statistical",
  props: {
    msg: String
  },
  data() {
    return {
      price1: "",
      price2: "",

      price3: "",
      isSort:false
    };
  },

  methods: {
    changePrice() {
      var data = {
        price1: this.price1,
        price2: this.price2,
        price3: this.price3
      };
      this.$store.dispatch("changePrice", data);
    },
    deleteUser(data){
      var indexDel = -1;
      this.signStatical.forEach((u,idx)=>{
        console.log(u.userId,idx)
        if(u.userId == data.id){
          indexDel = idx;
        }
      });
      if(indexDel != -1){
        this.signStatical.splice(indexDel,1);
      }
    },
    sortState(){

      this.$store.dispatch("sortState");
      
      // var signSort = this.signStatical.filter( item => item.state == 'yes')
      // return this.signStatical = signSort
      //return isSort != isSort;
    }
  },
  created: function() {
    this.$store.dispatch("statical");
  },
  computed: {
    ...mapState(["signStatical"])
  },
  
  components: {
    StatisticalItem
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->


<style lang="scss" scoped>
$color-orange-0: #f9a825;
$color-gray-0: #9b9b9b;

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: "Roboto", sans-serif;
}

.statistical {
    .statistical__content {
        padding-top: 150px;
        h1 {
            color: $color-orange-0;
            font-size: 45px;
            font-weight: 500;
            padding-bottom: 10px;
            border-bottom: 2px solid $color-orange-0;
            margin-bottom: 30px;
        }
        .adminOptions {
            align-items: center;
            h4 {
                margin: 0;
                margin-right: 10px;
            }
            button {
                background-color: $color-gray-0;
                padding: 5px 10px;
                border-radius: 30px;
                border: 0;
                margin-right: 10px;
                &:hover {
                    background-color: $color-orange-0;
                }
                &:focus {
                    outline: none;
                    box-shadow: none;
                    border: $color-orange-0;
                }
            }
        }
        table {
            display: table;
            width: 100%;
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
                        width: 63%;
                        height: 100%;
                        border: 0;
                        border-radius: 5px;
                    }
                }
            }
        }
        .total {
            p {
                display: block;
                text-align: right;
                margin: 0;
                margin-top: 10px;
            }
        }
    }
    .modal {
        .modal-dialog {
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
                    .willDuration {
                        margin-bottom: 15px;
                        position: relative;
                        input {
                            position: absolute;
                            right: 0;
                            width: 80%;
                            border-radius: 20px;
                            padding: 5px 10px;
                            &:focus {
                                outline: none;
                                box-shadow: none;
                            }
                        }
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
}

@media screen and (max-width: 576px) {
    .statistical {
        .statistical__content {
            h1 {
                font-size: 30px;
            }
            .adminOptions {
                h4 {
                    font-size: 20px;
                }
                button {
                    padding: 2px 5px;
                    font-size: 15px;
                }
            }
            table {
                tr {
                    #secondCol {
                        width: 25%;
                    }
                    th,td {
                        font-size: 13px;
                        p {
                            margin: 0;
                        }
                        img {
                            height: 40px;
                            width: 40px;
                        }
                        .action {
                            font-size: 15px;
                            margin-bottom: 5px;
                            padding: 2px 5px;
                        }
                    }
                }
            }
            .total {
                p {
                    font-size: 13px;
                }
            }
        }
        .modal {
            .modal-dialog {
                margin: 20px 40px;
                .modal-content {
                    padding: 10px;
                    .modal-header {
                        h3 {
                            font-size: 30px;
                        }
                    }
                    .modal-body {
                        .willDuration {
                            label {
                                font-size: 15px;
                            }
                            input {
                                width: 70%;
                            }
                        }
                    }
                }
            }
        }
    }
}

@media screen and (min-width: 577px) and (max-width: 768px) {
    .statistical {
        .statistical__content {
            h1 {
                font-size: 40px;
            }
            table {
                tr {
                    #secondCol {
                        width: 30%;
                    }
                }
            }
        }
    }
}

</style>
