<template>
  <div class="follow">
    <span class="label">Suivre</span>
    <label class="switch">
      <input
        type="checkbox"
        @change="changeState()"
        v-model="follow"
        :checked="follow"
      />
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script>
import http from "../../http";

export default {
  name: "Followbtn",
  data() {
    return {
      followId: "",
      follow: false,
    };
  },
  props: {
    partnerId: {
      type: Number,
    },
  },
  created() {
    http
      .get(`/userlink/partner/${this.partnerId}`)
      .then((data) => {
        if (data.data[0]) {
          this.follow = true;
          this.followId = data.data[0].id;
        }
      })
      .catch((err) => {
        alert(err);
      });
  },

  methods: {
    changeState() {
      const request = {
        partnerId: this.partnerId,
      };
      if (this.follow) {
        http
          .post("/userlink/follow", request)
          .then((data) => {
            if (data) {
              this.followId = data.data.insertId;
              console.log("Userlink créé !");
            }
          })
      }
      if (!this.follow) {
        http
          .delete(`/userlink/unfollow/${this.followId}`, request)
          .then((data) => {
            if (data) {
              console.log("Userlink supprimé !");
            }
          })
      }
    },
  },
};
</script>

<style scoped>
.follow {
  border-top: 2px solid grey;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>