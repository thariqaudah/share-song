import { ref } from 'vue';
import { projectFirestore } from '@/firebase/config.js';

const useDocument = (collection, id) => {
  const error = ref(null);

  const documentRef = projectFirestore.collection(collection).doc(id);

  const deleteDoc = async () => {
    error.value = null;

    try {
      await documentRef.delete();
    } catch (err) {
      console.log(err.message);
      error.value = 'Error. Could not delete the document';
    }
  };

  const updateDoc = async (updates) => {
    error.value = null;

    try {
      const res = await documentRef.update(updates);
      return res;
    } catch (err) {
      console.log(err.message);
      error.value = 'Error. Can not update the document';
    }
  };

  return { error, deleteDoc, updateDoc };
};

export default useDocument;
