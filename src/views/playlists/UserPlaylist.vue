<template>
  <div class="user-playlist container">
    <div v-if="playlists">
      <h2>My Playlist</h2>
      <ListView :playlists="playlists" />
    </div>
    <button>Create a new playlist</button>
    <div class="error" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import getUser from '@/composables/getUser';
import getCollection from '@/composables/getCollection';
import ListView from '@/components/ListView.vue';

export default {
  name: 'UserPlaylist',
  components: { ListView },
  setup() {
    const { user } = getUser();
    const { error, documents: playlists } = getCollection('playlists', [
      'userId',
      '==',
      user.value.uid,
    ]);

    return { error, playlists };
  },
};
</script>

<style scoped>
.user-playlist button {
  margin-top: 50px;
}
</style>
