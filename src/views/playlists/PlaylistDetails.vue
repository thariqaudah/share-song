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
      <button v-if="ownership" @click="handleDelete">
        Delete playlist
      </button>
    </div>

    <div class="song">
      <p v-if="!playlist.songs.length">
        No songs has been added to this playlist yet
      </p>
      <ul class="song-list">
        <li v-for="song in playlist.songs" :key="song.id">
          <div class="details">
            <h4 class="title">{{ song.title }}</h4>
            <p class="artist">By {{ song.artist }}</p>
            <p class="duration">{{ song.duration }}</p>
          </div>
          <button v-if="ownership" @click="deleteSong(song.id)">X</button>
        </li>
      </ul>
      <AddSong v-if="ownership" :playlist="playlist" />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import getDocument from '@/composables/getDocument';
import getUser from '@/composables/getUser';
import useDocument from '@/composables/useDocument';
import useStorage from '@/composables/useStorage';
import AddSong from '@/components/AddSong.vue';

export default {
  name: 'PlaylistDetails',
  props: ['id'],
  components: { AddSong },
  setup(props) {
    const { error, document: playlist } = getDocument('playlists', props.id);
    const { user } = getUser();
    const { deleteDoc, updateDoc } = useDocument('playlists', props.id);
    const { deleteImage } = useStorage();
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

    // const songDuration = computed(() => {});

    const handleDelete = async () => {
      await deleteImage(playlist.value.filePath);
      await deleteDoc();
      router.push({ name: 'Home' });
    };

    const deleteSong = async (songId) => {
      playlist.value.songs = playlist.value.songs.filter(
        (song) => song.id !== songId
      );
      await updateDoc({ songs: playlist.value.songs });

      // Other Method (splice)
      // playlist.value.songs.splice(index, 1);
      // await updateDoc({ songs: playlist.value.songs });
    };

    return { error, playlist, ownership, handleDelete, deleteSong };
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
  color: var(--secondary);
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.playlist-info .user-name {
  color: #777;
}
.playlist-info .description {
  text-align: left;
}
.playlist-info button {
  background-color: var(--secondary);
}
.song-list {
  margin-bottom: 40px;
}
.song-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  margin-bottom: 20px;
  border-bottom: 1px dotted #ccc;
}
.song-list li .title {
  font-size: 18px;
  color: var(--primary);
}
.song-list li .artist {
  font-size: 14px;
  color: #777;
}
.song-list li .duration {
  font-size: 12px;
  color: #777;
}
.song-list li button {
  padding: 5px 10px;
  background-color: var(--secondary);
}
</style>
