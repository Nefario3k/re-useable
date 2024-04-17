<template>
  <div style="flex: auto" class="d-flex flex-column h-100">
    <v-data-table
      v-if="!tableLoader && tableData.length"
      :headers="headers"
      :mobile-breakpoint="760"
      :disable-filtering="true"
      :disable-sort="true"
      :items="tableData"
      hide-default-footer
      :items-per-page="tableData.length"
      :page="1"
      :loading="tableLoader"
      loading-text="Loading wallet data"
      no-data-text="No wallet data available"
      :footer-props="{
        pagination: pagination,
      }"
      class="generic__table no__border"
    >
      <!-- fullname -->
      <template v-slot:item.fullname="{ item }">
        <div class="user_content capital">
          <div class="user_content_details d-flex align-center">
            <div v-if="item.avatar" class="images__container">
              <img :src="item.avatar" :alt="item.fullname" />
            </div>
            <span @click="$refs.userPanel.showPanel(item)" class="plainLink">{{
              $getFullName(item.first_name, item.last_name)
            }}</span>
          </div>
        </div>
      </template>
      <!-- phone -->
      <template v-slot:item.phone="{ item }">
        <div class="user_content capital">
          <div class="user_content_details d-flex align-center">
            <p class="email">
              <a :href="`tel:+${item.phone_number}`">{{ item.phone_number }}</a>
            </p>
          </div>
        </div>
      </template>
      <!-- email -->
      <template v-slot:item.email="{ item }">
        <div class="user_content capital">
          <div class="user_content_details d-flex align-center">
            <p v-if="item.email" class="email">
              <a :href="`mailto:${item.email}`">{{ item.email }}</a>
            </p>
            <p v-else>Not available</p>
          </div>
        </div>
      </template>
      <!-- wallet -->
      <template v-slot:item.wallet="{ item }">
        <div class="user_content capital">
          <div class="user_content_details d-flex align-center">
            <p class="strong w-mc">{{ $formatNairaCurrency(item.wallet_balance) }}</p>
          </div>
        </div>
      </template>
      <!-- created_at  -->
      <template v-slot:item.created_at="{ item }">
        <div class="user_content">
          <div class="user_content_details d-flex align-center">
            <p class="date w-mc">
              {{ $formatTableDate(item.created_at) }}
            </p>
          </div>
        </div>
      </template>
      <!-- status -->
      <template v-slot:item.status="{ item }">
        <div class="user_content capital">
          <div class="w-mc user_content_details d-flex align-center">
            <p
              :class="{
                verified: item.status === 'active',
                danger: item.status === 'suspended',
              }"
            >
              {{ item.status }}
            </p>
          </div>
        </div>
      </template>
      <!-- action -->
      <template v-slot:item.action="{ item }">
        <div class="user_content capital">
          <v-menu transition="scroll-x-transition" offset-y min-width="15.6rem">
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on" class="action__activator">
                <Button
                  :elevation="0"
                  :ripple="false"
                  :svg="true"
                  width="3.6rem"
                  svgRight="SvgThreedots"
                  height="3.6rem"
                  color="transparent"
                  contentClass="noBefore"
                />
              </div>
            </template>
            <v-list class="normal_list">
              <!-- View this user -->
              <v-list-item
                @click="$refs.userPanel.showPanel(item)"
                class="dropdown__list-item"
              >
                <v-list-item-content>
                  <v-list-item-title class="dropdown__list-title"
                    >View this user</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <!-- Create an order -->
              <v-list-item
                v-if="item.status === 'active' && $getStateData('providers').length"
                :disabled="!$getStateData('providers').length"
                @click="$refs.selectBill.showPanel(item)"
                class="dropdown__list-item"
              >
                <v-list-item-content>
                  <v-list-item-title class="dropdown__list-title"
                    >Create an order</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <!-- Suspend User -->
              <v-list-item
                @click="
                  setUserStatus({
                    user_id: item.id,
                    status: item.status === 'active' ? 'suspended' : 'active',
                  })
                "
                class="dropdown__list-item"
              >
                <v-list-item-content>
                  <v-list-item-title class="dropdown__list-title"
                    >{{
                      item.status === "active" ? "Suspend" : "Activate"
                    }}
                    User</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <!-- Delete User -->
              <v-list-item
                @click="$refs.showDeleteAccount.openModal(item)"
                class="dropdown__list-item"
              >
                <v-list-item-content>
                  <v-list-item-title class="dropdown__list-title"
                    >Delete User</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
      <!-- footer  -->
      <template v-slot:footer="{ props: { pagination } }">
        <TablesFooter
          v-show="!tableLoader && tableData.length"
          :pagination="pagination"
          :tableData="tableData"
          @loadMore="loadMore($event)"
          @getPerPage="getPerPage($event)"
          ref="tableFooter"
        />
      </template>
    </v-data-table>
    <!-- empty state -->
    <EmptyState
      v-else-if="!tableLoader && !tableData.length"
      style="flex: auto"
      svg="SvgEmptyStateInvoice"
      head="No users data available"
      subText=""
    />
    <LoaderTable v-else />
    <!-- panels and modals go here -->
    <PanelUser @showReceipt="$refs.receipt.showPanel($event)" ref="userPanel" />
    <PanelReceipt ref="receipt" />
    <PanelBillselect
      @showBillPanel="$refs[$event.name].showPanel($event.user)"
      ref="selectBill"
    />
    <PanelElectricity @showReceipt="$refs.electReceipt.showPanel()" ref="electricity" />
    <PanelEducation @showReceipt="$refs.electReceipt.showPanel()" ref="education" />
    <ModalDeleteAccount
      ref="showDeleteAccount"
      @reloadTableAfterDelete="reloadTableAfterDelete"
    />
  </div>
</template>

<script>
import handleTable from "~/mixins/handleTable";
export default {
  mixins: [handleTable],
  name: "users",
  data() {
    return {
      headers: [
        {
          text: "user name",
          align: "start",
          sortable: true,
          value: "fullname",
        },
        { text: "Phone No", value: "phone" },
        { text: "email", value: "email" },
        { text: "wallet balance", value: "wallet" },
        { text: "reg date", value: "created_at" },
        { text: "Status", value: "status" },
        {
          text: "Action",
          value: "action",
          align: "center",
        },
      ],
    };
  },
};
</script>
