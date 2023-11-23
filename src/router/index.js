// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Blogs",
        component: () => import("@/modules/blogs/blogs-page.vue"),
      },
      {
        path: "/admin-blogs",
        name: "Admin-Blogs",
        component: () => import("@/modules/admin-blogs/admin-blogs.vue"),
      },
      {
        path: "/single-blog/:id",
        name: "Single-Blog",
        component: () => import("@/modules/single-blog/single-blog.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
