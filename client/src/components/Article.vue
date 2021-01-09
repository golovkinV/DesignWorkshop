<template>
  <div class="card">
    <img class="card-img-top" v-if="article.image" :src="article.image" alt="Card image cap" style="max-height: 300px;">
    <div class="card-body">
      <h4 class="card-title">{{ article.title }}</h4>
      <p class="card-text">
        {{ article.content }}
      </p>
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
      article: {
        id: null,
        title: '',
        image: null,
        content: ''
      }
    };
  },
  methods: {
    loadData(articleId) {
      DataService.getArticle(articleId)
          .then(response => {
            this.article = response.data;
          })
          .catch(e => {
            console.log(e);
          });
    },

    editData() {
      this.loadData();
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