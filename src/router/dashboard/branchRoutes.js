const branchRoutes = [
  {
    path: "/dashboard/branch",
    name: "BranchDashboard",
    component: () => import("../../views/dashboard/branch/BranchDashboard.vue"),
  },
  {
    path: "/dashboard/branch/users",
    name: "BranchUsers",
    component: () => import("../../views/dashboard/branch/BranchUsers.vue"),
  },
  
 
 
];

export { branchRoutes };
