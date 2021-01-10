<template>
  <div class="submit-form">
    <h2>Добавление статьи</h2>
    <div>
      <div class="form-group">
        <label for="firstName">Заголовок</label>
        <input
            type="text"
            class="form-control"
            id="firstName"
            required
            v-model="article.title"
            name="firstName"
        />
      </div>
      <div class="form-group">
        <label for="lastName">Краткое описание(120 символов)</label>
        <input
            type="text"
            class="form-control"
            id="lastName"
            required
            v-model="article.lastName"
            name="lastName"
        />
      </div>
      <div class="form-group">
        <label for="title">Текст статьи</label>
        <textarea
            type="text"
            class="form-control"
            id="title"
            required
            rows="6"
            v-model="article.content"
            name="login"
        />
      </div>

      <div class="form-group">
        <label for="tag">Тематика</label>
        <select class="form-control"
                id="tag"
                required
                v-model="article.tag"
                name="role">
          <option v-for="tag in tags" :value="tag.id" :key="tag.id">
            {{ tag.name }}
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

      <button @click="addArticle" class="btn btn-success">Добавить статью</button>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "add-article",
  mounted() {
    this.loadTags();
  },
  data() {
    return {
      article: {
        id: null,
        title: '',
        content: '',
        image: '',
        tag: null
      },
      tags: null,
      router: this.$router
    };
  },
  methods: {
    addArticle() {
      const data = {
        title: this.article.title,
        content: this.article.content,
        image: this.article.image,
        tag: this.article.tag,
        userId: localStorage.getItem('clientLogin')
      };

      if (this.article.image) {
        const formData = new FormData();
        formData.append('file', this.article.image);
        DataService.uploadImage(formData)
            .then(response => {
              this.article.image = response.data;
              data.image = this.article.image;
              DataService.addArticle(data)
                  .then(response => {
                    this.article.id = response.data.id;
                  })
                  .catch(e => {
                    console.log(e);
                  });
            })
            .catch(e => {
              console.log(e);
            });
      } else {
        DataService.addArticle(data)
            .then(response => {
              this.article.id = response.data.id;
            })
            .catch(e => {
              console.log(e);
            });
      }
    },
    onFileChange(e) {
      this.article.image = e.target.files[0];
    },
    loadTags() {
      DataService.getAllTags()
          .then(response => {
            this.tags = response.data;
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
};
</script>

<style>
.submit-form {
  max-width: 500px;
  margin: auto;
}
</style>