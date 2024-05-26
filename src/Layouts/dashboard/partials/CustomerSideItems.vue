<template>
  <sidebar-item
    id="Home"
    iconClass="ni ni-ungroup text-orange"
    text="Home"
    link="/"
    :children="[]"
    :isParent="false"
  />
  <sidebar-item
    id="Orders"
    iconClass="ni ni-ungroup text-orange"
    text="My Orders"
    link="/customer/orders/"
    :isParent="true"
    :children="[
      {
        id: 'InProgress',
        iconClass: 'ni ni-ungroup text-orange',
        text: 'InProgress',
        link: '/customer/orders/inprogress/',
        children: [],
        isParent: false,
      },
      {
        id: 'delivered',
        iconClass: 'ni ni-ungroup text-orange',
        text: 'delivered',
        link: '/customer/orders/delivered/',
        children: [],
        isParent: false,
      },
      {
        id: 'canceled',
        iconClass: 'ni ni-ungroup text-orange',
        text: 'canceled',
        link: '/customer/orders/canceled/',
        children: [],
        isParent: false,
      },
    ]"
  />
  <sidebar-item
    id="profile"
    iconClass="ni ni-ungroup text-orange"
    text="profile"
    link="/customer/profile/"
    :children="[]"
    :isParent="false"
  />

  <sidebar-item
    id="Inquiries"
    iconClass="ni ni-ungroup text-orange"
    text="Inquiries"
    link="/customer/inquiries/"
    :children="[]"
    :isParent="false"
  />

  <!-- TAB TO SHOW CUSTOMER PAYMENTS -->
  <!-- <sidebar-item
    id="payments"
    iconClass="ni ni-ungroup text-orange"
    text="payments"
    link="/customer/payments"
    :children="[]"
    :isParent="false"
  /> -->

  <!-- <sidebar-item
    id="Entities"
    iconClass="ni ni-shop text-primary"
    text="Entities"
    v-if="$guards.is_super_admin()"
    link="/entities/"
    :children="[]"
    :isParent="false"
  /> -->
</template>

<script>
import SideBarItem from "../../components/SidebarItem";

export default {
  components: {
    "sidebar-item": SideBarItem,
  },
};
</script>

<style>
</style>