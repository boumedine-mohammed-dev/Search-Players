import { useState } from 'react'
import gamesImg from '@/gamesImagesData/Data'

function GameImages() {
    const [gamelist, setgamelist] = useState(gamesImg);
    return (
        <div className='grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 mt-8'>
            {gamelist?.map((e) => {
                return (
                    <div key={e?.id} className='flex flex-col items-center cursor-pointer hover:animate-bounce transition-all mt-3' >
                        <img src={e?.image} width={40} height={40} />
                        <h1>{e?.name}</h1>
                    </div>
                )
            })}
        </div>
    )
}

export default GameImages
