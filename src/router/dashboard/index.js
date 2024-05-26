import { adminRoutes } from "./admimRoutes";
import { branchRoutes } from "./branchRoutes";
import { institutionRoutes } from "./institutionRoutes";

const DashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../../views/dashboard/Dashboard.vue")
  },
  {
    path: "/client",
    name: "Client-Dashboard",
    component: () => import("../../views/dashboard/client/Client-Dashboard.vue")
  },
  {
    path: "/photographer",
    name: "Photographer-Dashboard",
    component: () => import("../../views/dashboard/photographer/Photographer-Dashboard.vue")
  },
  {
    path: "/user/profile",
    name: "UserProfile",
    component: () => import("../../views/User/UserProfile.vue")
  },
  {
    path: "/coming_soon",
    name: "Coming soon",
    component: () => import("../../views/dashboard/ComingSoon.vue")
  },
  {
    path: "/403",
    name: "Unauthorized",
    component: () => import("../../views/dashboard/Unauthorized.vue")
  },

  ...adminRoutes,
  ...branchRoutes,
  ...institutionRoutes
];

export { DashboardRoutes };
