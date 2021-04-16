<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">
      Add song
    </button>
    <form class="card" v-if="showForm" @submit.prevent="handleSubmit">
      <h4>Add a New Song</h4>
      <input type="text" placeholder="Song title" v-model="title" />
      <input type="text" placeholder="Artist" v-model="artist" />
      <input
        type="number"
        placeholder="Duration (in secconds)"
        v-model="duration"
      />
      <button disabled v-if="isLoading">Adding...</button>
      <button v-else>Add</button>
      <a @click="showForm = false">Cancel</a>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import useDocument from '@/composables/useDocument';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'AddSong',
  props: ['playlist'],
  setup(props) {
    const { error, updateDoc } = useDocument('playlists', props.playlist.id);

    const title = ref('');
    const artist = ref('');
    const duration = ref(null);
    const isLoading = ref(false);
    const showForm = ref(false);

    const handleSubmit = async () => {
      if (!title.value || !artist.value || !duration.value) {
        error.value = 'All fields are required';
      } else {
        const newSong = {
          title: title.value,
          artist: artist.value,
          duration: duration.value,
          id: uuidv4(),
        };

        isLoading.value = true;
        await updateDoc({
          songs: [...props.playlist.songs, newSong],
        });
        if (!error.value) {
          showForm.value = false;
          title.value = '';
          artist.value = '';
          duration.value = null;
        }
        isLoading.value = false;
      }
    };

    return { title, artist, duration, handleSubmit, isLoading, showForm };
  },
};
</script>

<style scoped>
.add-song .card {
  margin: 20px 0 0 0;
  width: 100%;
}
/* .add-song a {
  color: var(--primary);
  font-weight: 600;
  background-color: #ddd;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
} */
.add-song a {
  color: var(--primary);
  font-weight: 600;
  font-size: 14px;
  margin-left: 10px;
  cursor: pointer;
}
.add-song h4 {
  margin-bottom: 20px;
}
</style>
