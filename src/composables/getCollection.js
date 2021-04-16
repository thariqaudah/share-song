import { ref, watchEffect } from 'vue';
import { projectFirestore } from '../firebase/config';

const getCollection = (collection, query) => {
  const error = ref(null);
  const documents = ref(null);

  let collectionRef = projectFirestore
    .collection(collection)
    .orderBy('createdAt');

  if (query) {
    collectionRef = collectionRef.where(...query);
    console.log(collectionRef);
    console.log(...query);
  }

  // Get documents from DB by realtime
  const unsubscribe = collectionRef.onSnapshot(
    (snapshot) => {
      const results = [];
      snapshot.docs.forEach((doc) => {
        doc.data().createdAt && results.push({ id: doc.id, ...doc.data() });
      });
      documents.value = results;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      error.value = 'Could not fetch data';
      documents.value = null;
    }
  );

  // Unsubscribe from real time listener when component is unmounted
  watchEffect((onInvalidate) => {
    onInvalidate(() => unsubscribe());
  });

  return { error, documents };
};

export default getCollection;
