import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Hooks/useAuth'

export const Signup = () => {
    const [user, setUser] = useState('');
    const [userError, setUserError] = useState('');
    const [user1, setUser1] = useState('');
    const [user1Error, setUser1Error] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const userInputRef = useRef('');
    const userInputRef1 = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const { register } = useAuth();

    let errors = 0;
    const handleClick = async (e) => {
        e.preventDefault();
        if (user.trim()==="") {
            setUserError('Username is required.'); errors++;
        }
        if (email.trim()==="") {
            setEmailError('Email is required.'); errors++;
        }
        if (password.trim()==="") {
            setPasswordError('Password is required.'); errors++;
        }
        if (user.trim()!=="" &&  user.length < 3) {
            setUserError('Username must have atleast 3 letters.'); errors++;
        }
        if (user.trim()!=="" && /\d/.test(user)) {
            setUserError("Username can't contain numbers."); errors++;
        }
        if ( password.trim()!=="" && password.length < 8) {
            setPasswordError('Password must be atleast 8 characters long.'); errors++;
        }
        if (email.trim()!=="" && !(/gmail\.com$/i.test(email))) {
            setEmailError('Email must contain @gmail.com'); errors++;
        }
        if (errors != 0) return;
        try {
            const result = await register(user.trim(), email.trim(), password.trim());
            if ("error" in result) {
                if (result.error === "User already exists with this email.") {
                    alert("User already exists with this email-id"); return;
                }
                if (result.error === "Internal server error.") {
                    alert("Internal server error."); return;
                }
            }
            navigate('/Home');
        } catch (err) {
            console.error(err.stack);
            alert('Sign-in failed.');
        }
    }
    return (
        <>
            <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-linear-to-b from-10% from-green-940 via-50% via-green-950 to-100% to-green-960 cursor-default z-0 ">
                <h1 className="text-black font-bold text-[36px] font-sans z-10">Sign up</h1>
                <div className="p-[30px] [@media(max-width:540px)]:p-[20px] rounded-[10px] mt-[5px]  bg-black/10 backdrop-blur-[40px] z-10 shadow-black shadow-md border-black border-1 ">
                    <div className="w-full h-fit flex flex-col items-center">
                        <input type="text" ref={userInputRef} value={user} placeholder="Enter your Name" required  className={`p-[10px] [@media(max-width:540px)]:p-[6px] rounded-[10px] border-black border-2 bg-black w-[350px] [@media(max-width:540px)]:w-[250px] outline-0 ${userError ? 'mb-[5px]' : 'mb-[20px]'}`} onInput={(e) => setUser(e.target.value)} />
                        {userError && (<p className="text-red-500 mb-[20px] font-semibold">{userError}</p>)}
                        <input type="email" value={email} ref={emailRef} placeholder="Enter your Email" required className={`p-[10px] [@media(max-width:540px)]:p-[6px] rounded-[10px] border-black border-2 bg-black w-[350px] [@media(max-width:540px)]:w-[250px] outline-0 ${emailError ? 'mb-[5px]' : 'mb-[20px]'}`}
                            onInput={(e) => setEmail(e.target.value)} />
                        {emailError && (<p className="text-red-500 mb-[20px] font-semibold">{emailError}</p>)}
                        <input type="password" value={password} ref={passwordRef} placeholder="Enter your Password" required  className={`p-[10px] [@media(max-width:540px)]:p-[6px] rounded-[10px] border-black border-2 bg-black w-[350px] [@media(max-width:540px)]:w-[250px] outline-0 ${passwordError ? 'mb-[5px]' : 'mb-[20px]'}`} onInput={(e) => setPassword(e.target.value)} />
                        {passwordError && (<p className="text-red-500 mb-[20px] font-semibold">{passwordError}</p>)}
                    </div>
                    <div className="mt-[10px] mb-[10px] ms-[30px] [@media(max-width:540px)]:ms-[20px] [@media(max-width:540px)]:text-[10px]">
                        <p className="text-white font-medium text-[15px]">Already have an account? <highlight className="text-blue-500 font-medium text-[15px] cursor-pointer hover:underline hover:decoration-blue-500 active:underline active:decoration-blue-500" onClick={() => { navigate('/login') }}>Login</highlight></p>
                    </div>
                    <div className="bg-transparent w-full h-fit flex flex-col items-center">
                        <button className="font-bold pt-[10px] [@media(max-width:540px)]:pt-[8px] pb-[10px] [@media(max-width:540px)]:pb-[8px] ps-[150px] [@media(max-width:540px)]:ps-[90px] pe-[150px] [@media(max-width:540px)]:pe-[90px] rounded-[10px] bg-blue-500 border-black border-2 outline-black outline-2 hover:bg-white/5 hover:backdrop-blur-[25px]  cursor-pointer z-20" onClick={handleClick}>Sign Up</button>
                    </div>
                </div>
            </div>
        </>
    )
}
