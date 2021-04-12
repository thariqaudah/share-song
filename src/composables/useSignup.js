import { ref } from 'vue';
import { projectAuth } from '@/firebase/config';

const error = ref(null);

const signup = async (email, password, displayName) => {
  error.value = null;

  try {
    const res = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (!res.user) {
      throw new Error('Sign up failed');
    }

    await res.user.updateProfile({ displayName });
    return res;
  } catch (err) {
    console.log(err);
    error.value = err.message;
  }
};

const useSignup = () => {
  return { error, signup };
};

export default useSignup;
