import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { NeonSign } from '../types';

const COLLECTION_NAME = 'products';

export const productService = {
    // Subscribe to real-time updates
    subscribeProducts: (callback: (products: NeonSign[]) => void) => {
        const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));

        return onSnapshot(q, (snapshot) => {
            const products = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as NeonSign[];
            callback(products);
        });
    },

    // Add a new product
    addProduct: async (product: Omit<NeonSign, 'id'>) => {
        try {
            const docRef = await addDoc(collection(db, COLLECTION_NAME), {
                ...product,
                createdAt: Timestamp.now()
            });
            return docRef.id;
        } catch (error) {
            console.error("Error adding product: ", error);
            throw error;
        }
    },

    // Update an existing product
    updateProduct: async (id: string, updates: Partial<NeonSign>) => {
        try {
            const docRef = doc(db, COLLECTION_NAME, id);
            await updateDoc(docRef, updates);
        } catch (error) {
            console.error("Error updating product: ", error);
            throw error;
        }
    },

    // Delete a product
    deleteProduct: async (id: string) => {
        try {
            const docRef = doc(db, COLLECTION_NAME, id);
            await deleteDoc(docRef);
        } catch (error) {
            console.error("Error deleting product: ", error);
            throw error;
        }
    }
};
