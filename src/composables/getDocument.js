import { ref, watchEffect } from 'vue';
import { projectFirestore } from '@/firebase/config';

const getDocument = (collection, id) => {
  const error = ref(null);
  const document = ref(null);

  const docRef = projectFirestore.collection(collection).doc(id);

  const unsubscribe = docRef.onSnapshot(
    (doc) => {
      if (doc.data()) {
        document.value = { id: doc.id, ...doc.data() };
        error.value = null;
      } else {
        error.value = 'That document does not exist';
        document.value = null;
      }
    },
    (err) => {
      console.log(err.message);
      error.value = 'Could not fetch the document';
      document.value = null;
    }
  );

  // Unsubscribe from real time listener when component is unmounted
  watchEffect((onInvalidate) => {
    onInvalidate(() => unsubscribe());
  });

  return { error, document };
};

export default getDocument;
