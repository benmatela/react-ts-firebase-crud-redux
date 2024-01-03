import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

/**
 * Adds a new document to a collection
 *
 * @param {string} collectionPath
 * @param {string} itemId
 * @param {any} item
 */
export const addNewDocumentToCollection = (
  collectionPath: string,
  itemId: string,
  item: any
) => {
  try {
    setDoc(doc(db, collectionPath, itemId), item);
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 * Deletes a document from a collection
 *
 * @param {string} collectionPath
 * @param {string} itemId
 */
export const deleteDocumentFromCollection = (
  collectionPath: string,
  itemId: string
) => {
  try {
    deleteDoc(doc(db, collectionPath, itemId));
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 * Updates a document in a collection
 *
 * @param {string} collectionPath
 * @param {string} itemId
 * @param {any} item
 */
export const updateDocumentInCollection = (
  collectionPath: string,
  itemId: string,
  item: any
) => {
  try {
    updateDoc(doc(db, collectionPath, itemId), item);
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 * Gets collection from the server or on local cache when offline
 *
 * @param {string} collectionPath eg: `"products"`
 * @param {string} whereField eg: `"name", "id"`
 * @param {any} whereFilterOp eg: `"==", "!=="`
 * @param {any} whereValue eg: `"tom", "daw422adklwaewaew"`
 * @param {any} result
 */
export const getCollectionFromServerOrOfflineCache = (
  collectionPath: string,
  whereField: string,
  whereFilterOp: any,
  whereValue: any
) => {
  try {
    const q = query(
      collection(db, collectionPath),
      where(whereField, whereFilterOp, whereValue)
    );

    onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        // Listen for newly added document to this collection
        if (change.type === "added") {
          console.log(
            `New item: ${JSON.stringify(
              change.doc.data()
            )} added to: ${collectionPath}`
          );
        }

        // change.doc.data();
      });

      // Save collection result
      let collectionResultArray: any[] = [];
      snapshot.forEach((doc) => {
        collectionResultArray.push({ ...doc.data(), id: doc.id });
      });

      const source = snapshot.metadata.fromCache ? "local cache" : "server";
      console.log("Data came from " + source);
    });
  } catch (error: any) {
    throw new Error(error);
  }
};
