<template>
  <div class="create">
    <menu-create-or-edit />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MenuCreateOrEdit from '@/views/menu/components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'MenuCreate',
  components: { MenuCreateOrEdit }
})
</script>

<style lang="scss" scoped></style>
