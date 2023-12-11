<template>
  <div id="controls">
    <breadcrumbs :name="$t('sidebar.controls')" />

    <Placeholder />
  </div>
</template>

<script>
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import Placeholder from "@/components/Placeholder.vue";

export default {
  name: "Controls",
  components: {
    Breadcrumbs,
    Placeholder,
  },
};
</script>