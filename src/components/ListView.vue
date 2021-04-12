<template>
  <div class="list-view container">
    <router-link v-for="playlist in playlists" :key="playlist.id" :to="{ name: 'PlaylistDetails', params: { id: playlist.id }}">
      <div class="single">
        <div class="thumbnail">
          <img :src="playlist.coverUrl" alt="thumbnail" />
        </div>
        <div class="details">
          <h3>{{ playlist.title }}</h3>
          <p>Created by {{ playlist.userName }}</p>
        </div>
        <div class="song-number">
          <span>
            Songs: <span class="pill">{{ playlist.songs.length }}</span>
          </span>
        </div>
        <!-- <div class="action">
          <router-link
            :to="{ name: 'PlaylistDetails', params: { id: playlist.id } }"
            class="btn btn-action"
            >View</router-link
          >
        </div> -->
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ListView',
  props: ['playlists'],
};
</script>

<style scoped>
.list-view {
  margin-top: 20px;
}

.single {
  background: #fff;
  padding: 30px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  transition: all 0.2s ease;
}

.single:hover {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transform: scale(1.01);
}

.thumbnail {
  width: 100px;
  height: 100px;
  margin-right: 40px;
  border-radius: 10px;
  overflow: hidden;
}

.thumbnail img {
  width: 150%;
  height: 150%;
  display: block;
}

.details h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
}

.details p {
  font-size: 14px;
  color: #555;
}

.song-number {
  margin-left: auto;
}
</style>
