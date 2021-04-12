import { ref } from 'vue';
import { projectStorage } from '@/firebase/config';
import getUser from './getUser';

// Steps
// 1. Create a path to firebase storage ('covers/{user_id}/{file_name}')
// 2. Create a reference to firebase storage with that path
// 3. Upload the file

const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const publicUrl = ref(null);
  const filePath = ref(null);

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`;
    const storageRef = projectStorage.ref(filePath.value);

    try {
      const res = await storageRef.put(file);
      publicUrl.value = await res.ref.getDownloadURL();
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  return { error, publicUrl, filePath, uploadImage };
};

export default useStorage;
