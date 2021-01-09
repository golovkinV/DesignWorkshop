import http from "../http-common";

class DataService {
    getAllUsers() {
        return http.get("/user/all");
    }

    createUser(data) {
        return http.post("/user", data);
    }

    login(data) {
        return http.post("/user/login", data);
    }

    uploadImage(data) {
        return http.post("/image/upload", data, { headers: {'Content-Type': 'multipart/form-data'}});
    }

    addArticle(data) {
        return http.post(`/article/${data.userId}`, data);
    }

    getAllArticles() {
        return http.get(`/article/all`);
    }

    getArticlesByTag(id) {
        return http.get(`/tag/${id}`);
    }

    getAllTags() {
        return http.get(`/tag/all`);
    }

    getUser(id) {
        return http.get(`/user/${id}`);
    }

    updateUser(data) {
        return http.put(`/user/${data.id}`, data);
    }

    getArticle(id) {
        return http.get(`/article/${id}`);
    }

    getAllRoles() {
        return http.get(`/role/all`);
    }

    create(data) {
        return http.post("/tutorials", data);
    }

    update(id, data) {
        return http.put(`/tutorials/${id}`, data);
    }

    delete(id) {
        return http.delete(`/tutorials/${id}`);
    }

    deleteAll() {
        return http.delete(`/tutorials`);
    }

    findByTitle(title) {
        return http.get(`/tutorials?title=${title}`);
    }
}

export default new DataService();