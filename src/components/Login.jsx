import { React, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../authentication/AppContext';
import FlashTitle from '../common/FlashTitle';
import '../css/Login.css'


const Login = () => {
    const { login } = useContext(AppContext);
    const [userNotFound, setUserNotFound] = useState('no');
    const [username, setUsername] = useState('') // Note: username is an email
    const [password, setPassword] = useState('')
    const nav = useNavigate();

    // Get username and password from form when login button clicked
    async function checkCredentials(e) {
          const loginCredentials = {
              username: username,
              password: password
          };

          if (username && password) {
            e.preventDefault();
            // const apiUrl = import.meta.env.VITE_API_URL;
            const apiUrl = 'http://127.0.0.1:8005';
                let res = await fetch(`${apiUrl}/login/`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginCredentials)
              });

            const response = await res.json() // This is token or server response
            // If token is present in the response, redirect to homepage
            if (response.token) {
              // This function needs to set the logged in user in the UserContext
                  // Store the token in sessionStorage (AuthContext manages this)
                  login(response.token);
                  // Redirect to homepage
                  nav('/');

                  // Call fetch request to get all users and listings
              } else {
                  // Display message on login screen 'email or password is incorrect'
                  // Set username and password fields to blank
                  const stringLength = username.length + password.length;
                  setUserNotFound('yes');
                  // 'Incorrect username or password - please try again'
                  IncorrectCredentials(stringLength);

              }



            } else {
                // Alert is shown if username or password is not entered
                e.preventDefault();
                setUserNotFound('yes');
                IncorrectCredentials();
          }

        function IncorrectCredentials(stringLength=0) {
            if (userNotFound === 'yes') {
                if (stringLength > 0) {
                    return <p className=''>Incorrect username or password <br/>- please try again</p>

                } else {
                    return <p className=''>Please enter your username and password</p>
                }
            } else {
              null
            }
        }
    }

    return (
        <>
                <div>< FlashTitle/></div>

                <div>
                    <div className=''>
                        <form className='login-form' onSubmit={checkCredentials} onInput={() => setUserNotFound('no')}>
                            <span className='form-item'>
                                <label htmlFor='username' className='form-item-label'>Username: </label>
                                <input className='input-box' id='username' type='text' value={username} onInput={(e) => setUsername(e.target.value)} />
                            </span>
                            <span className='form-item'>
                                <label htmlFor='password' className='form-item-label'>Password: </label>
                                <input className='input-box' id='password' type='password' value={password} onInput={(e) => setPassword(e.target.value)} />
                            </span>
                            <button
                                type='submit'
                                title='login-btn'
                                className='login-button'
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>

        </>
    )

};


export default Login;