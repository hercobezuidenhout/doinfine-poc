export const useSpaceCollection = (db: FirebaseFirestore.Firestore, id) => db.collection('spaces').doc(id)