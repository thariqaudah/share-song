<template>
  <div class="home">
    <div class="error" v-if="error">{{ error }}</div>
    <ListView :playlists="playlists" />
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection';
import ListView from '@/components/ListView.vue';

export default {
  name: 'Home',
  components: { ListView },
  setup() {
    // Get playlist with realtime data listener
    const { error, documents: playlists } = getCollection('playlists');

    return { error, playlists };
  },
};
</script>

<style></style>
