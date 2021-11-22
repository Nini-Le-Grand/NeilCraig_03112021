<template>
    <div class="container">
        <h2>Activités</h2>
        <nav>
            <button class="nav" @click="showPosts()" :class="{ selected: posts }">
                Posts
            </button>
            <button class="nav" @click="showComments()" :class="{ selected: comments }">
                Commentaires
            </button>
            <button class="nav" @click="showLikes()" :class="{ selected: likes }">
                Likes
            </button>
        </nav>
        <div class="content">
            <div v-if="posts">
                <DashPosts :userId_props="userId" />
            </div>
            <div v-if="comments">
                <DashComments :userId_props="userId" />
            </div>
            <div v-if="likes">
                <DashLikes :userId_props="userId" />
            </div>
        </div>
    </div>
</template>

<script>
import DashPosts from "../pages/DashPosts.vue";
import DashComments from "../pages/DashComments.vue";
import DashLikes from "../pages/DashLikes.vue";

export default {
    name: "Activity",
    components: {
        DashPosts,
        DashComments,
        DashLikes
    },
    props: {
        userId_props: {
            type: Number
        }
    },
    data() {
        return {
            userId: this.userId_props,
            posts: true,
            comments: false,
            likes: false
        }
    },
     beforeUpdate() {
    this.userId = this.userId_props;
     },
    methods: {
        showPosts() {
            this.comments = false;
            this.likes = false;
            this.posts = true;
        },
        showComments() {
            this.posts = false;
            this.likes = false;
            this.comments = true;
        },
        showLikes() {
            this.posts = false;
            this.comments = false;
            this.likes = true;
        }
    }

}
</script>

<style scoped>
    .content {
        margin-top: 20px;
    }

   .container {
       display: flex;
       flex-direction: column;
       background-color: white;
       padding: 15px;
       border-radius: 15px;
       
   }
   h2 {
       text-align: center;
       margin-bottom: 15px;
   }
   nav {
       display: flex;
       justify-content: center;
       box-shadow: 0px 0px 6px 2px rgb(206, 206, 206);
       border-radius: 10px;
       overflow: hidden;
   }
.nav {
    flex:1;
    text-align: center;
    padding: 8px 0px;
    border: 0;
    background-color: white;
    cursor: pointer;
}

.nav:hover {
    background-color: rgb(241, 241, 241);
    font-weight: bold;
    color: blue;
}

.selected {
        background-color: rgb(45, 136, 255);
        font-weight: bold;
        color: white;
    }

    .selected:hover {
        background-color: rgb(45, 136, 255);
        font-weight: bold;
        color: white;
    }

</style>