import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCwNMKhn9ChiF4eFAt0j2j6Pw8gpH2uDS4",
  authDomain: "edu-app-9e14f.firebaseapp.com",
  projectId: "edu-app-9e14f",
  storageBucket: "edu-app-9e14f.appspot.com",
  messagingSenderId: "855520869423",
  appId: "1:855520869423:web:496186dee49dd7b5031ada",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const trainingsRef = collection(db, "trainings");

export const useTrainingsLister = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    return onSnapshot(trainingsRef, (snapshot) => {
      setTrainings(
        snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            start_date: data.start_date.toDate(),
            end_date: data.end_date.toDate(),
          };
        })
      );
    });
  }, []);

  return trainings;
};