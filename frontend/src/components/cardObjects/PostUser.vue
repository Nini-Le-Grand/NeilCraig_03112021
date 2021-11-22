<template>
    <div class="userContainer">
        <div v-if="userDeleted" class="userDeleted">Utilisateur inconnu</div>
        <div v-else>
            <div class="userImg">
            <img :src="user.imageUrl" class="img">
        </div>
        <div class="userName">
            {{user.lastName}} {{ user.firstName}}
        </div>
        </div>
        
    </div>
</template>

<script>
import http from "../../http"

export default {
    name: "PostUser",
    props: {
        userId: {
            Number
        }
    },
    data() {
        return {
            id: this.userId,
            user: {},
            userDeleted: false
        }
    },
    mounted() {
        http
        .get(`auth/${this.id}`)
        .then(data => {
            if(data.data.length == 0) {
                this.userDeleted = true;
            } else {
                this.user = data.data[0];
            }
        })
    }

}
</script>

<style scoped>
.userName {
    font-weight: bold;
    font-size: 22px;
    color: blue;

}

.userImg {
    width: 40px;
    height: 40px;
    border: 1px solid blue;
    border-radius: 9999px;
    overflow: hidden;
    margin-right: 15px;
}

.img {
    object-fit: cover;
  height: 100%;
  width: 100%;
}

.userContainer {
    display: flex;
    align-items:center;
    margin-bottom: 10px;
}
</style>>
