<template>
	<div>
		<div class="registerForm">
			<form id="registerForm" action="">
				<h1>Relative register</h1>
				<div class="registerInfo relativeName">
					<label for="relativeName">Relative Name  </label>
					<input
						type="text"
						id="name"
						v-model="name"
						placeholder="Enter relative name ..."
					/>
				</div>
				<div class="registerInfo socialID">
					<label for="socialID">Social ID </label>
					<input
						type="text"
						id="socialID"
						v-model="socialId"
						placeholder="Enter social id ..."
					/>
				</div>
				<div class="registerInfo email">
					<label for="email">Email </label>
					<input
						type="text"
						id="email"
						v-model="email"
						placeholder="Enter email ..."
					/>
				</div>
				<div class="registerInfo phoneNumber">
					<label for="phoneNumber">Phone number </label>
					<input
						type="text"
						id="phoneNumber"
						v-model="phone"
						placeholder="Enter phone number ..."
					/>
				</div>
				<h3>Secrity questions</h3>
				<p>Question 1: <span>This is first question !</span></p>
				<input
					class="answer"
					type="text"
					v-model="question1"
					placeholder="Enter your answer ..."
				/>
				<p>Question 2: <span>This is second question !</span></p>
				<input
					class="answer"
					type="text"
					v-model="question2"
					placeholder="Enter your answer ..."
				/>
				<p>Question 3: <span>This is third question !</span></p>
				<input
					class="answer"
					type="text"
					v-model="question3"
					placeholder="Enter your answer ..."
				/>
				<div class="willDuration">
					<input
						type="radio"
						v-model='picked'
						id="3months"
						value="month3"
						checked
					/>
					<label for="month3">3 Months</label>
					<input type="radio" v-model='picked' id="6months" value="month6"/>
					<label for="month6">6 Months</label>
					<input type="radio" v-model='picked' id="1year" value="year1"/>
					<label for="year1">1 Year</label>
				</div>
				<button class="btn" @click="homeRela"> >Back to User</button>
				<button class="btn" @click="regisRela">Continue</button>
			</form>
		</div>
		<!-- The Modal -->
		<div class="modal" id="verifyModal">
			<div class="modal-dialog">
				<div class="modal-content">
					<!-- Modal Header -->
					<div class="modal-header">
						<h3>Verify your email</h3>
						<button
							type="button"
							class="close"
							data-dismiss="modal"
						>
							&times;
						</button>
					</div>

					<!-- Modal body -->
					<div class="modal-body">
						<input
							type="text"
							name=""
							id="verifyCode"
							placeholder="Enter your code ..."
						/>
						<p  class="alert alert-danger">
							Your verify code is not correct !
						</p>
						<a href="#">Haven't recieve verify code yet ?</a>
					</div>

					<!-- Modal footer -->
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-danger"
							data-dismiss="modal"
						>
							Verify
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
	name: "RelativeRegister",
	props: {
		msg: String,
	},
	data(){
        return {
        name:'',
        socialId:'',
        email:'',
		phone:'',
		question1:'',
		question2:'',
		question3:'',
		picked:''
    }
  },
  methods:{
    regisRela(){
        var data = {
			name:this.name,
            socialId:this.socialId,
			email:this.email,
			phone:this.phone,
			question1:this.question1,
			question2:this.question2,
			question3:this.question3,
			month:this.picked
		}
        this.$store.dispatch('regisRela',data)
		},
		homeRela(){
			this.$router.push('/userRegister')
		}
	},
   
	computed:{
    ...mapState(['signRegisrela'])

  }
};
</script>

<style lang="scss" scoped>
$color-orange-0:#f9a825;
.registerForm {
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-image: url("/../img/AdobeStock_225477140.jpg");
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
		h3 {
			display: block;
			color: $color-orange-0;
			margin-top: 10px;
		}
		p {
			color: white;
			margin: 0;
		}
		.answer {
			padding: 20px 0 2px 0;
			border: 0;
			margin-bottom: 5px;
			color: white;
			background-color: transparent;
			border-bottom: 2px solid black;
			&::placeholder {
				color: white;
			}
			&:focus {
				outline: none;
				box-shadow: none;
			}
		}
		.willDuration {
			margin-top: 20px;
			label {
				margin-right: 25px;
				color: white;
			}
		}
		button {
			color: $color-orange-0;
			padding: 0;
			margin-right: 25px;
		}
	}
}

#verifyModal {
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