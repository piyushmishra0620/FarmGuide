const URI = import.meta.env.VITE_BACKEND_API;

export const bot = async (prompt)=>{
    try{
        const res = await fetch(`${URI}/botreply`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({prompt:prompt})
        });
        return res;
    }catch(err){
        console.error(err.stack);
        return {error:err.message}
    }
}