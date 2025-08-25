'use client'; // إذا كنت تستخدم Next.js 13 فما فوق، وإلا يمكنك حذفه

import { useEffect, useState } from 'react';
import PostDetails from './PostDetails';

function Posts({ posts }) {
    const [images, setImages] = useState([]);


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
        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-5 m-5 mt-5">
            {posts?.map((e, index) => (
                <PostDetails key={index} post={e} img={images.filter((f) => {
                    return f.public_id == e.imageId
                })} />
            ))}
        </div>
    );
}

export default Posts;
