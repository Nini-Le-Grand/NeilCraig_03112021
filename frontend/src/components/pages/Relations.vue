<template>
    <div class="container">
        <h2>Relations</h2>
        <RelationCard v-for="follow in follows" :key="follow.id" :partner="follow"/>
    </div>
</template>

<script>
import http from "../../http";
import RelationCard from "../cards/RelationCard.vue";
export default {
    name: "Relations",
    props: {
        userId: {
            type: Number
        }
    },
    components: {
        RelationCard
    },
    data() {
        return {
            id: this.userId,
            follows: ""
        }
    },
    mounted() {
        http
        .get(`userlink/user/${this.id}`)
        .then(data => {
            this.follows = data.data
        })
    }
}
</script>

<style scoped>
.container {
    padding: 20px;
    border-radius: 15px;
    background-color: white;
    box-shadow: 0px 5px 10px 2px rgb(206, 206, 206);
}
</style>