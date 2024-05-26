<template>
  <div class="account-types mt-3">
    <div class="section-tabs">
      <span
        v-for="(tab, index) in tabs"
        :key="index"
        class="section-tabs__item"
        :class="{ 'section-tabs__item--active': activeTab === index }"
        @click="setActiveTab(index)"
      >
        <i :class="tab.icon"></i>
        <span class="label">{{ tab.label }}</span>
      </span>
    </div>

    <div class="card shadow rounded-0 w-100 p-4">
      <template v-if="activeTab == 0">
        <sub-asset-account-types />
      </template>
      <template v-if="activeTab == 1">
        <sub-liability-account-types />
      </template>
      <template v-if="activeTab == 2">
        <sub-equity-account-types />
      </template>
      <template v-if="activeTab == 3">
        <sub-expense-account-types />
      </template>
      <template v-if="activeTab == 4">
        <sub-income-account-types />
      </template>
    </div>
  </div>
</template>

<script>
import SubAssetAccountTypes from "./SubAssetAccountTypes";
import SubLiabilityAccountTypes from "./SubLiabilityAccountTypes";
import SubEquityAccountTypes from "./SubEquityAccountTypes";
import SubExpenseAccountTypes from "./SubExpenseAccountTypes";
import SubIncomeAccountTypes from "./SubIncomeAccountTypes";

export default {
  components: {
    SubAssetAccountTypes,
    SubLiabilityAccountTypes,
    SubEquityAccountTypes,
    SubExpenseAccountTypes,
    SubIncomeAccountTypes
  },
  data() {
    return {
      tabs: [
        {
          icon: "fa fa-list",
          label: "Assets"
        },
        {
          icon: "fa fa-list",
          label: "Liability"
        },
        {
          icon: "fa fa-list",
          label: "Equity"
        },
        {
          icon: 'fa fa-list',
          label: 'Expense'
        },
        {
          icon: 'fa fa-list',
          label: 'Income'
        }
      ],
      activeTab: 0
    };
  },
  methods: {
    setActiveTab(index) {
      this.activeTab = index;
    }
  }
};
</script>
