import { guards } from "../../guards";
import { router } from "../../router";

const adminRoutes = [
  {
    path: "/dashboard/admin",
    name: "AdminDashboard",
    beforeEnter: () =>
      guards.is_super_admin() || router.push({ name: "Unauthorized" }),
    component: () => import("../../views/dashboard/admin/AdminDashboard.vue")
  },
  {
    path: "/photographers",
    name: "Photographers",
    beforeEnter: () =>
      guards.is_super_admin() || router.push({ name: "Unauthorized" }),
    component: () => import("../../views/dashboard/photographer/photographers.vue")
  },
  {
    path: "/activity",
    name: "Activity",
    beforeEnter: () =>
      guards.is_photographer() || router.push({ name: "Unauthorized" }),
    component: () => import("../../views/dashboard/photographer/Activity.vue")
  },
  {
    path: "/client_list",
    name: "Client_List",
    beforeEnter: () =>
      guards.is_super_admin() || router.push({ name: "Unauthorized" }),
    component: () => import("../../views/dashboard/client/Client_list.vue")
  },
  {
    path: "/users_list",
    name: "Users_List",
    beforeEnter: () =>
      guards.is_super_admin() || router.push({ name: "Unauthorized" }),
    component: () => import("../../views/dashboard/client/Users_List.vue")
  },
  {
    path: "/photo_list",
    name: "Photographer_List",
    beforeEnter: () =>
      guards.is_super_admin() || router.push({ name: "Unauthorized" }),
    component: () => import("../../views/dashboard/client/Photographer_list.vue")
  },
  {
    path: "/appointments",
    name: "Appointments",
    beforeEnter: () =>
      guards.is_client() || router.push({ name: "Unauthorized" }),
    component: () => import("../../views/dashboard/client/appointmentClient.vue")
  },
  {
    path: "/appointment",
    name: "Appointment",
    beforeEnter: () =>
      guards.is_photographer() || router.push({ name: "Unauthorized" }),
    component: () => import("../../views/dashboard/photographer/Appoitment.vue")
  },
  {
    path: "/upload",
    name: "Upload",
    beforeEnter: () =>
      guards.is_photographer() || router.push({ name: "Unauthorized" }),
    component: () => import("../../views/dashboard/photographer/Uploads.vue")
  },
  
  {
    path: "/Approved-appointment/:id",
    name: "Approved-Appointment",
    beforeEnter: () =>
      guards.is_client || router.push({ name: "Unauthorized" }),
    component: () => import("../../views/dashboard/photographer/Approved_Appointment.vue")
  },
  {
    path: "/photographers/:id",
    name: "Photographer Detail",
    // beforeEnter: () => guards.is_logged_in() || router.push({ name: 'Login' }),
    component: () => import("../../views/dashboard/photographer/photographerDetails.vue"),
  },
 
  {
    path: "/activity/new",
    name: "New Activity",
    beforeEnter: () =>
      guards.is_photographer() || router.push({ name: "Unauthorized" }),
    component: () => import("../../views/dashboard/photographer/NewActivity.vue")
  },
  {
    path: "/dashboard/plans",
    name: "Plans",
    beforeEnter: () =>
      guards.is_super_admin() || router.push({ name: "Unauthorized" }),
    component: () => import("../../views/dashboard/admin/plans/Plans.vue")
  },
  // {
  //   path: "/dashboard/accounting_periods",
  //   name: "AccountingPeriods",
  //   beforeEnter: () =>
  //     guards.is_super_admin() || router.push({ name: "Unauthorized" }),
  //   component: () =>
  //     import(
  //       "../../views/dashboard/admin/accounting-periods/AccountingPeriods.vue"
  //     )
  // },
  {
    path: "/plans/new",
    name: "New Plan",
    beforeEnter: () =>
      guards.is_super_admin() || router.push({ name: "Unauthorized" }),
    component: () => import("../../views/Plans/NewPlan.vue")
  },
  {
    path: "/plans/:uuid/detail",
    name: "PlanDetail",
    beforeEnter: () =>
      guards.is_super_admin() || router.push({ name: "Unauthorized" }),
    component: () => import("../../views/Plans/PlanDetail.vue")
  },
  // {
  //   path: '/dashboard/account-types',
  //   beforeEnter: () =>
  //     guards.is_super_admin() || router.push({ name: "Unauthorized" }),
  //   component: () => import("../../views/dashboard/admin/account-types/AccountTypes.vue")
  // },
  // {
  //   path: '/dashboard/sub-account-types',
  //   beforeEnter: () =>
  //     guards.is_super_admin() || router.push({ name: "Unauthorized" }),
  //   component: () => import("../../views/dashboard/admin/sub-account-types/SubAccountTypes.vue")
  // }
];

export { adminRoutes };
