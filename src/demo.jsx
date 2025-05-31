import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Demo() {
    const [mentees,setMentees]=useState([])

    const fetchMentees=async ()=>{ 
        const response=await axios.get('http://localhost:8000/api/mentor');
        setMentees(response?.data?.result)
    }
    useEffect(()=>{
        fetchMentees()
    },[])

    const addMentees=async (formData)=>{ 
        try{
            const response=await axios.put('http://localhost:8000/api/mentee',formData);
            if (response.status===200||response.status===201) {
                console.log('mentee added successfully');
                
            }else{
                throw response                
            }
        }catch(error){
            console.error(error)
            
        }
        
    }
    
  return (
    <div>demo</div>
  )
}

export default Demo