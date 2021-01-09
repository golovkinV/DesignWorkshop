<template>
  <div class="submit-form">
    <h2>Регистрация пользователя</h2>
    <div v-if="!submitted">
      <div class="form-group">
        <label for="firstName">Имя</label>
        <input
            type="text"
            class="form-control"
            id="firstName"
            required
            v-model="user.firstName"
            name="firstName"
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
            name="lastName"
        />
      </div>
      <div class="form-group">
        <label for="title">Логин</label>
        <input
            type="text"
            class="form-control"
            id="title"
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
            v-model="user.password"
            name="password"
        />
      </div>

      <div class="form-group">
        <label for="password">Роль</label>
        <select class="form-control"
                id="role"
                required
                v-model="user.role"
                name="role">
          <option v-for="role in roles" :value="role.id" :key="role.id">
            {{ role.name }}
          </option>
        </select>
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

      <button @click="createUser" class="btn btn-success">Регистрация</button>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "add-user",
  mounted() {
    this.loadRoles();
  },
  data() {
    return {
      user: {
        id: null,
        firstName: "",
        lastName: "",
        login: "",
        password: "",
        image: null
      },
      roles: null,
      submitted: false,
      router: this.$router
    };
  },
  methods: {
    createUser() {
      const data = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        login: this.user.login,
        password: this.user.password,
        avatar: null,
        role: this.user.role || null
      };

      console.log(this.user.role);

      const formData = new FormData();
      console.log(this.user.image);
      formData.append('file', this.user.image);
      DataService.uploadImage(formData)
          .then(response => {
            this.user.avatar = response.data;
            data.avatar = this.user.avatar;
            console.log(response.data);
            DataService.createUser(data)
                .then(response => {
                  this.user.id = response.data.id;
                  console.log(response.data);
                  localStorage.setItem('clientLogin', this.user.id)
                  this.submitted = true;
                  this.router.push({ path: 'home' })
                })
                .catch(e => {
                  console.log(e);
                });
          })
          .catch(e => {
            console.log(e);
          });
    },

    onFileChange(e) {
      this.user.image = e.target.files[0];
    },
    loadRoles() {
      DataService.getAllRoles()
          .then(response => {
            this.roles = response.data;
          })
          .catch(e => {
            console.log(e);
          });
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