import { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Register(){
    const [formData, setFormData] = useState({
        name:"",
        email: "",
        password: "",
        });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


    try{
        const res = await axios.post("http://localhost:8080/api/auth/register", formData);
        alert("Registration successful");
        navigate("/login");
    }
    catch(error){
        alert(error.response?.data?.error || "Something went wrong");
    }
}; 
    return(
            <div className='flex items-center justify-center h-screen bg-gray-900 text-white'>
                <form onSubmit={handleSubmit} className='bg-gray-800 p-6 rounded-xl shadow-lg w-96'>
                    <h2 className='text-2xl font-bold mb-4 text-center'>Register</h2>
                    <input type='text' 
                        name='name'
                        placeholder='Name'
                        className='w-full p-2 mb-3 rounded bg-gray-700'
                        onChange={handleChange}
                        required
                    />
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

                    <button className='w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded'>
                        Register
                    </button>

                </form>

            </div>

    )
}

export default Register;