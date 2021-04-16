<template>
  <div class="search-playlist">
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Search playlists..." v-model="keyword">
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'SearchPlaylist',
  setup(props, context) {
    const keyword = ref('');

    const handleSubmit = () => {
      context.emit('onSearch', keyword.value);
    }


    return { keyword, handleSubmit };
  }
}
</script>

<style>
.search-playlist input {
  padding: 16px 20px;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

</style>