<template>
  <div class="TableFooterDesign flex_between w-100">
    <div class="d-flex align-center left__section">
      <!-- previous btn  -->
      <Button
        @click="
          $emit('loadMore', {
            per_page: pagination.per_page,
            current_page: pagination.current_page,
            action: 'prev',
          })
        "
        :disabled="pagination.current_page == 1"
        title="Previous Page"
        :elevation="0"
        text="Prev"
        :outlined="true"
        textSize="var(--font_md)"
        textColor="var(--primary_color)"
        contentClass="pill"
        minWidth="7rem"
        height="3.6rem"
        color="var(--primary_color)"
      />
      <div class="btnWrapper">
        <v-menu :nudge-bottom="3" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
              <Button
                :ripple="false"
                :elevation="0"
                style="padding: 0"
                class="p-0 m-0 noBefore"
                textColor="var(--text_dark)"
                :text="pagination.per_page"
                :svg="true"
                svgRight="SvgAngleDown"
                width="max-content"
                minWidth="5rem"
                height="max-content"
                color="transparent"
              />
            </div>
          </template>
          <v-list min-width="11rem" class="dropdown__list tableList">
            <v-list-item
              v-for="(perPage, index) in pagination.itemsPerPageOptions"
              :key="index"
              :class="{ active: pagination.per_page == perPage }"
              @click="$emit('getPerPage', perPage)"
              class="dropdown__list-item"
            >
              <v-list-item-content>
                <v-list-item-title class="text-center dropdown__list-title">{{
                  perPage
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
    <div class="d-flex align-center right__section justify-center">
      <!-- pagination  -->
      <v-pagination
        @input="$emit('loadMore', pagination.current_page)"
        color="transparent"
        v-model="pagination.current_page"
        :total-visible="6"
        :length="pagination.last_page"
      ></v-pagination>
      <!-- next btn -->
      <Button
        @click="
          $emit('loadMore', {
            per_page: pagination.per_page,
            current_page: pagination.current_page,
            action: 'next',
          })
        "
        :ripple="false"
        :disabled="pagination.current_page == pagination.last_page"
        title="Next Page"
        :elevation="0"
        text="Next"
        :outlined="true"
        textSize="var(--font_md)"
        textColor="var(--primary_color)"
        contentClass="pill"
        minWidth="7rem"
        height="3.6rem"
        color="var(--primary_color)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["pagination", "itemsPerPageText", "tableData"],
  emits: ["getPerPage", "loadMore"],
};
</script>

<style lang="scss" scoped></style>
