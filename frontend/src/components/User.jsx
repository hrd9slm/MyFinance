import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function User() {
    const {auth}=useContext(AuthContext);
  return (
    <div>
      <h1>salma harda</h1>
      <p>{ auth.token }</p>
    </div>
  )
}

export default User
