import React, { useEffect, useState } from 'react'
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSession } from "next-auth/react";
import app from '@/config/Firebase';
import PostDetails from '../componenrs/PostDetails';
import { doc, deleteDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
function index() {
    const { data: session } = useSession();
    const [data, setdata] = useState([])
    const router = useRouter()
    const db = getFirestore(app);
    const [images, setImages] = useState([]);
    const getpostofuser = async () => {
        if (session) {
            const q = query(collection(db, "posts"), where("email", "==", session?.user?.email));

            const querySnapshot = await getDocs(q);
            const posts = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                posts.push({ id: doc.id, ...doc.data() });
            });
            setdata(posts)
        }
    }
    const handledelete = async (id) => {
        await deleteDoc(doc(db, "posts", id));
        toast.success('Data has benn Delete successfully!');
        const newlist = data.filter((post) => {
            return post.id !== id
        })
        setdata(newlist)
        setTimeout(() => {
            router.push('/')
        }, 3000)
    }
    useEffect(() => {
        getpostofuser();
    }, [session])
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch('/api/GetImages');
                const data = await res.json();
                setImages(data.images || []);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
    }, []);
    return (
        <div className='m-5 '>
            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-5 m-5 mt-5 " >
                {data?.map((e) => {
                    return (
                        <div className='relative'>
                            <PostDetails post={e} img={images.filter((f) => {
                                return f.public_id == e.imageId
                            })} />
                            <button onClick={() => { handledelete(e.id) }} className='bg-red-600 rounded-full text-white p-2 absolute bottom-2 right-2 cursor-pointer' >Delete</button>
                        </div>
                    )
                })}
            </div>
            <ToastContainer />
        </div>
    )
}

export default index
