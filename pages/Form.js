import React, { useEffect, useState } from 'react'
import gamesImg from '@/gamesImagesData/Data'
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from "next-auth/react";
import { Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import app from '@/config/Firebase';
function Form() {
    const { data: session } = useSession();
    const router = useRouter();
    const [DataForm, setDataForm] = useState({ username: "", email: "", title: "", disc: "", date: "", location: "", game: "", image: "" })
    const [file, setFile] = useState(null);
    const db = getFirestore(app);
    const handleUploadImage = async () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        return data.public_id;
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            let imageId = "";
            if (file) {
                imageId = await handleUploadImage();
            }

            const setdate = {
                ...DataForm,
                imageId,
                date: Timestamp.fromDate(new Date(DataForm.date))
            };
            await setDoc(doc(db, "posts", Date.now().toString()), setdate);
            toast.success('Data has benn sent successfully!');
            setDataForm({ ...DataForm, title: "", disc: "", date: "", location: "", game: "", image: "" });
            setTimeout(() => {
                router.push('/')
            }, 3000)
        } catch (error) {

            toast.error("error");
        }
    }
    useEffect(() => {
        setDataForm({ ...DataForm, username: session?.user?.name, email: session?.user?.email })
    }, [session]);
    return (
        <div>
            <form class="max-w-sm mx-auto p-8  border-2 border-orange-300" onSubmit={handlesubmit}>
                <div class="mb-5">
                    <label for="Title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input value={DataForm.title} onChange={(e) => {
                        setDataForm({ ...DataForm, title: e.target.value })
                    }} type="text" id="Title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div class="mb-5">
                    <label for="Discription" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discription</label>
                    <input value={DataForm.disc} onChange={(e) => {
                        setDataForm({ ...DataForm, disc: e.target.value });
                    }} type="text" id="Discription" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div class="mb-5">
                    <label for="Date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                    <input value={DataForm.date} onChange={(e) => {
                        setDataForm({ ...DataForm, date: e.target.value })
                    }} type="date" id="Date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div class="mb-5">
                    <label for="Location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                    <input value={DataForm.location} onChange={(e) => {
                        setDataForm({ ...DataForm, location: e.target.value })
                    }} type="text" id="Location" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div class="mb-5">
                    <select value={DataForm.game} onChange={(e) => {
                        setDataForm({ ...DataForm, game: e.target.value })
                    }} id="ChooseGame" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose a Game</option>
                        {gamesImg.map((e, index) => {
                            return (<option key={index} value={e.name}>{e.name}</option>)
                        })}
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">الصورة</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        required
                    />
                </div>

                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
            <ToastContainer />

        </div>
    )
}

export default Form
