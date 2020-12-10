import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/HomePage/Home";
import Login from "@/components/Login";
import Payment from "@/components/Payment";
import EditRelative from "@/components/EditRelative";
import EditUser from "@/components/EditUser";
import Will from "@/components/Will";
import LastCheck from "@/components/LastCheck";
import ResetPass from "@/components/ResetPass";
import ForgotPass from "@/components/ForgotPass";
import AdminLogin from "@/components/AdminLogin";
import Console from "@/components/Console";
import ConsoleRela from "@/components/ConsoleRela";
import UserRegister from "@/components/UserRegister";
import RelativeRegister from "@/components/RelativeRegister";
import Witnesses from "@/components/Witnesses";
import Statistical from "../components/Statistical.vue"
import StatisticalItem from "../components/StatisticalItem.vue"
import Test from "@/components/Test";
import Test2 from "@/components/Test2";
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
			path: "/statisticalItem",
			name: "StatisticalItem",
			component: StatisticalItem,
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
			path: "/consoleRela",
			name: "ConsoleRela",
			meta: {
				requiresAuth: true 
			},
			component: ConsoleRela,
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
			path: "/test2",
			name: "Test2",
			component: Test2,
		},
		{
			path: "/witnesses",
			name: "Witnesses",
			meta: {
				requiresAuth: true 
			},
			component: Witnesses,
		},
		{
			path: "/lastCheck/:id",
			name: "LastCheck",
			component: LastCheck,
		},
	],
});
