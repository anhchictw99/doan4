<template>
<div class="Payment">
    <div class="payment">
        <div class="payment__content row">
            <div class="payment__col payment__left__col text-left col-8">
                    <div class="userWill">
                        <div class="willHeader">
                            <h1>THE WILL</h1>
                            <h3>Last Will and Testament of <span class="userName">userName</span>.</h3>
                        </div>
                        <div class="willBody">
                            <div class="bodyContent">
                                <p>Location, day, month, year.</p>

                                <p>My name is <b class="userName">{{signpayment.result.payment.fullname}}</b>,</p>
                                <p >Security social number: <b class="font-weight-bold">{{signpayment.result.payment.socialId}}</b>, being of sound mind and memory, do
                                    hereby make, publish and declare the following instrument as my Last Will and
                                    Testament.
                                </p>

                                <b>Content of userWill.</b>

                                <p><b>Final Arrangements</b></p>
                                <p>User's wishes for final resting place or arrangements: ...</p>
                                <p>Kind of ceremony: ...</p>

                                <b>Witness: {{signpayment.result.will}}</b>
                                <div class="bodyFooter">
                                    <p>IN WITNESS WHEREOF, I have hereunto subscribed my name and affixed my seal this
                                        _____
                                        day
                                        of _____________________, 20__.</p>
                                    <i class="fa fa-signature"></i>
                                </div>
                            </div>
                        </div>
                    </div>

               
            </div>
            <div class="payment__col payment__right__col col-4">
                <div class="payment__table">
                    <table>
                        <tr>
                            <th>PAYMENT</th>
                        </tr>
                        <tr>
                            <td>Your Will</td>
                            <td>{{signpayment.result.payment.name}}</td>
                        </tr>
                        <tr>
                            <td>Provisional</td>
                            <td>not prive</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>{{signpayment.result.payment.price}}$</td>
                        </tr>
                        <tr>
                            <td><a href="http://localhost:8080/#/"><i class="fa fa-arrow-left"></i> Back to home</a></td>
                            <td><a href="#" @click="pay" >Pay <i class="fa fa-arrow-right"></i></a></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'Payment',
    props: {
        msg: String
    },
    data(){
        return{

        }
    },
    methods:{
        pay(){
            
            this.$store.dispatch('pay')
        }

    },
    computed:{
    ...mapState(['signTopayment','signpayment'])

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

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
    .payment__content {
        .payment__left__col {
            background-image: url(../../public/img/anh-nen-toi-hoa-van-cho-dien-thoai_101025691.jpg);
            padding: 100px 150px;

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
                                margin-left: 550px;
                                margin-bottom: 50px;
                            }
                        }
                    }
                }
            }
        }

        .payment__right__col {
            padding: 20px 50px;

            .payment__table {
                width: 100%;

                table {
                    margin: 0;
                    width: 100%;

                    td,
                    th {
                        padding: 10px 0;

                        a {
                            color: $color-orange-0;
                        }
                    }
                }
            }
        }
    }
}
</style>
