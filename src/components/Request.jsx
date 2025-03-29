import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requesetSlice'

const Request = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();
    

    const revieRequest = async (status,_id) => {
        try {
            const res = axios.post(BASE_URL + "/request/review/" + status + "/" + _id,
                {},
                {withCredentials:true}
            );
            dispatch(removeRequest(_id));
        } catch (err) {
            //handle error
        }
    }

    const fetchRequest = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", {
                withCredentials: true,
            });

            dispatch(addRequest(res.data.data));
           
            
            
        }
        catch (err) {
            console.log(err);
            
        }
    }
    useEffect(() => {
        fetchRequest();
        
    },[])
    if (!requests) return null;
  if(requests.length === 0) return <h1 className='flex justify-center my-4'> No Request Found</h1>

  return (
    <div  className=' text-center my-10'>
      <h1 className='text-bold text-yellow-100 text-3xl '>Connection Request</h1>
      {requests.map((request) => {
        
        const { _id,firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
      
        return (
            <div
                key={_id}
                className='flex items-center  m-4 p-4 max-w-2/3  rouded-lg bg-base-300 mx-auto'>
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
                <div className='ml-auto flex space-x-2'>
                    <button className="btn btn-secondary mx-2"
                        onClick={() => revieRequest("rejected", request._id)}>Reject</button>
                    <button className="btn btn-success mx-2"
                        onClick={() => revieRequest("accepted", request._id)}>Accept</button>
                </div>
          </div>
        );

      })}
    </div>
  )
}

export default Request