<template>
  <div class="form-container">
    <h2><i class="fas fa-user-cog label"></i>Modifier le post</h2>
    <form @submit.prevent="send()" enctype="multipart/form-data">

      <label for="tilte">Titre</label>
      <div class="textInput">
        <i class="fas fa-user-edit textLabel"></i>
        <input type="text" name="title" v-model="title" />
      </div>

      <label for="message">Message</label>
      <div class="textInput">
        <i class="fas fa-user-edit textLabel"></i>
        <input type="text" name="message" v-model="message" />
      </div>

      <label for="file">Charger une image</label>
      <div class="image">
        <img :src="encodedUrl" />
      </div>
      <input type="file" ref="file" @change="previewImage()" />

      <button>Modifier</button>
    </form>
  </div>
</template>

<script>
import http from "../../http";

export default {
  name: "PostUpdateFrom",
  props: {
      Post: {
          type: Object
      }
  },
  data() {
    return {
      post: this.Post,
      title: this.Post.title,
      message: this.Post.message,
      fileUrl: this.Post.imageUrl,
      encodedUrl: this.Post.imageUrl,
      file: "",
      error: "",
    };
  },
  methods: {
    send() {

      let request = {
        id: this.post.id,
        title: this.title,
        message: this.message,
        imageUrl: this.fileUrl
      };

      const formData = new FormData();

      if (this.$refs.file.files[0]) {
        formData.append("file", this.file);
      }

      formData.append("body", JSON.stringify(request));

      http
        .put("/posts/update", formData)
        .then((data) => {
          alert(data.data.message)
            this.$router.go()
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    },
    previewImage() {
      this.file = this.$refs.file.files[0];
      let url = URL.createObjectURL(this.file);
      this.encodedUrl = url;
    },
  },
};
</script>

<style scoped>
.textLabel {
  margin-right: 15px;
}
.textInput {
  border: 2px solid rgb(197, 197, 197);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  font-size: 20px;
  color: rgb(197, 197, 197);
  margin-bottom: 25px;
}

input[type="text"] {
  width: 100%;
  border: none;
  font-size: 17px;
}

input[type="text"]:focus {
  outline: none;
}

input[type="file"] {
  color: black;
  cursor: pointer;
  font-size: 17px;
  margin-bottom: 15px;
}

.textInput:hover {
  box-shadow: 0px 0px 2px 4px rgba(184, 184, 184, 0.151);
}

.textInput:focus-within {
  border: 2px solid rgb(71, 104, 255);
  color: black;
}

.label {
  margin-right: 20px;
  font-size: 25px;
}

h2 {
  text-align: center;
  width: 70%;
  margin: 0;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  padding: 10px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 5px 10px 2px rgb(190, 190, 190);
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

img {
  height: 100%;
}

.image {
  height: 180px;
  width: 150px;
  border: 2px solid rgb(180, 180, 180);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 10px auto;
  border-radius: 10px;
}

button {
  margin-bottom: 10px;
  border-radius: 9999px;
  padding: 10px;
  font-size: 17px;
  cursor: pointer;
}
</style>