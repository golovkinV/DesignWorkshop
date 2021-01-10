<template>
  <div class="submit-form">
    <h2>Авторизация пользователя</h2>
    <div v-if="!submitted">
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
            v-model="user.password"
            name="password"
        />
      </div>

      <button @click="login" class="btn btn-success">Войти</button>
      <button @click="register" class="btn btn-danger">Регистрация</button>
    </div>

  </div>
</template>

<script>
import DataService from "../services/DataService";
export default {
  name: "login",
  mounted() {
    localStorage.removeItem('clientLogin');
    localStorage.removeItem('clientRole');
  },
  data() {
    return {
      user: {
        id: null,
        login: "",
        password: ""
      },
      submitted: false,
      router: this.$router
    };
  },
  methods: {
    login() {
      const data = {
        login: this.user.login,
        password: this.user.password,
      };
      console.log(this.user.login)
      DataService.login(data)
          .then(response => {
            this.user = response.data;
            this.user.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
            this.router.push({ path: 'home' });
            localStorage.setItem('clientLogin', this.user.id);
            localStorage.setItem('clientRole', this.user.role.name);
          })
          .catch(e => {
            console.log(e);
            alert('Что-то пошло не так...');
          });
    },

    register() {
      this.router.push({ path: 'addUser' })
    },
  }
};
</script>

<style>
.submit-form {
  max-width: 500px;
  margin: auto;
}
</style>