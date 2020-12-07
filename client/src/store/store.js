import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'
import Swal from 'sweetalert2'

//import {setting} from '../setting'
Vue.use(Vuex, axios, Swal)

export default new Vuex.Store({
    state: {
        x: "hay",
        y: {},
        y1: '',
        z: 'cuoi',
        token: '',
        token1: '',
        kq: '',
        signinrelative: '',
        authrelative: '',
        userregister: 'fail',
        entercode: '',
        createwill: '',
        //moi UserRegister
        signCheckmail: "",
        signCheckphone: '',
        signRegisrela: '',
        signUserlogin: '',
        //to Payment
        signTopayment: '',
        signpayment: '',
        signShowstage: '',
        //Console.vue
        signTurnon: '',
        signConsolewill: '',
        signTurn: '',
        signLoginadmin: '',
        signChangeprice:'',
        signStatical:'',
        signEdituser :'',
        signTurnusername:'',
        signTurnsocialId:'',
        signTurnemail:'',
        signTurnphone:'',
        signButtonuser:'',
        signResetpass:'',
        signChangepass:'',
        signRelaseen:''



    },
    getters: {
        signMail: state => {
            return state.signCheckmail
        }
    },
    actions: {
        loadPosts({ commit }) {
            axios
                .get('http://localhost:3000/relative/api')
                .then(result => {
                    console.log(result)
                    let posts = result.data
                    commit('SET', posts)

                })
                .catch(err => console.log(err))
        },
        loadPosts1({ commit }) {
            axios
                .get('http://localhost:3000/checkEmail')
                .then(result => {
                    console.log(result)
                    let posts = result.data.mess.mang
                    commit('SET1', posts)

                })
                .catch(err => console.log(err))
        },
        loadMids({ commit }) {

            axios
                .get('http://localhost:3000/', { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
                .then(result => {
                    //  console.log(result)
                    let p = result.data
                    commit('SETMID', p)
                })
                .catch()
        },

        userRegister({ commit }, data) {

            axios.
                post('http://localhost:3000/user/register', data)
                .then(result => {
                    Swal.fire(
                        'Good job!',
                        'bạn đã đột nhập thành công',
                        'success'
                    )
                    console.log(result);

                    commit('USERREGISTER', 'success')

                })
                .catch(err => {
                    console.log(err)
                    Swal.fire(
                        'đã fail',
                        'đột nhập lại đi bạn',
                        'error'
                    )
                    commit('USERREGISTER', 'fail')
                })

        },
        // getWill({commit},data){

        //     axios.
        //     post('http://localhost:3000/user/createWill',{will:data.will},{headers:{Authorization:'Bearer ' +localStorage.getItem("token")}})
        //     .then(result =>{
        //         console.log(result)
        //         let kq = result.data;
        //         commit('CREATEWILL',kq.mess);
        //     })
        //     .catch(err=>console.log(err))
        // },
        signUpRela({ commit }, data) {
            axios.
                post('http://localhost:3000/relative/login', data)
                .then(result => {
                    //let data = {token:result.data.token,random:result.data.random}
                    if (data) {
                        localStorage.setItem("token", result.data.token);

                        console.log(result)
                        commit('SIGNINRELATIVE', result.data.random)
                        console.log('chan')
                        

                    } else {
                        console.log('loi');

                    }
                    // let kq = result.data;
                    // commit('SIGNINRELATIVE',kq.message);
                })
                .catch(err => console.log(err))
        },

        // authRelativeStore({commit,state},data){

        //     axios.
        //     post('http://localhost:3000/relative/authRelative',{code:data.code},{headers:{Authorization:`Bearer ${state.token1}`}})
        //     .then(result =>{
        //         let kq = result.data;
        //         commit('AUTHRELATIVE',kq.message);
        //     })
        //     .catch(err=>console.log(err))
        // },

        enterCode({ commit }, data) {
            axios.
                post('http://localhost:3000/relative/authRelative', { random: data.random }, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
                .then(result => {

                    let mess = result.data.message;
                    if (mess == 'success') {

                        router.push("/");
                        console.log(result)
                        commit('ENTERCODE', mess)

                    } else {
                        console.log('loi');
                        router.push("/login");
                    }
                })
                .then(err => { console.log(err) })
        },
        createWill({ commit }, data) {
            axios.post('http://localhost:3000/user/createWill', data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
                .then(result => {
                    let message = result.data.message
                    let err = result.data.err
                    if (message == 'success') {
                        Swal.fire(
                            'Good job!',
                            'bạn đã tạo di chúc công, bạn có muốn thanh toán luôn không ?',
                            'success'
                        )
                        commit('CREATEWILL1', 'success')

                    }
                    else if (err == 'forbides') {
                        Swal.fire(
                            'Good job!',
                            'bạn không được phép truy cập',
                            'error'
                        )
                        commit('CREATEWILL1', 'forbides')
                    } else {
                        Swal.fire(
                            'fail rồi nhá',
                            'tạo lại nha',
                            'error'
                        )
                    }

                })
                .catch(err => {
                    console.log(err)
                    Swal.fire(
                        'fail rồi nhá',
                        'tạo lại nha',
                        'error'
                    )
                })
        },




        //router mới Đăng nhập UserRegister

        // checkEmail({ commit }, data) {
        //     axios.post('http://localhost:3000/user/checkEmail', data)
        //         .then(result => {
        //             var data = result.data.mess
        //             console.log('success')
        //             commit('CHECKEMAIL', data)
        //         })
        //         .catch(err => {
        //             console.log(err)
        //             commit('CHECKEMAIL', 'fail')
        //         })
        // },
        checkEmail({ commit }, data) {
            axios.post('http://localhost:3000/user/checkEmail', data)
                .then(result => {
                    var data = result.data.mess
                    console.log('success')
                    commit('CHECKEMAIL', data)
                })
                .catch(err => {
                    console.log(err)
                    commit('CHECKEMAIL', 'fail')
                })
        },
        checkPhone({ commit }, data) {
            axios.post('http://localhost:3000/user/checkPhone', data)
                .then(result => {
                    var data = result.data.mess
                    console.log('success')
                    commit('CHECKPHONE', data)
                })
                .catch(err => {
                    console.log(err)
                    commit('CHECKPHONE', 'fail')
                })
        },
        regisUser({ commit }, data) {

            axios.
                post('http://localhost:3000/user/register', data)
                .then(result => {
                    let token = result.data.token;
                    if (token) {
                        localStorage.setItem("token", token);

                        console.log(result)
                        commit('USERREGISTER', 'success')
                        router.push("/RelativeRegister");

                    } else {
                        console.log('loi')

                    }



                })
                .catch(err => {
                    console.log(err)
                    Swal.fire(
                        'đã fail',
                        'đột nhập lại đi bạn',
                        'error'
                    )
                    commit('USERREGISTER', 'fail')
                })

        },
        regisUserFail() {
            
            Swal.fire(
                'đã fail',
                'đột nhập lại đi bạn',
                'error'
            )
            router.push('/userRegister')
        },
        regisRela({ commit }, data) {
            axios.post('http://localhost:3000/user/regisRela', data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
                .then(result => {
                    let mess = result.data.mess;
                 

                        commit('REGISRELA', mess)
                       
                        // Swal.fire(
                        //     'Good job!',
                        //     'bạn đã tạo di chúc công, bạn có muốn thanh toán luôn không ?',
                        //     'success'
                        // )
                        router.push("/login");


                }).catch(err => {
                    
                        Swal.fire(
                            'đã fail',
                            'đột nhập lại đi bạn',
                            'error'
                        )
                    console.log(err)
                })

        },
        userLogin({ commit }, data) {

            axios.
                post('http://localhost:3000/user/login', { username: data.username, password: data.password })
                .then(result => {


                    let token = result.data.token;
                    if (token) {
                        localStorage.setItem("token", token);
                        console.log(token)
                        router.push("/");
                        commit('USERLOGIN', 'success')

                    } else {

                        console.log('loi');
                        router.push("/login");
                    }

                }).catch(err => {
                    console.log(err)
                    localStorage.removeItem("token");
                    Swal.fire(
                        'đã fail',
                        'đột nhập lại đi bạn',
                        'error'
                    )
                })

        },
        logOut({ commit }) {
            axios.get('http://localhost:3000/user/logOut', { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            localStorage.removeItem("token");

            commit('LOGOUT')
            router.push("/login");
        },
        Payment({ commit }) {
            axios.get('http://localhost:3000/user/payment', { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
                .then(result => {

                    commit('PAYMENT', { result: result.data })
                })
                .catch(err => { console.log(err) })
            router.push("/payment");
        },
        toPayment({ commit }) {
            axios.get('http://localhost:3000/user/toPayment', { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
                .then(result => {
                    var will = result.data.will
                    commit('TOPAYMENT', will)
                })
                .catch(err => { console.log(err) })



            router.push("/payment");
        },
        showStage({ commit }) {
            axios
                .get('http://localhost:3000/user/showStage', { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
                .then(result => {
                    console.log(result)

                    commit('SHOWSTAGE', { result: result.data })

                })
                .catch(err => console.log(err))
        },
        turnonWill({ commit }) {
            axios
                .get('http://localhost:3000/user/turnonWill', { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
                .then(result => {
                    var mess = result.data.will
                    console.log(result)

                    commit('TURNONWILL', mess)

                })
                .catch(err => console.log(err))
        },
        consoleWill({ commit }, data) {
            axios
                .post('http://localhost:3000/user/consoleWill', data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
                .then(result => {

                    Swal.fire(
                        'Good job!',
                        'bạn đã cập nhập thành công',
                        'success'
                    )

                    commit('CONSOLEWILL', result.data.mess)

                })
                .catch(err => console.log(err))
        },
        loginAdmin({ commit }, data) {
            axios
                .post('http://localhost:3000/admin/login', data)
                .then(result => {
                    localStorage.setItem("token", result.data.token);



                    commit('LOGINADMIN', result.data.mess)
                    router.push("/statistical");

                })
                .catch((err) => {
                    Swal.fire(
                        'đã fail',
                        'đột nhập lại đi bạn',
                        'error'
                    )
                    console.log(err)
                })
        },
        changePrice({ commit },data) {
            axios
                .post('http://localhost:3000/admin/changePrice', data,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
                .then(result => {
                    var mess = result.data.mess
                    
                    Swal.fire(
                        'Good job!',
                        'bạn đã cập nhập giá thành công',
                        'success'
                    )

                    commit('CHANGEPRICE', mess)

                })
                .catch(err => console.log(err))
        },
        statical({ commit }) {
            axios
                .get('http://localhost:3000/admin/statical')
                .then(result => {
                    var mess = result.data.users
                  

                    commit('STATICAL', mess)

                })
                .catch(err => console.log(err))
        },
        pay() {
            
            Swal.fire(
                'Good job!',
                'bạn đã cập nhập giá thành công',
                'success',
            
            )
            router.push("/");
                  
   
        },
        editUser({ commit }) {
            axios
                .get('http://localhost:3000/user/editUser', { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
                .then(result => {
                    var mess = result.data
                    console.log(result)

                    commit('EDITUSER', mess)

                })
                .catch(err => console.log(err))
        },
        editButtonUser({ commit }, data) {
            axios
                .post('http://localhost:3000/user/editButtonUser', data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
                .then(result => {

                    Swal.fire(
                        'Good job!',
                        'bạn đã cập nhập thành công',
                        'success'
                    )
                    router.push("/");
                    commit('BUTTONUSER', result.data.mess)

                })
                .catch(err => console.log(err))
        },
        resetPass({ commit },data) {
            axios
                .put('http://localhost:3000/user/reset-password',data)
                .then(result => {
                    var mess = result.data.mess
                    Swal.fire(
                        'Good job!',
                        'bạn đã thực hiện thành công, vui lòng check email',
                        'success'
                    )
                  

                    commit('RESETPASS', mess)

                })
                .catch((err) => {
                    Swal.fire(
                        'đã fail',
                        'cập nhật thất bại',
                        'error'
                    )
                    console.log(err)})
        },
        changePass({ commit },data) {
            axios
                .put('http://localhost:3000/user/changePass/',data)
                .then(result => {
                    var mess = result.data.mess
                    Swal.fire(
                        'Good job!',
                        'bạn đã thay đổi password thành công',
                        'success'
                    )
                  

                    commit('CHANGEPASS', mess)

                })
                .catch((err) => {
                    Swal.fire(
                        'đã fail',
                        'cập nhật thất bại',
                        'error'
                    )
                    console.log(err)})
        },
        relaSeen({ commit }) {
            axios
                .get('http://localhost:3000/relative/relaSeen', { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
                .then(result => {
                    console.log(result)
                    localStorage.removeItem("token");
                    commit('RELASEEN', { result: result.data.mess })
                    router.push("/login");

                })
                .catch(err => console.log(err))
        },
        


    },



    mutations: {
        SET(state, posts) {
            state.y = posts
        },
        SET1(state, posts) {
            state.y1 = posts
        },
        SETMID(state, p) {
            state.z = p
        },
        CREATEWILL(state, kq) {
            state.kq = kq;
        },
        SIGNINRELATIVE(state, data) {
            state.signinrelative = data
        },
        AUTHRELATIVE(state, p) {
            state.authrelative = p;
        },
        LOGOUT(state) {
            state.z = '';
        },
        USERREGISTER(state, p) {
            state.userregister = p
        },
        ENTERCODE(state, p) {
            state.entercode = p;
        },
        CREATEWILL1(state, p) {
            state.createwill = p;
        },
        //router UserRegister
        CHECKEMAIL(state, data) {
            state.signCheckmail = data;
        },
        CHECKPHONE(state, data) {
            state.signCheckphone = data;
        },
        REGISRELA(state, data) {
            state.signRegisrela = data;
        },
        USERLOGIN(state, data) {
            state.signUserlogin = data
        },
        TOPAYMENT(state, data) {
            state.signTopayment = data
        },
        PAYMENT(state, data) {
            state.signpayment = data
        },
        SHOWSTAGE(state, data) {
            state.signShowstage = data
        },
        TURNONWILL(state, data) {
            state.signTurnon = data
        },
        TURNWILL(state, data) {
            state.signTurn = data
        },
        CONSOLEWILL(state, data) {
            state.signConsolewill = data
        },
        //ADmin
        LOGINADMIN(state, data) {
            state.signLoginadmin = data
        },
        CHANGEPRICE(state, data) {
            state.signChangeprice = data
        },
        STATICAL(state, data) {
            state.signStatical = data
        },
        EDITUSER(state, data) {
            state.signEdituser = data
        },
        //edit User
        TURNUSERNAME(state, data) {
            state.signTurnusername = data
        },
        
        TURNSOCIALID(state, data) {
            state.signTurnsocialId = data
        },
        TURNEMAIL(state, data) {
            state.signTurnemail = data
        },
        TURNPHONE(state, data) {
            state.signTurnphone = data
        },
        BUTTONUSER(state, data) {
            state.signButtonuser = data
        },
        RESETPASS(state, data) {
            state.signResetpass = data
        },
        CHANGEPASS(state, data) {
            state.signChangepass = data
        },
        RELASEEN(state, data) {
            state.signRelaseen = data
        },



    }
});