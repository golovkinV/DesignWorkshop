<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center"
          v-for="(tag, index) in tags" :key="index" style="margin-bottom: 15px">
        {{ tag.name}}
        <div>
          <span class="badge badge-primary badge-pill" style="margin-right: 10px"> {{ tag.articles.length }}</span>
          <button class="badge badge-secondary badge-pill" @click="openTag(tag.id)"> Показать статьи</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import DataService from "../services/DataService";
export default {
  name: "tags",
  mounted() {
    this.getAllArticles();
  },
  data() {
    return {
      tags: null,
      router: this.$router
    };
  },
  methods: {
    getAllArticles() {
      DataService.getAllTags()
          .then(response => {
            this.tags = response.data;
          })
          .catch(e => {
            console.log(e);
            alert('Что-то пошло не так...');
          });
    },
    openTag(id) {
      this.router.push({ path: `tag/${id}` })
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