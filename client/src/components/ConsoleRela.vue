nhap 2
<template>
<div class="Witnesses">
       <div class="payment">
            <div class="payment__content container">
                <div class="payment__col text-left payment__left__col">
                    <div class="userWill">
                        <div class="willHeader">
                            <h1>THE WILL</h1>
                            <h3>Last Will and Testament of <span class="userName">userName</span>.</h3>
                        </div>
                        <div class="willBody">
                            <div class="bodyContent">
                                <p>Location, day, month, year.</p>

                                <p>My name is <b class="userName">{{signTurnon1.fullname}}</b>,</p>
                                <p>Security social number: <b class="font-weight-bold"> {{signTurnon1.socialId}}</b>, being of sound mind and memory, do
                                    hereby make, publish and declare the following instrument as my Last Will and
                                    Testament.
                                </p>

                                <b>Content of userWill.</b>

                                <p><b>Final Arrangements</b></p>
                                <p>User's wishes for final resting place or arrangements: ...</p>
                                <p>Kind of ceremony: ...</p>

                                <b>Witness: {{signTurnon1.will}}</b>
                                <div class="bodyFooter">
                                    <p>IN WITNESS WHEREOF, I have hereunto subscribed my name and affixed my seal this
                                        _____
                                        day
                                        of _____________________, 20__.</p>
                                    <i class="fa fa-signature"></i>
                                                    <div class="btn-group">
                
                                    <a href="#" class="btn btn-default" @click="goHome" >GO TO HOME</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    name: 'Console',
    props: {
        msg: String
    },
    data(){
      return {
          
         
        //  will:'',
          

      }
  },
  methods:{
     
      goHome(){
          
          this.$store.dispatch('relaSeen')
         
      }
  },
  created: function () {
    this.$store.dispatch('turnonWill1')
  },
  computed:{
    ...mapState(['signTurnon1','signTurn']),
    
  

  }

}
</script>


<style lang="scss" scoped>
$color-orange-0: #f9a825;

@mixin yourWillh1 {
    margin: 0px 0px 24px;
    text-align: center;
    font-size: 42px;
    line-height: 48px;
    font-weight: bold;
    letter-spacing: 0.5px;
}

@mixin yourWillh3 {
    text-align: center;
    font-size: 18px;
    line-height: 24px;
    font-weight: bold;
    text-transform: none;
    letter-spacing: 0.5px;
    margin: 0px;
}

.payment {
    width: 100vh;
    width: 100vw;
    background-image: url(../../public/img/anh-nen-toi-hoa-van-cho-dien-thoai_101025691.jpg);
    .payment__content {
        padding: 100px 150px;
        .payment__left__col {
            .userWill {
                position: relative;
                height: 100vh;
                background-color: white;
                .willHeader {
                    background-color: $color-orange-0;
                    padding: 20px 50px;
                    border-bottom: 2px solid black;
                    h1 {
                        @include yourWillh1;
                        text-align: left;
                        font-size: 60px;
                    }
                    h3 {
                        @include yourWillh3;
                        text-align: left;
                    }
                }
                .willBody {
                    display: block;
                    padding: 50px;
                    .bodyContent {
                        height: 100%;
                        .bodyFooter {
                            position: absolute;
                            bottom: 0;
                            right: 0;
                            left: 0;
                            padding: 0 50px;
                            i {
                                margin-top: 20px;
                                font-size: 50px;
                                margin-left: 400px;
                                margin-bottom: 50px;
                            }
                        }
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 576px) {
    .payment {
        .payment__content {
            padding: 70px 50px;
            .payment__left__col {
                .userWill {
                    .willHeader {
                        padding: 10px 30px;
                        h1 {
                            font-size: 35px;
                            margin-bottom: 5px;
                        }
                    }
                    .willBody {
                        padding: 30px;
                        .bodyContent {
                            p {
                                font-size: 13px;
                            }
                            .bodyFooter {
                                padding: 0 30px;
                                i {
                                    font-size: 40px;
                                    margin-left: 150px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

@media screen and (min-width: 576px) and (max-width: 768px) {
   .payment {
        .payment__content {
            padding: 70px 100px;
            .payment__left__col {
                .userWill {
                    .willHeader {
                        padding: 10px 30px;
                        h1 {
                            font-size: 40px;
                            margin-bottom: 10px;
                        }
                    }
                    .willBody {
                        padding: 30px;
                        .bodyContent {
                            p {
                                font-size: 15px;
                            }
                            .bodyFooter {
                                padding: 0 30px;
                                i {
                                    font-size: 40px;
                                    margin-left: 300px;
                                }
                            }
                        }
                    }
                }
            }
        }
    } 
}
</style>
