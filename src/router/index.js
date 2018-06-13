import Vue from "vue";
import Router from "vue-router";
import Index from "@/view/index";
import Login from "@/view/login/login";
import Article from "@/view/article";
import Home from "@/view/home";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "首页",
            component: Index,
            redirect: 'home',
            children: [
                {
                    path: "/",
                    name: "首页",
                    component: Home
                }
            ]
        },
        {
            path: "/",
            name: "文章管理",
            component: Index,
            redirect: 'article',
            children: [
                {
                    path: "/article",
                    name: "文章管理",
                    component: Article
                }
            ]
        },
        // {
        //     path: "/",
        //     name: "首页",
        //     component: Index,
        //     redirect: 'article',
        //     children: [
        //         {
        //             path: "/article",
        //             name: "文章发布",
        //             component: Article
        //         }
        //     ]
        // },
        {
            path : '/login',
            name : '登录页',
            component : Login
        }
    ]
});
