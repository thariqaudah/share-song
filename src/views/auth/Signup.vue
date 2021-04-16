<template>
  <div class="card">
    <form @submit.prevent="handleSubmit">
      <h1>Signup</h1>
      <div class="error" v-if="error">{{ error }}</div>
      <input
        type="text"
        name="display-name"
        placeholder="Display Name"
        v-model="displayName"
      />
      <input type="email" name="email" placeholder="Email" v-model="email" />
      <input
        type="password"
        name="password"
        placeholder="Password"
        v-model="password"
      />
      <input
        type="password"
        name="confirm-password"
        placeholder="Confirm Password"
        v-model="confirmPassword"
      />
      <button class="btn" disabled v-if="isLoading">Signing up...</button>
      <button class="btn" v-else>Signup</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import useSignup from '@/composables/useSignup';
import { useRouter } from 'vue-router';

export default {
  name: 'Signup',
  setup() {
    const { error, signup } = useSignup();
    const router = useRouter();

    const displayName = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const isLoading = ref(false);

    const handleSubmit = async () => {
      if (
        !displayName.value ||
        !email.value ||
        !password.value ||
        !confirmPassword.value
      ) {
        error.value = 'All fields are required';
      } else {
        if (password.value !== confirmPassword.value) {
          error.value = 'Confirm password is not match';
        } else {
          isLoading.value = true;
          await signup(email.value, password.value, displayName.value);
          if (!error.value) {
            router.push({ name: 'UserPlaylist' });
          }
          isLoading.value = false;
        }
      }
    };

    return {
      displayName,
      email,
      password,
      confirmPassword,
      handleSubmit,
      error,
      isLoading,
    };
  },
};
</script>
