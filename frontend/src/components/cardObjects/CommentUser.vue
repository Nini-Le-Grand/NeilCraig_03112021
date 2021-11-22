<template>
<div>
    <div v-if="userDeleted" class="userDeleted">
        Utilisateur inconnu
    </div>
    <router-link v-else :to="'/user/'+user.id">
        {{ user.firstName }} {{ user.lastName }}
    </router-link>
</div>
    
</template>

<script>
import http from "../../http";

export default {
    name: "CommentUser",
    props: {
        userId_props: {
            type: Number
        }
    },
    data() {
        return {
            userId: this.userId_props,
            user: {},
            userDeleted: false
        }
    },
    mounted() {
        http
        .get(`/auth/${this.userId}`)
        .then(data => {
            if(data.data.length ==0) {
                this.userDeleted = true
            } else {
                this.user = data.data[0]
            }
        })
    }
}
</script>

<style scoped>
.userDeleted {
    font-size: 14px;
}

a {
    color: rgb(0, 60, 255);
    font-size: 14px;
    font-weight: bold;
}
a:hover {
    text-decoration: underline;
}
</style>