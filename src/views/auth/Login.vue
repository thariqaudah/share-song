<template>
  <div class="card">
    <form @submit.prevent="handleSubmit">
      <h1>Login</h1>
      <div class="error" v-if="error">{{ error }}</div>
      <input type="email" name="email" placeholder="Email" v-model="email" />
      <input
        type="password"
        name="password"
        placeholder="Password"
        v-model="password"
      />
      <button class="btn" disabled v-if="isLoading">Logging in...</button>
      <button class="btn" v-else>Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import useLogin from '@/composables/useLogin';
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  setup() {
    const { error, login } = useLogin();
    const router = useRouter();

    const email = ref('');
    const password = ref('');
    const isLoading = ref(false);

    const handleSubmit = async () => {
      if (!email.value || !password.value) {
        error.value = 'All fields are required';
      } else {
        isLoading.value = true;
        await login(email.value, password.value);
        if (!error.value) {
          isLoading.value = false;
          email.value = '';
          password.value = '';
          router.push({ name: 'Home' });
        }
        isLoading.value = false;
      }
    };

    return { error, email, password, handleSubmit, isLoading };
  },
};
</script>
