import {motion, AnimatePresence} from 'framer-motion'
import {NavLink} from 'react-router-dom'
import {Home,Bot} from 'lucide-react'

export const Navbar = ()=>{

    const links= [{ to : '/Home' , icon: <Home/> } , { to:'/Chat', icon: <Bot/> }];
    return(
        <>
        <div className="w-screen h-fit flex justify-center">
            <nav className=" fixed top-3 rounded-[30px] bg-black/10 backdrop-blur-[40px] shadow-black shadow-md z-10 flex justify-between">
            {
                links.map((link)=>(
                    <NavLink to={link.to} key={link.to} end caseSensitive className="relative pt-[15px] pb-[15px] pl-[40px] pr-[40px] m-[5px] rounded-[30px] text-black cursor-pointer">
                        {
                            ({isActive,isPending})=>{
                                return(
                                <>
                                {
                                    <AnimatePresence>
                                        {
                                            (isActive || isPending) && (
                                                <motion.div layoutId="nav" className="absolute inset-0 bg-white/5 pt-[15px] pb-[15px] pl-[40px] pr-[40px] m-[5px] rounded-[30px] backdrop-blur-[40px] cursor-pointer" />
                                            )
                                        }
                                    </AnimatePresence>
                                }
                                <span className="relative z-10">{link.icon}</span>
                                </>
                                )
                            }
                        }
                    </NavLink>
                ))
            }
            </nav>
        </div>
        </>
    )
}
