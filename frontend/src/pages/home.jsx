import { Navbar } from '../components/navbar'
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import cropseason from '../assets/cropseason.jpg'

export const Home = () => {
  const fullText = "Empowering Farmers With Simple, Smart and Sustainable Solutions"
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, i))
      i++
      if (i > fullText.length) clearInterval(interval)
    }, 50) 
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="absolute top-0 left-0 w-screen min-h-screen bg-linear-to-b from-10% from-green-940 via-50% via-green-950 to-100% to-green-960 z-0 cursor-default">
        <Navbar />
        <div className="flex w-screen 2sm:h-[550px] 1sm:h-[450px] h-[330px] sm:justify-center justify-start mt-30">
          <motion.header
            className="2sm:w-[650px] 1sm:w-[450px] text-wrap 1xs:w-[325px] 
                       2sm:text-[64px] 1sm:text-[45px] 1xs:text-[30px] 
                       text-black font-bold 1sm:ms-7 1xs:ms-10 2sm:ms-0 "
          >
            {displayedText}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-[3px] h-[1em] bg-black ml-1"
            />
          </motion.header>
        </div>
        <motion.div className="w-screen h-fit flex 2sm:flex-row 2sm:gap-[20px] flex-col gap-[8px] mt-[5]" initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,ease:"easeInOut"}}>
            <header className="text-wrap  2sm:w-[450px] 2sm:text-[70px] 2sm:ms-15 1sm:w-[300px] 1sm:text-[50px] 1sm:ms-15 font-bold w-[200px] text-[35px] ms-15"><span className="text-white">Get Real Time</span>  <span className="text-blue-500">Weather Info</span></header>
            <img className="rounded-full 2sm:ms-50 justify-self-end-safe" width="400px" height="400px" src={cropseason}/>
        </motion.div>
        <motion.div className="w-screen mt-25 h-fit flex 2sm:flex-row 2sm:gap-[20px] flex-col gap-[8px]" initial={{y:25,opacity:0}} whileInView={{y:0,opacity:1}} viewport={{once:true}} transition={{duration:0.5,ease:"easeInOut"}}>
            <header className="text-wrap  2sm:text-[70px] 2sm:ms-15  1sm:text-[50px] 1sm:ms-15 font-bold  text-[35px] ms-15"><span className="text-black">And</span> <span className="text-yellow-500">Soil Data...</span></header>
        </motion.div>
        <motion.div className="w-screen mt-25 h-fit flex 2sm:flex-row 2sm:gap-[20px] flex-col gap-[8px]" initial={{y:25,opacity:0}} whileInView={{y:0,opacity:1}} viewport={{once:true}} transition={{duration:0.5,ease:"easeInOut"}}>
        <header className="text-wrap  2sm:text-[70px] 2sm:ms-15  1sm:text-[50px] 1sm:ms-15 font-bold  text-[35px] ms-15 text-black">And Solve Any Of Your Queries with FarmGuide</header>
        </motion.div>
      </div>
    </>
  )
}
