const URI= import.meta.env.VITE_BACKEND_API;

const signup = async (username,email,password)=>{
    try{
        const res = await fetch(`${URI}/auth/signup`,{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({username:username,email:email,password:password})
        });
        return res.json();
    }catch(err){
        console.error(err.stack);
        return {error:err.message}
    }
}

const login = async(email,password)=>{
    try{
        const res = await fetch(`${URI}/auth/login`,{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({username:username,password:password})
        });
        return res.json();
    }catch(err){
        console.error(err.stack);
        return {error:err.message}
    }
}

const logout = async()=>{
    try{
        const res = await fetch(`${URI}/auth/logout`,{
            method:"POST",
            credentials:"include"
        });
        return res.json();
    }catch(err){
        console.error(err.stack);
        return {error:err.message}
    }
}

const getUser = async ()=>{
    try{
        const res = await fetch(`${URI}/auth/getuser`,{
            method:"GET",
            credentials:"include"
        });
        return res.json();
    }catch(err){
        console.error(err.stack);
        return {error:err.message}
    }
}

export {signup,login,logout,getUser};