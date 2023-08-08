import React,{useState,useRef,useEffect} from 'react'
import axios from 'axios';

const ResetPassword = () => {
    const [isSendVerificationEmail, setisSendVerificationEmail] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const emailRef = useRef();
    const email = emailRef.current?.value;
    const resetPasswordEmailSendHandler = async () => {
        const email = emailRef.current.value;
        try {
            const response = await axios.post(
                "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAZcDBVCjFKYDmw-K1lRVmfTdwiX4kfzBA",{
                    requestType:"PASSWORD_RESET",
                    email,
                }
            );
                console.log(response)
            if (response.status === 200) {
                setIsSent(true);

            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (isSendVerificationEmail) {
            resetPasswordEmailSendHandler();
        }
    },[isSendVerificationEmail]);
  return (
    <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ width: "100%", height: "100vh", backgroundColor: "#838383" }}
        >
            <h3 className="text-light">Reset Password</h3>
            <div
                className=" d-flex justify-content-center flex-row shadow bg-light "
                style={{ width: "70%", height: "40vh", border: "0.2rem solid yellow" }}
            >
                <form className="d-flex flex-column align-items-center justify-content-center " onSubmit={(e) => {
                    e.preventDefault()
                    setisSendVerificationEmail(!isSendVerificationEmail);
                }}>
                    <div className="d-flex flex-column  " >
                        <div className="d-flex flex-row justify content-between align-items-center">
                            {/* <img
                                style={{marginRight:'0.5rem', height: "3rem" }}

                                src={emailPng}
                            /> */}
                            <input style={{ height: '2rem' ,width:'40vw'}} ref={emailRef} type="email" placeholder="Enter your Email" required />
                        </div>

                        <button
                            type="submit"
                            className="btn mt-3 border-2 bg-warning fw-bold rounded"
                        >
                            Send verification mail
                        </button>
                    </div>


                    
                </form>
                        
            </div>
            {isSent && (
                        <div
                            class="alert alert-warning border-dark  alert-dismissible fade show mt-5"
                            role="alert"
                        >
                            Thank You We've successfuly sent Verification E-mail {email}, click on link and set your new password
                        </div>
                    )}
        </div>
  )
}

export default ResetPassword