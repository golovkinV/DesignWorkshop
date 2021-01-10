<template>
  <div class="card">
    <img class="card-img-top" v-if="article.image" :src="article.image" alt="Card image cap" style="max-height: 300px;">
    <div class="card-body">
      <div v-if="isEditing">
        <div class="form-group">
          <label for="title">Заголовок</label>
          <input
              type="text"
              class="form-control"
              id="title"
              required
              v-model="article.title"
              name="title"
          />
        </div>

        <div class="form-group">
          <label for="content">Содержание</label>
          <textarea
              class="form-control"
              id="content"
              required
              rows="6"
              name="content"
              v-model="article.content"
          />
        </div>
        <button @click="updateArticle" class="btn btn-success" style="margin-right: 10px">Обновить статью</button>
        <button @click="deleteArticle" class="btn btn-danger">Удалить статью</button>
      </div>
      <div v-if="!isEditing">
        <h4 class="card-title">{{ article.title }}</h4>
        <p class="card-text">
          {{ article.content }}
        </p>
        <button v-if="article.user === localStorage.getItem('clientLogin') || localStorage.getItem('clientRole') === 'Admin'"
                @click="changeView()"
                class="btn btn-secondary" style="margin-right: 10px">Редактировать</button>
        <button v-if="article.user === localStorage.getItem('clientLogin') || localStorage.getItem('clientRole') === 'Admin'"
                @click="deleteArticle()"
                class="btn btn-secondary">Удалить</button>
      </div>

    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";
export default {
  name: "articleId",
  mounted() {
    this.loadData(this.$route.params.id);
  },
  data() {
    return {
      router: this.$router,
      articleId: null,
      isEditing: false,
      localStorage: localStorage,
      article: {
        id: null,
        title: '',
        image: null,
        content: '',
        user: {}
      }
    };
  },
  methods: {
    changeView() {
      this.isEditing = !this.isEditing;
    },
    loadData(articleId) {
      DataService.getArticle(articleId)
          .then(response => {
            this.article = response.data;
          })
          .catch(e => {
            console.log(e);
          });
    },

    updateArticle() {
      this.article.currentTag = this.article.tag;
      DataService.updateArticle({ data: this.article })
          .then(response => {
            console.log(response.data);
            this.loadData(this.article.id);
            this.isEditing = false;
          })
          .catch(e => {
            console.log(e);
          });
    },

    deleteArticle() {
      DataService.deleteArticle(this.article.id)
          .then(response => {
            console.log(response.data);
            this.router.push({ path: '/' })
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