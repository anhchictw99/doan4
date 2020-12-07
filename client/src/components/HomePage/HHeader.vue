<template>
<div class="HHeader">
  <header>
        <div class="header__content">
            
            <nav class="navbar navbar-default navbar-expand-lg navbar-fixed-top">
                <a class="navbar-brand header__left" href="#">
                    <h1>TESTAMENT</h1>
                </a>
                
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav">
                        <!-- <li class="nav-item header__middle">
                            <ol>
                                <li><a href="#">Link 1</a></li>
                                <li><a href="#">Link 2</a></li>
                                <li><a href="#">Link 3</a></li>
                            </ol>
                        </li> -->
                        <li class="nav-item header__right">
                            <img src="../../../public/img/avatar.png" alt="" />
                            <span style="color:#f9a825">{{signShowstage.result.name}}</span>
                            <button class="btn btn-secondary btn-logout" @click="logOut" id="btnLogout">LOGOUT</button>
                            <div class="dropdown-content">
                                <ol>
                                    <li><a href="http://localhost:8080/#/console">Console</a></li>
                                    <li><a href="http://localhost:8080/#/editUser">Profile</a></li>
                                    <li><a href="#">{{signShowstage.result.state}}</a></li>
                                </ol>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'HHeader',
    props: {
        msg: String
    },
    methods:{
      userLogin(){
          var data= {
              username: this.username,
              password:this.password

          }
          this.$store.dispatch('userLogin',data)
      },
      logOut(){
          this.$store.dispatch('logOut')
           
           
      }
     
  },
  created: function () {
    this.$store.dispatch('showStage')
  },
  computed:{
    ...mapState(['signShowstage'])

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
$color-orange-0: #f9a825;
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
}

body {
    min-height: 200vh;
}

.navbar-default {
    transition: 500ms ease;
    background: transparent;
}

.navbar-default.scrolled {
    box-shadow: 0 0 15px rgba(0, 0, 0, .3);
    background: rgba(255, 255, 255, 0.85);
}

header {
    width: 100%;
    position: fixed;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0);
    .header__content {
        position: relative;
        .navbar {
            padding: 10px 40px;
            .navbar-brand {
                h1 {
                    margin: 0;
                    font-size: 40px;
                    color: $color-orange-0;
                }
            }
            #navbarSupportedContent {
                position: relative;
                .header__middle {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    ol {
                        display: flex;
                        list-style: none;
                        li {
                            display: inline-block;
                            margin-right: 25px;
                            a {
                                color: $color-orange-0;
                                text-decoration: none;
                            }
                        }
                    }
                }
                .header__right {
                    position: absolute;
                    right: 0;
                    transform: translateY(-50%);
                    img {
                        height: auto;
                        width: 30px;
                        border-radius: 25px;
                        margin-right: 5px;
                        cursor: pointer;
                    }
                    .dropdown-content {
                        display: block;
                        position: absolute;
                        padding: 10px 0;
                        width: 100px;
                        top: 120%;
                        right: 0;
                        background-color: #fff;
                        border-radius: 5px;
                        ol {
                            list-style: none;
                            li {
                                margin-top: 10px;
                                display: flex;
                                justify-content: center;
                                a {
                                    color: black;
                                    text-decoration-line: none;
                                    border-bottom: 2px solid black;
                                    transition: .3s all;
                                    &:hover {
                                        color: $color-orange-0;
                                        border-bottom: 2px solid $color-orange-0;
                                    }
                                }
                            }
                        }
                    }
                    button {
                        width: 100px;
                        color: white;
                        position: relative;
                        cursor: pointer;
                        &:hover .dropdown-content {
                            display: block;
                        }
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 575px) {
    header {
        .header__content {
            .navbar {
                padding: 10px;
                .navbar-brand {
                    h1 {
                        font-size: 20px;
                    }
                    p {
                        font-size: 10px;
                    }
                }
            }
        }
    }
}
</style>
