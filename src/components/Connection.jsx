import React, { useEffect } from 'react'
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from "../utils/connectionSlice"
import axios from "axios";

const Connection = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {

      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data)
      dispatch(addConnections(res.data.data));
      
    }
    catch (err) {
    
      //handler eroor case
    }
    
  };
  useEffect(() => {
    fetchConnections();
    
  }, []);
  if (!connections) return;
  if(connections.length === 0) return <h1> No Connections Found</h1>
 

  

  return (
    <div className=' text-center my-10'>
      <h1 className='text-bold text-yellow-100 text-3xl '>Connections</h1>
      {connections.map((Connection) => {
        
        const { firstName, lastName, photoUrl, age, gender, about } = Connection;
      
        return (
          <div className='flex  m-4 p-4 max-w-1/2  rouded-lg bg-base-300 mx-auto'>
            <div>
              <img alt='photo'
                className='w-20 h-20 rounded-full'
                src={photoUrl} />
            </div>
            <div className='text-left mx-4'>
              <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
              {age && gender && <p>{age + " "+ gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );

      })}
    </div>
  )
}

export default Connection