<template>
  <div class="home container">
    <div class="error" v-if="error">{{ error }}</div>
    <SearchPlaylist @onSearch="filterPlaylists" />
    <ListView :playlists="playlists" />
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection';
import ListView from '@/components/ListView.vue';
import SearchPlaylist from '@/components/SearchPlaylist.vue';

export default {
  name: 'Home',
  components: { SearchPlaylist, ListView },
  setup() {
    // Get playlist with realtime data listener
    const { error, documents: playlists } = getCollection('playlists');

    const filterPlaylists = (value) => playlists.filter(playlist => playlist.title.includes(value));

    return { error, playlists, filterPlaylists };
  },
};
</script>

<style></style>
