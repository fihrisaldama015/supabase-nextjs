import { supabase } from "../utils/client";
import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [submit, setSubmit] = useState(false);

  const handleLogin = async (email) => {
    if (!email) return;
    try {
      setSubmit(true);
      const { user, error } = await supabase.auth.signIn({
        email: email,
      });
      if (error) throw error;
      console.log("submitted");
    } catch (error) {
      console.log(error.error_description || error.message);
      setSubmit(false);
      alert(error.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { user, session, error } = await supabase.auth.signIn({
        provider: "google",
      });
      if (error) throw error;
      console.log("login with google");
    } catch (error) {
      console.log(error.error_description || error.message);
    }
  };

  if (submit) {
    return (
      <>
        <h1>Please Check Your Email to Login with Link !</h1>
        <p>
          Not seeing our email confirmation, <a>Send Again.</a>
        </p>
      </>
    );
  }
  return (
    <>
      <label>Email</label>
      <input
        value={email}
        type="email"
        placeholder="example@gmail.com"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          handleLogin(email);
        }}
      >
        Sign In
      </button>
      <p>or</p>
      <p>Login with</p>
      <button
        onClick={() => {
          loginWithGoogle();
        }}
      >
        Google
      </button>
    </>
  );
};

export default Auth;
