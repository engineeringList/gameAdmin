import Vue from "vue";
import Router from "vue-router";
import Index from "@/view/index";
import Login from "@/view/login/login";
import Article from "@/view/article";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "首页",
            component: Index,
            children: [
                {
                    path: "/article",
                    name: "文章发布",
                    component: Article
                }
            ]
        },
        {
            path : '/login',
            name : '登录页',
            component : Login
        }
    ]
});
