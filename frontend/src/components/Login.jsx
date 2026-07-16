import React, { useState, } from 'react'
import {useNavigate} from 'react-router'


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:8000/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }
                ),
            })

            const data = await response.json()
            if (response.ok){
                localStorage.setItem('Token', JSON.stringify(data));
                navigate('/home');
            }
            console.log(data);
            
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    }


    return (
        <div className='flex items-center justify-center h-[100vh] bg-gray-200 backdrop-blur-md'>
            <div className='flex items-center h-full'>
                <div className='rounded-2xl p-5 h-[50%] bg-gradient-to-br from-blue-200 via-blue-250 via-blue-300 to-blue-350 flex flex-col'>
                    <button
                        className='text-4xl mb-[3%] flex text-slate-50 w-[60%] cursor-pointer'
                        onClick={() => {navigate('/')}}
                    >
                        SubTrack Login
                    </button>
                    <form
                        className='h-full'
                        onSubmit={handleSubmit}
                    >
                        <input
                            className='rounded-2xl mb-[4%] p-2 w-full border-2 border-blue-400  outline-none hover:border-2 hover:border-blue-600 focus:border-blue-600 focus:border-2 '
                            type="email"
                            placeholder='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className='rounded-2xl p-2 w-full border-blue-400 mb-[4%] border-2 hover:border-2 hover:border-blue-600 '
                            type="text"
                            placeholder='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className='bg-blue-400 w-full p-2 rounded-2xl cursor-pointer text-white'
                            type='submit'

                        >Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login