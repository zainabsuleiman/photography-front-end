const institutionRoutes = [
  {
    path: "/dashboard/institution",
    name: "InstitutionDashboard",
    component: () =>
      import("../../views/dashboard/institution/InstitutionDashboard.vue")
  },
  {
    path: "/dashboard/institution/complete_profile",
    name: "InstitutionCompleteProfile",
    component: () =>
      import("../../views/dashboard/institution/InstitutionCompleteProfile.vue")
  },
  {
    path: "/dashboard/institution/branches",
    name: "InstitutionBranches",
    component: () =>
      import("../../views/dashboard/institution/InstitutionBranches.vue")
  },
  
];

export { institutionRoutes };
