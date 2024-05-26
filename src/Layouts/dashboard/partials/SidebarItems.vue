<template>
  <!-- <sidebar-item
    id="dashboards"
    iconClass="ni ni-ungroup text-orange"
    text="Dashboard"
    link="/dashboard"
    :children="[]"
    :isParent="false"
  />
  -->
  <sidebar-item
   v-if="$guards.is_super_admin()"
    icon="fa fa-home"
    label="Dashboard"
    :link="getDashboardLink"
  ></sidebar-item>

  <sidebar-item
    icon="fa fa-users"
    label="Phototgraphers"
    v-if="$guards.is_super_admin()"
    link="/photographers"
  />
  <sidebar-item
    icon="fa fa-list"
    label="Appointment"
    v-if="$guards.is_client()"
    link="/appointments"
  />
  <!-- <sidebar-item
    icon="fa fa-money"
    label="Approved-Appointment"
    v-if="$guards.is_client()"
    link="/Approved-appointment"
  /> -->
  <sidebar-item
    icon="fa fa-coins"
    label="Appointment"
    v-if="$guards.is_photographer()"
    link="/appointment"
  />
  <sidebar-item
    icon="fa fa-list"
    label="Activity"
    v-if="$guards.is_photographer()"
    link="/activity"
  />
  <sidebar-item
    icon="fa fa-arrow-up"
    label="Upload"
    v-if="$guards.is_photographer()"
    link="/upload"
  />

  <sidebar-item
    icon="fa fa-users"
    label="Users"
    link="/dashboard/branch/users"
    v-if="isUserType('branch')"
  >
  </sidebar-item>

  <sidebar-item
    icon="fa fa-building"
    label="Branches"
    link="/dashboard/institution/branches"
    v-if="isUserType('institution')"
  ></sidebar-item>

  <sidebar-item
    icon="fa fa-area-chart"
    label="Budgets"
    :link="`/dashboard/${
      isUserType('institution') ? 'institution' : 'branch'
    }/budgets`"
    v-if="isUserType('institution') || isUserType('branch')"
  ></sidebar-item>

  <sidebar-item
    icon="fa fa-users"
    label="Customers"
    :link="`/dashboard/${
      isUserType('institution') ? 'institution' : 'branch'
    }/customers`"
    v-if="isUserType('institution') || isUserType('branch')"
  ></sidebar-item>

  <sidebar-item
    icon="fas fa-coins"
    label="Accounting"
    :dropdowns="accountingOptions"
    v-if="isUserType('institution') || isUserType('branch')"
  ></sidebar-item>

  <sidebar-item
    icon="fa fa-shopping-bag"
    label="Products"
    :dropdowns="productOptions"
    v-if="isUserType('institution') || isUserType('branch')"
  ></sidebar-item>

  <sidebar-item
    icon="fas fa-cash-register"
    label="Transactions"
    :dropdowns="transactionsOptions"
    v-if="isUserType('institution') || isUserType('branch')"
  ></sidebar-item>

  <sidebar-item
    icon="fas fa-hand-holding-usd"
    label="Vendors"
    :link="`/dashboard/${
      isUserType('institution') ? 'institution' : 'branch'
    }/vendors`"
    v-if="isUserType('institution') || isUserType('branch')"
  ></sidebar-item>

  <sidebar-item
    icon="fa fa-money"
    label="Sales"
    :link="`/dashboard/${
      isUserType('institution') ? 'institution' : 'branch'
    }/sales`"
    v-if="isUserType('institution') || isUserType('branch')"
  ></sidebar-item>

  <sidebar-item
    icon="fa fa-cog"
    label="Settings"
    link="/dashboard/institution/settings"
    v-if="isUserType('institution')"
  ></sidebar-item>

  <!-- to check the permission and the role add this rine in the sidebar item attributes -->
  <!-- v-if="$guards.has_perm('store.view_service') && !$guards.is_super_admin()" -->
</template>

<script>
import SidebarItem from "@/components/dashboard/SidebarItem";

export default {
  components: {
    SidebarItem,
  },
  data() {
    return {
      accountingOptions: [
        {
          label: "Periods",
          link: `/dashboard/${
            this.isUserType("institution") ? "institution" : "branch"
          }/accounting_periods`,
        },
        {
          label: "Types",
          link: `/dashboard/${
            this.isUserType("institution") ? "institution" : "branch"
          }/account-types`,
        },
        {
          label: "Sub Types",
          link: `/dashboard/${
            this.isUserType("institution") ? "institution" : "branch"
          }/sub-account-types`,
        },
      ],
      transactionsOptions: [
        {
          label: "Assets",
          link: `/dashboard/${
            this.isUserType("institution") ? "institution" : "branch"
          }/assets`,
        },
        {
          label: "Liabilities",
          link: `/dashboard/${
            this.isUserType("institution") ? "institution" : "branch"
          }/liabilities`,
        },
        {
          label: "Equity",
          link: `/dashboard/${
            this.isUserType("institution") ? "institution" : "branch"
          }/equities`,
        },
        {
          label: "Expenses",
          link: `/dashboard/${
            this.isUserType("institution") ? "institution" : "branch"
          }/expenses`,
        },
      ],
      productOptions: [
        {
          label: "List",
          link: `/dashboard/${
            this.isUserType("institution") ? "institution" : "branch"
          }/products`,
        },
        {
          label: "Categories",
          link: `/dashboard/${
            this.isUserType("institution") ? "institution" : "branch"
          }/products_categories`,
        },
      ],
    };
  },
  computed: {
    referenceName: function () {
      return this.$store.getters.getUserProfile.referenceName || "superAdmin";
    },
    getDashboardLink() {
      switch (this.referenceName.toLowerCase()) {
        case "branch":
          return `/dashboard/branch`;
        case "institution":
          return `/dashboard/institution`;
        case "superadmin":
          return `/dashboard`;
        default:
          return `/dashboard`;
      }
    },
  },
  methods: {
    isUserType(type) {
      return this.referenceName
        ? this.referenceName.toLowerCase() === type.toLowerCase()
        : false;
    },
  },
};
</script>

<style>
</style>
