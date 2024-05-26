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
  {
    path: "/dashboard/institution/budgets",
    name: "InstitutionBudgets",
    component: () =>
      import("../../views/dashboard/common/budgets/Budgets.vue")
  },
  {
    path: "/dashboard/institution/products_categories",
    name: "InstitutionProductsCategories",
    component: () =>
      import(
        "../../views/dashboard/common/product-categories/ProductCategories.vue"
      )
  },
  {
    path: '/dashboard/institution/products',
    name: 'InstitutionProducts',
    component: () => import('../../views/dashboard/common/products/Products.vue')
  },
  {
    path: "/dashboard/institution/assets",
    name: "InstitutionAssets",
    component: () => import("../../views/dashboard/common/asset/Assets.vue")
  },
  {
    path: "/dashboard/institution/liabilities",
    name: "InstitutionLiabilities",
    component: () =>
      import("../../views/dashboard/common/liability/Liabilities.vue")
  },
  {
    path: "/dashboard/institution/equities",
    name: "InstitutionEquities",
    component: () => import("../../views/dashboard/common/equity/Equities.vue")
  },
  {
    path: '/dashboard/institution/expenses',
    name: 'InstitutionExpenses',
    component: () => import('../../views/dashboard/common/expense/Expenses.vue')
  },
  {
    path: '/dashboard/institution/customers',
    name: 'InstitutionCustomers',
    component: () => import("../../views/dashboard/common/customers/Customers.vue")
  },
  {
    path: '/dashboard/institution/vendors',
    name: 'InstitutionVendors',
    component: () => import("../../views/dashboard/common/vendors/Vendors.vue")
  },
  {
    path: '/dashboard/institution/sales',
    name: 'InstitutionSales',
    component: () => import("../../views/dashboard/common/sales/Sales.vue")
  },
  {
    path: "/dashboard/institution/settings",
    name: "InstitutionSettings",
    component: () =>
      import("../../views/dashboard/institution/InstitutionSettings.vue")
  },
  {
    path: '/dashboard/institution/account-types',
    component: () => import("../../views/dashboard/common/account-types/AccountTypes.vue")
  },
  {
    path: '/dashboard/institution/sub-account-types',
    component: () => import("../../views/dashboard/common/sub-account-types/SubAccountTypes.vue")
  },
  {
    path: "/dashboard/institution/accounting_periods",
    name: "InstitutionAccountingPeriods",
    component: () =>
      import(
        "../../views/dashboard/common/accounting-periods/AccountingPeriods.vue"
      )
  },
];

export { institutionRoutes };
