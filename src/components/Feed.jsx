import { BASE_URL } from "../utils/constants";
import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((Store) => Store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed",
        {
          withCredentials: true,
          
        });
      dispatch(addFeed(res?.data?.data));
    }
    catch (err) {
      //Tode handle error
    }

  };
  useEffect(() => {
    getFeed();

  }, []);
  return (
    feed && (
      <div className="flex justify-center">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;