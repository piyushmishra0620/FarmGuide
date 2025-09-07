import {createContext,useReducer,useEffect} from 'react'
import {signup,login,logout,getUser} from '../Services/authapi'

const AuthContext = createContext();

function reducer(state,action){
    switch(action.type){
        case "setUser":
            return {...state , user:action.user}
        case "setLoading":
            return {...state , loading:action.load}
        case "setAuthenticated":
            return {...state , isAuthenticated:action.authenticate}
        default:
            return state;            
    }
}

export const AuthProvider = (props)=>{
    const [state,dispatch] = useReducer(reducer,{user:"",loading:true,isAuthenticated:false});
    useEffect(()=>{
        const invokeCall = async ()=>{
            const token = await getUser();
            if("user" in token){
                dispatch({type:"setUser", user:token.user});
                dispatch({type:"setLoading",load:false});
                dispatch({type:"setAuthenticated",authenticate:true});
            }
        }
        invokeCall();
    },[]);

    const signin = async (email,password)=>{
        try{
            const res = await login(email,password);
            dispatch({type:"setUser",user:res});
            dispatch({type:"setLoading",load:false});
            dispatch({type:"setAuthenticated",authenticate:true});
            return res.json();
        }catch(err){
            return {error:err.message}
        }
    }

    const register = async (username,email,password)=>{
        try{
            const res = await signup(username,email,password);
            dispatch({type:"setUser",user:res});
            dispatch({type:"setLoading",load:false});
            dispatch({type:"setAuthenticated",authenticate:true});
            return res.json();
        }catch(err){
            return {error:err.message}
        }
    }

    const signout = async ()=>{
        try{
            const res = await logout();
            dispatch({type:"setUser",user:""});
            dispatch({type:"setLoading",load:true});
            dispatch({type:"setAuthenticated",authenticate:false});
        }catch(err){
            return {error:err.message}
        }
    }
    return(
        <AuthContext.Provider value={{state,signin,register,signout}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export  default AuthContext;