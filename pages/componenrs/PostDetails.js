import React from 'react'
import { FcCalendar } from "react-icons/fc";
import { FaLocationDot } from "react-icons/fa6";
function PostDetails({ post, img }) {
    const Formatdate = new Date(post?.date?.seconds * 1000).toLocaleString();
    return (
        <div className='mt-5' >
            {post ? <img src={img[0]?.secure_url || "/image/logo.png"} className=' w-full h-[400px]' a /> : <div>anonymos</div>}
            <a class="block bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 class="m-3 p-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post?.title || "anonymos"}</h5>
                <p class=" m-3 p-1 font-normal text-gray-700 dark:text-gray-400 flex items-center gap-2">{post?.disc || "anonymos"}</p>
                <p class=" m-3 p-1 font-normal text-gray-700 dark:text-gray-400 flex items-center gap-2"> <span><FcCalendar /></span> <span>{Formatdate || "anonymos"}</span></p>
                <p class=" m-3 p-1 font-normal text-gray-700 dark:text-gray-400 flex items-center gap-2 "> <span><FaLocationDot /></span> <span>{post?.location || "anonymos"}</span> </p>
            </a>

        </div>
    )
}
export default PostDetails