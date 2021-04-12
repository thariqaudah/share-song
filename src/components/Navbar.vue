<template>
  <nav class="navbar container">
    <router-link :to="{ name: 'Home' }">
      <div class="brand">
        <!-- <a href='https://pngtree.com/so/music-icons'>music icons png from pngtree.com</a> -->
        <img src="@/assets/logo_img.png" alt="Logo" />
        <h1>ShareSong</h1>
      </div>
    </router-link>
    <ul>
      <div v-if="!user">
        <li>
          <router-link :to="{ name: 'Login' }" class="btn btn-secondary"
            >Login</router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'Signup' }" class="btn">Signup</router-link>
        </li>
      </div>
      <div v-else>
        <li>
          <router-link :to="{ name: 'CreatePlaylist' }">
            Create Playlist
          </router-link>
        </li>
        <li>
          <button @click="handleLogout" class="btn btn-secondary">
            Logout
          </button>
        </li>
      </div>
    </ul>
  </nav>
  <div v-if="error" class="error">{{ error }}</div>
</template>

<script>
import getUser from '@/composables/getUser';
import useLogout from '@/composables/useLogout';
import { useRouter } from 'vue-router';

export default {
  name: 'Navbar',
  setup() {
    const { user } = getUser();
    const { error, logout } = useLogout();
    const router = useRouter();

    const handleLogout = async () => {
      await logout();
      if (!error.value) {
        router.push({ name: 'Login' });
      }
    };

    return { user, error, handleLogout };
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 0;
  font-size: 20px !important;
}

button,
.btn {
  margin-top: 0;
  font-size: 14px;
  font-weight: normal;
}
</style>
