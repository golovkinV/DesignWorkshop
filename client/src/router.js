import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            alias: "/index",
            name: "index",
            component: () => import("./components/Index")
        },
        {
            path: "/addArticle",
            name: "addArticle",
            component: () => import("./components/AddArticle")
        },
        {
            path: "/addUser",
            name: "addUser",
            component: () => import("./components/AddUser")
        },
        {
            path: "/login",
            name: "login",
            component: () => import("./components/Login")
        },
        {
            path: "/home",
            name: "home",
            component: () => import("./components/Home")
        },
        {
            path: "/article/:id",
            name: "article",
            component: () => import("./components/Article")
        },
        {
            path: "/tags",
            name: "tags",
            component: () => import("./components/Tags")
        },
        {
            path: "/tag/:id",
            name: "articlesByTag",
            component: () => import("./components/ArticlesByTag")
        }

    ]
});