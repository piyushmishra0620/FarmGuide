import {useState,useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../Hooks/useAuth'

export const Login = () => {
    const [email,setEmail] = useState('');
    const [emailError,setEmailError]=useState('');
    const [password,setPassword] = useState('');
    const [passwordError,setPasswordError]=useState('');
    const emailRef=useRef('');
    const passwordRef=useRef('');
    const {signin}=useAuth();
    const navigate = useNavigate();
    let errors=0;
    const handleClick = async (e)=>{
        e.preventDefault();
        if(email.trim()===""){
            setEmailError("Email can't be empty.");errors++;
        }
        if(password.trim()===""){
            setPasswordError("Password can't be empty.");errors++;
        }
        if(email.trim()!=="" &&  !(/gmail\.com$/i.test(email))){
            setEmailError("Email must contain @gmail.com");errors++;
        }
        if(password.trim()!=="" && password.length<8){
            setPasswordError("Password must be of a minimum length of 8");errors++;
        }
        if(errors!=0)return;
        try{
            const result = await signin(email.trim(),password.trim());
            if("error" in result){
                if(result.error==="User not found with this email-id"){
                    alert("User not registered.Sign up first.");return;
                }if(result.error==="Incorrect password given."){
                    alert("Incorrect password provided.");return;
                }if(result.error==="Internal server error."){
                    alert("Internal Server error occurred.");return;
                }
            }
            navigate('/Home');
        }catch(err){
            console.error(err.stack);
            alert('Login failed.');
        }
    }
    return (
        <>
            <div className="bg-linear-to-t from-green-940 from-10% via-green-950 via-50% to-green-960 to-100% w-screen min-h-screen flex flex-col justify-center items-center cursor-default z-0">
                <h1 className="text-black font-bold font-sans text-3xl">Login</h1>
                <div className="mt-[5px] p-[30px] [@media(max-width:540px)]:p-[20px] rounded-[10px] bg-black/10 shadow-md shadow-black backdrop-blur-[40px] z-10 border-black border-1">
                    <div className="w-full h-fit flex flex-col items-center ">
                        <input type="email" placeholder="Enter Your Email" ref={emailRef} value={email} className={`p-[10px] [@media(max-width:540px)]:p-[6px] rounded-[10px] border-black border-2 bg-black w-[350px] [@media(max-width:540px)]:w-[250px] outline-0 ${passwordError ? 'mb-[5px]' : 'mb-[20px]'}`} onChange={(e)=>setEmail(e.target.value)} />
                        {emailError && (<p className="text-red-500 mb-[20px] font-semibold">{emailError}</p>)}
                        <input type="password" placeholder="Enter Your Password" ref={passwordRef} value={password} className={`p-[10px] [@media(max-width:540px)]:p-[6px] rounded-[10px] border-black border-2 bg-black w-[350px] [@media(max-width:540px)]:w-[250px] outline-0 ${passwordError ? 'mb-[5px]' : 'mb-[20px]'}`} onChange={(e)=>setPassword(e.target.value)} />
                        {passwordError && (<p className="text-red-500 mb-[20px] font-semibold">{passwordError}</p>)}
                    </div>
                    <div className="bg-transparent w-full h-fit flex  justify-center mt-[20px] mb-[20px]">
                        <button className="pt-[10px] [@media(max-width:540px)]:pt-[8px] pb-[10px] [@media(max-width:540px)]:pb-[8px] ps-[150px] [@media(max-width:540px)]:ps-[100px] pe-[150px] [@media(max-width:540px)]:pe-[100px] rounded-[10px] bg-blue-500 cursor-pointer border-black border-2 outline-black outline-2 hover:bg-white/5 hover:backdrop-blur-[25px]" onClick={handleClick}>Login</button>
                    </div>
                </div>
            </div>
        </>
    )
}
