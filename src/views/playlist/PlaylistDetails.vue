<template>
  <div v-if="error" class="error container">{{ error }}</div>
  <div v-if="playlist" class="playlist-details container">
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" alt="Cover image" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="user-name">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button class="btn btn-action" v-if="ownership" @click="deletePlaylist">
        Delete playlist
      </button>
    </div>

    <div class="song-list">
      <p>Song list here</p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import getDocument from '@/composables/getDocument';
import getUser from '@/composables/getUser';
import useDocument from '@/composables/useDocument';

export default {
  name: 'PlaylistDetails',
  props: ['id'],
  setup(props) {
    const { error, document: playlist } = getDocument('playlists', props.id);
    const { user } = getUser();
    const { deleteDoc } = useDocument('playlists', props.id);
    const router = useRouter();

    // Check ownership of the playlist
    // userId of the playlist === user that login
    // true or false
    const ownership = computed(() => {
      return (
        playlist.value.userId &&
        user.value &&
        playlist.value.userId == user.value.uid
      );
    });

    const deletePlaylist = async () => {
      await deleteDoc();
      router.push({ name: 'Home' });
      console.log('document deleted');
    };

    return { error, playlist, ownership, deletePlaylist };
  },
};
</script>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  position: relative;
  padding: 180px;
  border-radius: 20px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.playlist-info .user-name {
  color: #999;
}
.playlist-info .description {
  text-align: left;
}
</style>
