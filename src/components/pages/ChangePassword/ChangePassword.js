import React from 'react'
import { useRef } from 'react'
import { Button } from 'react-bootstrap'
import { useContext } from 'react'
import AuthContext from '../../../ContextStore/AuthContext'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
        const {token} = useContext(AuthContext)
        const navigate = useNavigate()
        const passwordInputRef = useRef()

        const submitHandler = async(e) =>{
            e.preventDefault();
          console.log(token)
            const enteredNewPassword = passwordInputRef.current.value;
            //faulty code becoz token is null after logout
           try{ const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAZcDBVCjFKYDmw-K1lRVmfTdwiX4kfzBA', {
            method: 'POST',
            body: JSON.stringify({
              idToken: token,
              password: enteredNewPassword,
              returnSecureToken: true,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            
            let errorMessage = 'Authentication failed!';
        
            throw new Error(errorMessage);
          }
        
          navigate('./')
        }catch (error) {
            alert(error.message);
          }
           
        }
  return (
    <div>
        <form onSubmit={submitHandler} >
        <h2><span>Change Password</span></h2>
        
        <input type="password" id="password" ref={passwordInputRef} required placeholder='Enter your password'/>
        <Button type='submit'>Submit</Button>
        </form>
    </div>
  )
}

export default ChangePassword