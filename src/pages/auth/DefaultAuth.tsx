import { useState } from 'react'
import './authform.scss' // Import your CSS file here
import Register from './components/register'
import Login from './components/login'

const DefaultAuth = () => {
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSignUpClick = () => {
    setIsSignUp(true)
  }

  const handleSignInClick = () => {
    setIsSignUp(false)
  }

  return (
    <div className='mx-auto my-auto'>
      <div className='auth-form my-32'>
        <div className={`container ${isSignUp ? 'right-panel-active' : ''} mx-auto`} id='container'>
          <div className='form-container sign-up-container'>
            <Register handleSignInClick={handleSignInClick}/>
          </div>
          <div className='form-container sign-in-container'>
            <Login />
          </div>
          <div className='overlay-container'>
            <div className='overlay'>
              <div className='overlay-panel overlay-left'>
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className='ghost' onClick={handleSignInClick}>
                  Sign In
                </button>
              </div>
              <div className='overlay-panel overlay-right'>
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className='ghost' onClick={handleSignUpClick}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DefaultAuth
