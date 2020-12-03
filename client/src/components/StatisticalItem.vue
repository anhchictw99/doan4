<template>
	<tr>
		<td>
			<img src="../../public/img/avatar.png" alt="" />
		</td>
		<td>
			<p id="customerName">Customer Name</p>
			<div class="outSide">
				<div class="inSide"></div>
			</div>
		</td>
		<td>
			<p>Not pay yet</p>
		</td>
		<td>
			<p id="countWill">1</p>
		</td>
		<td>
			<p id="willPrice">100 $</p>
		</td>
		<td>
			<p id="totalPrice">100$ </p>
		</td>
		<td>
			<button id="deleteButton" class="btn deleteButton action">
				Delete
			</button>
			<button id="editButton" class="btn editButton action">Edit</button>
		</td>
	</tr>
</template>

<script>
export default {
	name: "StatisticalItem",
	props: {
		msg: String,
	},
};
</script>

<style lang="scss" scoped>
$color-orange-0: #f9a825;
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