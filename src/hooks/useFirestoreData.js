import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "..";

export default function useFirestoreData(collectionName, user) {
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const collec = collection(db, collectionName);
      const queryConstraints = [];
      if (user && user.email) {
        queryConstraints.push(where("owner_email", "==", user.email));
      }

      const q = query(collec, orderBy("name"), ...queryConstraints);
      const snapshot = await getDocs(q);
      const dataList = snapshot.docs.map((doc) =>
        Object.assign({ id: doc.id }, doc.data())
      );
      setResults(dataList);
    };
    fetchData();
  }, [collectionName, user]);

  return results;
}
