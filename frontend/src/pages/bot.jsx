import { Navbar } from '../components/navbar'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { bot } from '../Services/botapi'
import Skeleton from 'react-loading-skeleton'

export const Bot = () => {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [answer, setAnswer] = useState('');
    async function send() {
        try {
            setLoading(true); setAnswer('');
            console.log(loading);
            const response = await bot(prompt);
            const data = await response.json();
            setAnswer(data.text);
        } catch (err) {
            console.error(err.stack);
        } finally {
            setLoading(false);
            console.log(loading);
        }
    }
    return (
        <>
            <div className="absolute top-0 left-0 w-screen min-h-screen bg-linear-to-b from-10% from-green-940 via-50% via-green-950 to-100% to-green-960 z-0 cursor-default">
                <Navbar />
                <div className="mt-40 flex justify-center w-screen h-fit items-center">
                    <div className="relative w-[450px] max-1xm:w-[350px] max-1sm:w-[300px]">
                        <input
                            type="input"
                            value={prompt}
                            className="bg-black  rounded-[30px] w-full p-[20px] pr-[60px] outline-0 border-2 border-green-500 z-9"
                            placeholder="Ask Anything"
                            onInput={(e) => setPrompt(e.target.value)}
                        />
                        <ArrowUp
                            className="text-black absolute right-[15px] top-1/2 -translate-y-1/2 cursor-pointer p-[10px] rounded-full bg-white"
                            size={40} onClick={send}
                        />
                    </div>
                </div>
                <div className="mt-20 flex justify-center w-screen h-fit items-center">
                    <div className="bg-black border-2 border-green-500 rounded-[30px] p-[20px] w-[500px] min-h-[200px] text-white">
                        {loading ? (
                            <Skeleton count={5} width={400} height={30} borderRadius={20} />
                        ) : answer ? (
                            answer
                        ) : (
                            "Responses will appear here."
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
