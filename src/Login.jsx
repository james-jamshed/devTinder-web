import axios from "axios";
import React, { useState } from "react";

const Login = () => {

  const [emailId, setEmailId] = useState("msdhoni0823@gmail.com");
  const [password, setPassword] = useState("Msdhoni2001@");

  const handleLogin = async () => {

    try {
      const res = await axios.post("http://localhost:3000/login", {
        emailId,
        password,
      });
    }
    catch (err) {
      console.error(err);
     
    }

  };




  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs mx-2">
              <div className="label">
                {/* <span className="label-text">Email Id</span> */}
              </div>
              <input
                type="text"
                value={emailId}
                placeholder="Email"
                className="input input-bordered w-full max-w-xs"
                onChange={(e)=> setEmailId(e.target.value)}
              />
              <div className="label"></div>
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                {/* <span className="label-text">Email Id</span> */}
              </div>
              <input
                type="text"
                value={password}
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
                onChange={(e)=> setPassword(e.target.value)}
              />
              <div className="label"></div>
            </label>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
