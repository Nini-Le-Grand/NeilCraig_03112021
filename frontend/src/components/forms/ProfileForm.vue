<template>
  <div class="form-container">
    <h2><i class="fas fa-user-cog h2label"></i>Modifier le profil</h2>
    <form @submit.prevent="send()" enctype="multipart/form-data">
      <label for="lastName">Nom</label>
      <div class="input">
        <div class="input-logo">
          <i class="fas fa-user-edit "></i>
        </div>
        <input type="text" name="lastName" v-model="lastName" />
      </div>

      <label for="firstName">Prénom</label>
      <div class="input">
        <div class="input-logo">
          <i class="fas fa-user-edit "></i>
        </div>
        <input type="text" name="firstName" v-model="firstName" />
      </div>

      <label for="position">Poste occupé</label>
      <div class="input">
        <div class="input-logo">
          <i class="fas fa-user-tie "></i>
        </div>
        <input type="text" name="position" v-model="position" />
      </div>

      <label for="description">Description</label>
      <div class="input">
        <div class="input-logo">
          <i class="fas fa-user-tag "></i>
        </div>
        <input type="text" name="description" v-model="description" />
      </div>

      <div class="uploadImg">
        <div class="label">
          <label for="file">Upload Image</label>
        <input type="file" ref="file" @change="previewImage()" />
        </div>
        
        <div class="image">
          <img :src="encodedUrl" />
        </div>
        <div class="centerImg"></div>
      </div>

      <button :disabled="disabled">Modifier le profil</button>
    </form>
  </div>
</template>



<style scoped>
.h2label {
  font-size: 30px;
  margin-right: 15px;
}

.centerImg {
  width: 130px;
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
  margin: 0px 30px;
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

@media all and (max-width: 953px) {
  .form-container {
  margin: 0px 0px;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 5px 10px 2px rgb(190, 190, 190);
}
}
</style>

<script>
import http from "../../http";
import { mapMutations } from "vuex";

export default {
  name: "ProfileForm",
  data() {
    return {
      lastName: this.$store.state.lastName,
      firstName: this.$store.state.firstName,
      position: this.$store.state.position,
      description: this.$store.state.description,
      imageUrl: this.$store.state.imageUrl,
      encodedUrl: this.$store.state.imageUrl,
      file: "",
      error: "",
      disabled: true,
    };
  },
  updated() {
    if ((this.firstName != "") & (this.lastName != "") & (this.position != "") & (this.description != "")) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  },
  methods: {
    ...mapMutations(["refreshPicture", "refreshProfile"]),
    send() {
      let request = {
        lastName: this.lastName,
        firstName: this.firstName,
        position: this.position,
        description: this.description,
        imageUrl: this.imageUrl,
      };
      const formData = new FormData();
      if (this.$refs.file.files[0]) {
        formData.append("file", this.file);
      }
      formData.append("body", JSON.stringify(request));
      http
        .put("/auth/updateProfile", formData)
        .then((data) => {
          this.refreshProfile(data.data.body);
          if (data.data.imageUrl) {
            this.refreshPicture(data.data.imageUrl);
          }
          alert(data.data.message);
          this.$router.push("Home");
        })
        .catch((err) => {
          alert(err.response.data);
        });
    },
    previewImage() {
      this.file = this.$refs.file.files[0];
      let url = URL.createObjectURL(this.$refs.file.files[0]);
      this.encodedUrl = url;
    },
  },
};
</script>