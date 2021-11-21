<template>
    <div class="page">
        <div class="banner">
            <Banner />
        </div>
        <div class="connexion">
            <header>
                <h1>
                    Bienvenue sur votre réseau social interne !
                </h1>
            </header>
            <div class="connexionCard">
                <LoginForm v-if="access" />
                <SigninForm v-else  @changePage="updateAccess"/>
                
                <nav>
                    <button @click="showSigninForm()">S'inscrire</button>
                    <button @click="showLoginForm()">Se connecter</button>
                </nav>
            
            </div>
            
        </div>
    </div>
</template>

<script>
import Banner from "@/components/Banner.vue";
import SigninForm from "../../components/forms/SigninForm.vue";
import LoginForm from "../../components/forms/LoginForm.vue"

export default {
    name: "Connexion",
    components: { Banner, SigninForm, LoginForm },
    data() {
        return {
            access: true
        }
    },
    methods: {
        showSigninForm() {
            this.access = false;
        },
        showLoginForm() {
            this.access = true;
        },
        updateAccess(payload) {
            this.access = payload.value
        }
    }
}
</script>

<style scoped>
    h1 {
        text-align: center;
        margin-bottom: 20px;
        font-size: 35px;
    }
    a {
        text-decoration: none;
        color: black;
        font-weight: bold;
        box-shadow: 0px 0px 2px 2px rgba(172, 171, 171, 0.356);
        font-size: 20px;
        padding: 10px 0px;
        width: 47%;
        border-radius: 5px;
    }
    a:hover {
        color: blue;
        box-shadow: 0px 0px 2px 2px blue;
    }
    .selected {
        color: white;
        background-color: blue;
    }

    .selected:hover {
        color: white;
    }
    nav {
        text-align: center;
        display: flex;
        justify-content: space-between;
    }
    img {
        width: 300px;
    }
    .logo {
        text-align: center;
    }
    .page {
        display: flex;
    }
    .banner {
        background-position: center;
        justify-content: center;
        align-items: center;
        width: 60%;
        height: 100vh;
    }
    .connexion {
        width: 900px;
        padding: 16px;
        background-color: rgba(0, 102, 255, 0.356);
    }

    .card {
        background-color: white;
        border-radius: 5px;
        padding: 20px;
        width: 70%;
        margin: auto;
        box-shadow: 0px 0px 10px 4px rgb(216, 216, 216);
    }
</style>
