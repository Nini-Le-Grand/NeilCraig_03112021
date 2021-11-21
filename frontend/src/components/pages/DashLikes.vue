<template>
    <div>
        <PostCard v-for="post in posts" :key="post.id" :postObject="post"/>
    </div>
</template>

<script>
import http from "../../http";
import PostCard from "../cards/PostCard.vue";

export default {
    name: "DashPosts",
    components: {
        PostCard
    },
    props: {
        userId_props: {
            type: Number
        }
    },
    data() {
        return {
            userId: this.userId_props,
            posts: []
        }
    },
    mounted() {
        http
        .get(`/posts/${this.userId}`)
        .then(data => {
            this.posts = data.data;
        })
    }
}
</script>