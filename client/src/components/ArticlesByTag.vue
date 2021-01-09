<template>
  <div>
    <h1> Новости по теме {{ article }}</h1>
    <div class="card article-block" v-for="(article, index) in articles" :key="index" style="margin-bottom: 15px; box-shadow: 0 1px 3px rgba(34, 25, 25, 0.4)">
      <div v-if="article">
        <h3 class="card-header" @click="openArticle(article._id)">{{ article.title }}</h3>
        <!--
        <img :src="article.image" style="max-height: 150px; ">
        -->
        <div class="card-body">
          <p class="card-text">{{ article.content.substring(0, 120) }}...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";
export default {
  name: "articlesByTag",
  mounted() {
    this.getArticlesByTag(this.$route.params.id);
  },
  data() {
    return {
      articles: null,
      router: this.$router,
      article: null
    };
  },
  methods: {
    getArticlesByTag(id) {
      DataService.getArticlesByTag(id)
          .then(response => {
            this.articles = response.data.articles;
            this.article = response.data.name;
          })
          .catch(e => {
            console.log(e);
            alert('Что-то пошло не так...');
          });
    },
    openArticle(id) {
      this.router.push({ path: `/article/${id}` })
    }
  }
};
</script>

<style>
.article-block {
  max-width: 800px;
  margin: auto;
}
</style>