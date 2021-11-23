<template>
  <div class="form-container">
    <h2><i class="fas fa-user-cog h2label"></i>Partagez quelque chose !</h2>
    <form @submit.prevent="sendReq()" enctype="multipart/form-data">
      <label for="tilte">Titre</label>

      <div class="input">
        <div class="input-logo">
          <i class="fas fa-user-edit textLabel"></i>
        </div>
        
        <input type="text" name="title" v-model="title" />
      </div>

      <label for="message">Message</label>
      <div class="input">
        <div class="input-logo">
          <i class="fas fa-user-edit textLabel"></i>
        </div>
        
        <input type="text" name="message" v-model="message" />
      </div>


      <div class="uploadImg">
        <div class="label">
          <label for="file">Upload Image</label>
        <input type="file" ref="file" @change="previewImage()" />
        </div>
        
        <div class="image">
          <img :src="encodedUrl" alt="Aperçu de l'image"/>
        </div>
        <div class="centerImg"></div>
      </div>

      <button :disabled="disabled">Partager !</button>
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
      disabled: true,
    }
  },
  updated() {
    if ((this.title != "") & (this.message != "")) {
      this.disabled = false;
    } else {
      this.disabled = true;
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
.h2label {
  font-size: 30px;
  margin-right: 15px;
  margin-bottom: 10px;
}

.centerImg {
  width: 0px;
}
.uploadImg {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.label {
  display: flex;
  flex-direction: column;
}

input {
  font-size: 18px;
  border: 0px solid white;
  width: 100%;
}

input::placeholder {
  color: rgb(211, 211, 211);
}

input:focus {
  outline: none;
}

input:focus::placeholder {
  color: white;
}

.input {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 8px;
  border: 2px solid rgb(196, 196, 196);
  color: rgb(184, 184, 184);
  background-color: white;
}

.input:hover {
  box-shadow: 0px 0px 2px 4px rgba(184, 184, 184, 0.151);
}
.input:focus-within {
  border: 2px solid rgb(5, 113, 255);
  color: black;
}

.input-logo {
  margin-right: 10px;
}

input[type="file"] {
  color: black;
  cursor: pointer;
  font-size: 15px;
  width: 130px;
  margin-bottom: 30px;
}

h2 {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 5px 10px 2px rgb(190, 190, 190);
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
  border-radius: 10px;
  justify-self: center;

}

button {
  padding: 10px 0px;
  color: rgb(5, 113, 255);
  background-color: white;
  border: 2px solid rgb(5, 113, 255);
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  box-shadow: 0px 0px 5px 1px rgb(5, 113, 255);
}

button:disabled {
  color: rgb(192, 192, 192);
  cursor: unset;
  border: 2px solid rgb(192, 192, 192);
  background-color: rgb(238, 238, 238);
  box-shadow: 0px 0px 0px 0px white;
}

</style>