import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/HomePage/Home";
import Login from "@/components/Login";
import Payment from "@/components/Payment";
import EditRelative from "@/components/EditRelative";
import EditUser from "@/components/EditUser";
import Will from "@/components/Will";
import ResetPass from "@/components/ResetPass";
import ForgotPass from "@/components/ForgotPass";
import AdminLogin from "@/components/AdminLogin";
import Console from "@/components/Console";
import UserRegister from "@/components/UserRegister";
import RelativeRegister from "@/components/RelativeRegister";
import Witnesses from "@/components/Witnesses";
import Statistical from "../components/Statistical.vue"
import Test from "@/components/Test";
Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			name: "Home",
			component: Home,
			meta: {
				requiresAuth: true 
			}
		},
		{
			path: "/adminLogin",
			name: "AdminLogin",
			component: AdminLogin,
		},
		{
			path: "/editUser",
			name: "EditUser",
			component: EditUser,
		},
		{
			path: "/editRelative",
			name: "EditRelative",
			component: EditRelative,
		},
		{
			path: "/login",
			name: "Login",
			component: Login,
		},
		{
			path: '/resetPass/:id',
			name: "ResetPass",
			component: ResetPass,
		},
		{
			path: "/forgotPass",
			name: "ForgotPass",
			component: ForgotPass,
		},
		{
			path: "/statistical",
			name: "Statistical",
			component: Statistical,
		},
		{
			path: "/relativeRegister",
			name: "RelativeRegister",
			component: RelativeRegister,
		},
		{
			path: "/userRegister",
			name: "UserRegister",
			component: UserRegister,
		},
		{
			path: "/payment",
			name: "Payment",
			component: Payment,
		},
		{
			path: "/console",
			name: "Console",
			meta: {
				requiresAuth: true 
			},
			component: Console,
		},
		{
			path: "/will",
			name: "Will",
			component: Will,
		},
		{
			path: "/test",
			name: "Test",
			component: Test,
		},
		{
			path: "/witnesses",
			name: "Witnesses",
			meta: {
				requiresAuth: true 
			},
			component: Witnesses,
		},
	],
});
