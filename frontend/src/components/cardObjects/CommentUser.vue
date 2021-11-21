<template>
    <router-link :to="'/users/'+user.id">
        {{ user.firstName }} {{ user.lastName }}
    </router-link>
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
            user: {}
        }
    },
    mounted() {
        http
        .get(`/auth/${this.userId}`)
        .then(data => {
            this.user = data.data[0]
        })
    }
}
</script>

<style scoped>
a {
    color: rgb(0, 60, 255);
    font-size: 14px;
    font-weight: bold;
}
a:hover {
    text-decoration: underline;
}
</style>