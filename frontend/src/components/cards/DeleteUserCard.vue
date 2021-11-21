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
              this.$router.push("Connexion")
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
  margin-bottom: 20px;
  border-radius: 9999px;
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
  width: 100%;
}
.logo {
  font-size: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  color: red;
}
.form-container {
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 5px 10px 2px rgb(190, 190, 190);
}
h2 {
  text-align: center;
  margin-bottom: 20px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.label {
  margin-right: 20px;
  font-size: 50px;
}
</style>