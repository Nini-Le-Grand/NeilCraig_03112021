<template>
  <div class="form-container">
    <h2><i class="fas fa-user-slash label"></i>Supprimer le compte</h2>
    <div class="logo">
      <i class="fas fa-ban"></i>
    </div>
    <div class="button">
      <button @click="sendReq()">Supprimer le compte</button>
    </div>
  </div>
</template>

<script>
import http from "../../http";

export default {
  name: "DeleteUserCard",
  methods: {
    sendReq() {
      if (confirm("Êtes-vous sûrs de vouloir supprimer votre compte ?")) {
        let filename = this.$store.state.imageUrl;
        filename = filename.split("users/")[1]
        http
          .delete(`/auth/delete/${filename}`)
          .then((data) => {
            if (data) {
              alert("Utilisateur supprimé !");
              this.$router.push("/")
            }
          })
          .catch((err) => alert(err.response.data.error));
      }
    },
  },
};
</script>

<style scoped>
button {
  padding: 10px 0px;
  color: rgb(5, 113, 255);
  background-color: white;
  border: 2px solid rgb(5, 113, 255);
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
}

button:hover {
  box-shadow: 0px 0px 5px 1px rgb(5, 113, 255);
}
.logo {
  font-size: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
  color: red;
}
.form-container {
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 5px 10px 2px rgb(190, 190, 190);
}
.label {
  font-size: 30px;
  margin-right: 5px;
}

h2 {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3px;
}
</style>