<template>
  <div id="app" style="width: 100%; height: 100%; background: #edeef0;">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Новости</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/tags" class="nav-link">Тэги</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addArticle" class="nav-link">Добавить статью</router-link>
        </li>
        <li class="nav-item" v-if="!localStorage.getItem('clientLogin')">
          <router-link to="/login" class="nav-link">Авторизация</router-link>
        </li>
        <li class="nav-item" v-if="localStorage.getItem('clientLogin')">
          <router-link to="/home" class="nav-link">Кабинет</router-link>
        </li>
        <li class="nav-item" v-if="localStorage.getItem('clientLogin')">
          <router-link to="/login" class="nav-link">Выход</router-link>
        </li>
      </div>
    </nav>

	<div style="height: 100%;">
      <div class="container mt-3">
		<router-view />
      </div>
	</div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Index from './components/Index.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // Index
  },
  data() {
    return {
      localStorage: localStorage
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
