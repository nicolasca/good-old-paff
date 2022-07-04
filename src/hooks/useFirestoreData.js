import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "..";

export default function useFirestoreData(collectionName) {
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const collec = collection(db, collectionName);
      const q = query(collec, orderBy("name"));
      const snapshot = await getDocs(q);
      const dataList = snapshot.docs.map((doc) => doc.data());
      setResults(dataList);
    };
    fetchData();
  }, [collectionName]);

  return results;
}
