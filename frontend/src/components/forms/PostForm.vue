<template>
  <div class="form-container">
    <h2><i class="fas fa-user-cog label"></i>Partagez quelque chose !</h2>
    <form @submit.prevent="sendReq()" enctype="multipart/form-data">
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

      <button>Partager !</button>
    </form>
  </div>
</template>

<script>
import http from "../../http";

export default {
  name: "ProfileForm",
  data() {
    return {
      title: "",
      message: "",
      encodedUrl: "",
      file: "",
      error: "",
    }
  },
  methods: {
    sendReq() {
      let request = {
        title: this.title,
        message: this.message,
      };

      const formData = new FormData();

      if (this.$refs.file.files[0]) {
        formData.append("file", this.file);
      }

      formData.append("body", JSON.stringify(request));

      http
        .post("/posts/create", formData)
        .then((data) => {
          alert(data.data.message);
          this.$router.go();
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
  }
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
  font-size: 30px;
  color: rgb(197, 197, 197);
  margin-bottom: 15px;
}

input[type="text"] {
  width: 100%;
  border: none;
  font-size: 20px;
}

input[type="text"]:focus {
  outline: none;
}

input[type="file"] {
  color: black;
  cursor: pointer;
  font-size: 20px;
  margin-bottom: 20px;
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
  font-size: 50px;
}

h2 {
  text-align: center;
  margin-bottom: 10px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 5px 10px 2px rgb(190, 190, 190);
  position: sticky;
  top: 100px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 3px;
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
  margin: 5px auto;
  border-radius: 10px;
}

button {
  border-radius: 9999px;
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
}
</style>