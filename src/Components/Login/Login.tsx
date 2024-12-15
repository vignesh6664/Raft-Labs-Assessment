import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase-config";
interface LoginProps {
    onLoginSuccess: (email:string) => void;
  }
const Login = ({ onLoginSuccess }: LoginProps) => {
    const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess(email)
      console.log('email',email);
      console.log('password',password);
    } catch (err:any) {
      setError(err.message);
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onLoginSuccess(email)
    } catch (err:any) {
      setError(err.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">{isRegistering ? "Register" : "Login"}</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full p-2 bg-blue-500 text-white rounded"
          onClick={isRegistering ? handleRegister : handleLogin}
        >
          {isRegistering ? "Register" : "Login"}
        </button>
        <button
  className="text-sm text-center mt-4 cursor-pointer text-blue-500 bg-transparent border-none p-0"
  onClick={() => setIsRegistering(!isRegistering)}
>
  {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
</button>
      </div>
    </div>
  )
}

export default Login