import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Dashboard(){

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() =>{
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/login");
            return;
        }

        // fetch user profile
        axios.get(`${import.meta.env.VITE_API_URL}/api/user/me`, {
            headers : { Authorization : `Bearer ${token}`},
        })
        .then((res) => setUser(res.data))
        .catch((error) => {
            console.error(error);
;            alert("Session expired, please login again!");
            localStorage.removeItem("token");
            navigate("/login");
        });
    }, [navigate]);

    if(!user){
        return(
            <div className='flex justify-center items-center h-screen text-white'>
                <h2>Loading Your dashboard...</h2>  
            </div>
        )
    }

    return(
        <>
            <div className="min-h-screen bg-gray-900 text-white p-6">
                <h1 className="text-3xl font-bold mb-4">Welcome, {user.name || "Student"}</h1>

                <div className="bg-gray-800 p-4 rounded-xl shadow-md">
                    <p><strong>Email: </strong> { user.email}</p>
                    <p><strong>CGPA: </strong> { user.cgpa || "Not added yet"}</p>
                    <p><strong>Skills: </strong>{ user.skills || "No skills added"}</p>
                    <p><strong>Achievements: </strong>{ user.achievements || "No achievements yet" }</p>
                    <p><strong>Career Goals: </strong>{ user.careerGoals || "Not defined"}</p>
                    {user.resume && (
                        <p>
                            <strong>Resume: </strong>{" "}
                            <a href={`${import.meta.env.VITE_API_URL}${user.resume}`}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="text-blue-400 underline"
                            >
                                View Resume
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}

export default Dashboard;