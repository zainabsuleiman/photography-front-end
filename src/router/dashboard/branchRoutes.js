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
  {
    path: "/dashboard/branch/budgets",
    name: "BranchBudgets",
    component: () => import("../../views/dashboard/common/budgets/Budgets.vue"),
  },
  {
    path: "/dashboard/branch/products_categories",
    name: "BranchProductsCategories",
    component: () =>
      import(
        "../../views/dashboard/common/product-categories/ProductCategories.vue"
      ),
  },
  {
    path: "/dashboard/branch/products",
    name: "BranchProducts",
    component: () =>
      import("../../views/dashboard/common/products/Products.vue"),
  },
  {
    path: "/dashboard/branch/assets",
    name: "BranchAssets",
    component: () => import("../../views/dashboard/common/asset/Assets.vue"),
  },
  {
    path: "/dashboard/branch/liabilities",
    name: "BranchLiabilities",
    component: () =>
      import("../../views/dashboard/common/liability/Liabilities.vue"),
  },
  {
    path: "/dashboard/branch/equities",
    name: "BranchEquities",
    component: () => import("../../views/dashboard/common/equity/Equities.vue"),
  },
  {
    path: "/dashboard/branch/expenses",
    name: "BranchExpenses",
    component: () =>
      import("../../views/dashboard/common/expense/Expenses.vue"),
  },
  {
    path: "/dashboard/branch/customers",
    name: "BranchCustomers",
    component: () =>
      import("../../views/dashboard/common/customers/Customers.vue"),
  },
  {
    path: "/dashboard/branch/vendors",
    name: "BranchVendors",
    component: () => import("../../views/dashboard/common/vendors/Vendors.vue"),
  },
  {
    path: "/dashboard/branch/sales",
    name: "BranchSales",
    component: () => import("../../views/dashboard/common/sales/Sales.vue"),
  },
  {
    path: '/dashboard/branch/account-types',
    component: () => import("../../views/dashboard/common/account-types/AccountTypes.vue")
  },
  {
    path: '/dashboard/branch/sub-account-types',
    component: () => import("../../views/dashboard/common/sub-account-types/SubAccountTypes.vue")
  },
  {
    path: "/dashboard/branch/accounting_periods",
    name: "branchAccountingPeriods",
    component: () =>
      import(
        "../../views/dashboard/common/accounting-periods/AccountingPeriods.vue"
      )
  },
];

export { branchRoutes };
