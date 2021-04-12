import { ref } from 'vue';
import { projectFirestore } from '@/firebase/config.js';

const useDocument = (collection, id) => {
  const error = ref(null);
  const document = ref(null);

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

  return { error, document, deleteDoc };
};

export default useDocument;
