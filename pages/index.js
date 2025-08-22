import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

import Hero from "./componenrs/Hero";
import Search from "./componenrs/Search";

import GameImages from "./componenrs/GameImages";
import { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import app from "@/config/Firebase";
import { collection, getDocs } from "firebase/firestore";
import Posts from "./componenrs/Posts";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [data, setdata] = useState([]);
  const [Alldata, setAlldata] = useState([]);
  const db = getFirestore(app);
  const getPost = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const tempData = [];
    const fetchData = [];
    querySnapshot.forEach((doc) => {
      fetchData.push(doc.data());
    });
    querySnapshot.forEach((doc) => {
      tempData.push(doc.data());
    });
    setdata(tempData);
    setAlldata(fetchData);


  };
  const handleSearchButn = (text) => {
    const datafilter = Alldata.filter((e) => {
      return e.title.toLowerCase().includes(text.toLowerCase())
    })
    setdata(datafilter);
  }
  useEffect(() => {
    getPost();
  }, []);
  return (
    <div>
      <Hero />
      <Search onSearch={handleSearchButn} />
      <GameImages />
      <Posts posts={data} />
    </div>

  );
}
