import { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Login(){
    const [formData, setFormData] = useState({ email: "", password: ""});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


    try{
        const res = await axios.post("http://localhost:8080/api/auth/login", formData);
        localStorage.setItem("token", res.data.token); // it will save JWT
        alert("Login successful");
        navigate("/dashboard");
    }
    catch(error){
        alert(error.response?.data?.error || "Invalid credentials");
    }
}; 
    return(
            <div className='flex items-center justify-center h-screen bg-gray-900 text-white'>
                <form onSubmit={handleSubmit} className='bg-gray-800 p-6 rounded-xl shadow-lg w-96'>
                    <h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>
                    <input type='email' 
                        name='email'
                        placeholder='Email'
                        className='w-full p-2 mb-3 rounded bg-gray-700'
                        onChange={handleChange}
                        required
                    />
                    <input type='password' 
                        name='password'
                        placeholder='Password'
                        className='w-full p-2 mb-3 rounded bg-gray-700'
                        onChange={handleChange}
                        required
                    />

                    <button className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded'>
                        Login
                    </button>

                </form>

            </div>
    )
}

export default Login;