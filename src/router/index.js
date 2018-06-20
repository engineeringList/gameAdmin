import Vue from "vue";
import Router from "vue-router";
import Index from "@/view/index";
import Login from "@/view/login/login";
import Article from "@/view/article";
import Articlelist from "@/view/Articlelist";
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
            name: "新增文章",
            component: Index,
            redirect: 'article',
            children: [
                 {
                    path: "/article",
                    name: "新增文章",
                    component: Article
                }
            ]
        }, 
        {
            path: "/",
            name: "文章列表",
            component: Index,
            redirect: 'articlelist',
            children: [
                {
                    path: "/articlelist",
                    name: "文章列表",
                    component: Articlelist
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
