import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function User() {
  const { auth } = useContext(AuthContext);
  const user =auth.user.salary;

  return (
    <div>
      <h1>User Info</h1>
      <p>Token: {auth.token}</p>
      <p>Is Authenticated: {auth.isAuthenticated ? "Yes" : "No"}</p>
      <p>User: {user}</p>
    </div>
  );
}

export default User;
