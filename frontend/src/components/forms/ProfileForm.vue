<template>
  <div class="form-container">
    <h2><i class="fas fa-user-cog label"></i>Modifier le profil</h2>
    <form @submit.prevent="send()" enctype="multipart/form-data">
      <label for="lastName">Nom</label>
      <div class="textInput">
        <i class="fas fa-user-edit textLabel"></i>
        <input type="text" name="lastName" v-model="lastName" />
      </div>

      <label for="firstName">Prénom</label>
      <div class="textInput">
        <i class="fas fa-user-edit textLabel"></i>
        <input
          type="text"
          name="firstName"
          v-model="firstName"
        />
      </div>

      <label for="position">Poste occupé</label>
      <div class="textInput">
        <i class="fas fa-user-tie textLabel"></i>
        <input type="text" name="position" v-model="position" />
      </div>

      <label for="description">Description</label>
      <div class="textInput">
        <i class="fas fa-user-tag textLabel"></i>
        <input
          type="text"
          name="description"
          v-model="description"
        />
      </div>

      <label for="file">Upload Image</label>
      <div class="image">
        <img :src="encodedUrl" />
      </div>
      <input type="file" ref="file" @change="previewImage()" />

      <button>Modifier le profil</button>
    </form>
  </div>
</template>

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
    };
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
  margin-bottom: 25px;
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
  margin-bottom: 30px;
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
  margin-bottom: 20px;
  height: 60px;
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
  margin-bottom: 5px;
}

img {
  height: 100%;
}

.image {
  height: 280px;
  width: 250px;
  border: 2px solid rgb(180, 180, 180);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 20px auto;
  border-radius: 10px;
}

button {
  margin-bottom: 20px;
  border-radius: 9999px;
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
}
</style>