import React, { useEffect, useState } from 'react';
import MyContext from './myContext';
import { fireDB } from '../../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { toast } from 'react-toastify';

function MyState(props) {
  const [mode, setMode] = useState('light');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  };

  const addProduct = async () => {
    if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
      return toast.error('Please fill all fields');
    }
    const productRef = collection(fireDB, "products");
    setLoading(true);
    try {
      await addDoc(productRef, products);
      toast.success("Product added successfully");
      window.location.href = '/dashboard';
      getProductData();
      closeModal();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setProducts([]);
  };

  const getProductData = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time"),
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        console.log("Fetched products:", productsArray); // Log fetched products
        setProducts(productsArray);
        setLoading(false);
      });
      return () => data();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const edithandle = (item) => {
    setProducts(item);
  };

  const updateProduct = async (item) => {
    setLoading(true);
    try {
      await setDoc(doc(fireDb, "products", products.id), products);
      toast.success("Product Updated successfully");
      getProductData();
      setLoading(false);
      window.location.href = '/dashboard';
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setProducts([]);
  };

  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDb, "products", item.id));
      toast.success('Product Deleted successfully');
      setLoading(false);
      getProductData();
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <MyContext.Provider value={{ 
      mode, toggleMode, loading, setLoading,
      products, setProducts, addProduct }}>
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;
