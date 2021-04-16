<template>
  <div class="user-playlist">
    <p>My Playlist</p>
  </div>
</template>

<script>
import getUser from '@/composables/getUser';
import getCollection from '@/composables/getCollection';

export default {
  name: 'UserPlaylist',
  setup() {
    const { user } = getUser();
    const { error, documents } = getCollection('playlists', [
      'userId',
      '==',
      user.value.uid,
    ]);

    console.log(documents.value);

    return { error, documents };
  },
};
</script>

<style></style>
