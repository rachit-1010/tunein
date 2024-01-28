import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "./AuthContext";

export default function LoginPage() {
const { login } = useAuth();

  const handleLoginSuccess = (response) => {
    console.log("Google login success:", response.credential);
	login(response.credential);
  };

  const handleLoginFailure = (error) => {
    console.error("Google login failure:", error);
  };

  const guestLogin = () => {
	console.log("Guest login");
	login("guest");
  }

  return (
	<>
		<div className="w-screen h-screen flex justify-center items-center LoginBg">
			<div className="w-4/5 lg:w-1/3 p-12 bg-black text-color-primary flex flex-col items-center rounded-xl">
				<div className="w-4/5 text-center border-b-2 pb-4 mb-12">
					<p className="text-4xl font-black ">Log in</p>

				</div>
				<div className="text-center">

					<GoogleLogin
						clientId="933597042927-tkkvv205tnaeevjmmjc90da065fnnt4v.apps.googleusercontent.com"
						onSuccess={handleLoginSuccess}
						onFailure={handleLoginFailure}
						buttonText="Login with Google"
					/>
					<button className="px-4 h-10 bg-slate-50 text-black mt-6 rounded-md font-bold" onClick={guestLogin}>Continue as Guest</button>
				
				</div>
			</div>
		</div>
	</>
  );
}
