<template>
  <div class="edit">
    <menu-create-or-edit :is-edit="true" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MenuCreateOrEdit from '@/views/menu/components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'MenuEdit',
  components: { MenuCreateOrEdit }
})
</script>

<style lang="scss" scoped></style>
