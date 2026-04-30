import { Router } from "express";
import { IRoute } from "../types";

const router = Router();

const routes: IRoute[] = [
  // {
  //   path: "/admin",
  //   route: AdminRouters,
  // },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
