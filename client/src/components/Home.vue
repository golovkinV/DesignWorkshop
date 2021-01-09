<template>
  <div class="submit-form">
    <h2>Редактирование пользователя</h2>
    <img :src="user.avatar" style="max-width: 500px; max-height: 300px" class="img-thumbnail">
    <div class="form-group">
      <label for="firstName">Имя</label>
      <input
          type="text"
          class="form-control"
          id="firstName"
          required
          v-model="user.firstName"
          name="login"
      />
    </div>
    <div class="form-group">
      <label for="lastName">Фамилия</label>
      <input
          type="text"
          class="form-control"
          id="lastName"
          required
          v-model="user.lastName"
          name="login"
      />
    </div>
      <div class="form-group">
        <label for="login">Логин</label>
        <input
            type="text"
            class="form-control"
            id="login"
            required
            v-model="user.login"
            name="login"
        />
      </div>

    <div class="form-group">
      <label for="password">Пароль</label>
      <input
          class="form-control"
          id="password"
          required
          name="password"
      />
    </div>

    <div class="form-group">
      <label for="image">Фото</label>
      <input
          class="form-control"
          type="file"
          id="image"
          required
          v-on:change="onFileChange($event)"
          name="image"
      />
    </div>

    <button @click="editData" class="btn btn-success">Редактировать</button>
  </div>

</template>

<script>
import DataService from "../services/DataService";
export default {
  name: "login",
  mounted() {
    this.loadData();
  },
  data() {
    return {
      user: {
        id: null,
        login: "",
        password: "",
        avatar: null,
        firstName: '',
        lastName: '',
        articles: null,
        role: null
      },
      submitted: false,
      router: this.$router,
      image: null
    };
  },
  methods: {
    loadData() {
      DataService.getUser(localStorage.getItem('clientLogin'))
          .then(response => {
            if (response.data) {
              this.user = response.data;
              console.log(this.user.id);
            } else {
              this.user = {
                id: null,
                login: "",
                password: ""
              };
            }
          })
          .catch(e => {
            console.log(e);
          });
    },

    editData() {
      const data = {
        id: this.user.id,
        data: {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          login: this.user.login,
          articles: this.user.articles,
          password: this.user.password,
          role: this.user.role,
          currentRole: this.user.role
        }
      };
      if (this.image) {
        const formData = new FormData();
        formData.append('file', this.image);
        DataService.uploadImage(formData)
            .then(response => {
              this.user.avatar = response.data;
              DataService.updateUser(data)
                  .then(response => {
                    this.user.id = response.data.id;
                    alert('Успешная смена данных!');
                  })
                  .catch(e => {
                    console.log(e);
                  });
            })
            .catch(e => {
              console.log(e);
            });
      } else {
        console.log(this.user);
        DataService.updateUser(data)
            .then(response => {
              alert('Успешная смена данных!');
              this.user.id = response.data.id;
            })
            .catch(e => {
              console.log(e);
            });
      }
    },

    onFileChange(e) {
      this.image = e.target.files[0];
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 500px;
  margin: auto;
}
</style>