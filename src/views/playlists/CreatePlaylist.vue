<template>
  <div class="create-playlist card">
    <form @submit.prevent="handleSubmit">
      <h1>Create New Playlist</h1>
      <div class="error">{{ error }}</div>
      <input
        type="text"
        name="title"
        placeholder="Playlist title..."
        v-model="title"
      />
      <textarea
        name="description"
        placeholder="Description..."
        v-model="description"
      ></textarea>
      <label for="cover">Select playlist cover image</label>
      <div class="error">{{ fileError }}</div>
      <input type="file" id="cover" name="cover" @change="handleChange" />
      <button class="btn" v-if="!isLoading">Create</button>
      <button class="btn" disabled v-else>Saving...</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useStorage from '@/composables/useStorage';
import useCollection from '@/composables/useCollection';
import getUser from '@/composables/getUser';
import { timestamp } from '@/firebase/config';

export default {
  name: 'CreatePlaylist',
  setup() {
    const { publicUrl, filePath, uploadImage } = useStorage();
    const { error, addDoc } = useCollection('playlists');
    const { user } = getUser();
    const router = useRouter();

    const title = ref('');
    const description = ref('');
    const file = ref(null);
    const fileError = ref(null);
    const isLoading = ref(false);

    // Allowed file types
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    const handleChange = (e) => {
      const selected = e.target.files[0];
      console.log(selected);
      if (selected && allowedTypes.includes(selected.type)) {
        fileError.value = null;
        file.value = selected;
      } else {
        file.value = null;
        fileError.value = 'Please select an image in PNG, JPG, or JPEG';
      }
    };

    const handleSubmit = async () => {
      if (!title.value || !description.value || !file.value) {
        error.value = 'All fields are required';
      } else {
        // Process to submit
        // Upload cover image
        error.value = null;
        isLoading.value = true;
        await uploadImage(file.value);
        // Ready to add document to firestore
        const res = await addDoc({
          title: title.value,
          description: description.value,
          coverUrl: publicUrl.value,
          filePath: filePath.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          songs: [],
          createdAt: timestamp(),
        });
        if (!error.value) {
          router.push({ name: 'PlaylistDetails', params: { id: res.id } });
        }
      }
    };

    return {
      title,
      description,
      handleSubmit,
      handleChange,
      fileError,
      error,
      isLoading,
    };
  },
};
</script>

<style></style>
