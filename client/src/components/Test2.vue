<template>
	<div id="hay">
     <h2> {{titleHeader}} 
         
     </h2>
     <p>{{user.tuoi}}</p>
     <p>{{key}}</p>

	</div>
</template>

<script>
export default {
	name: "test2",
	props: {
        msg: String,
        titleHeader:String,
       
        user:Object,
     
  },
  data(){
    return {
      
    }
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
			width: 63%;
			height: 100%;
			border: 0;
			border-radius: 5px;
		}
	}
}
</style>