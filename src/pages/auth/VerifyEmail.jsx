import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import AuthService from "../../services/AuthService";
import InputField from "../../components/InputField";

const VerifyEmail = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [resendEmail, setResendEmail] = useState(false);
  const Auth = AuthService();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) return;
      const isVerified = await Auth.verifyEmail(token);
      setIsVerified(isVerified);
      setSearchParams({});
    };
    verifyEmail();
  }, []);

  const handleResendEmail = async () => {
    if (!resendEmail) return setResendEmail(true);
    await Auth.resendVerificationEmail(email);
  };

  return (
    <div>
      <div className="absolute inset-0">
        <img
          src="/assets/images/auth/bg-gradient.png"
          alt="background"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative flex min-h-screen items-center justify-center px-6 py-10 bg-slate-50 dark:bg-slate-900 sm:px-16">
        <div className="relative w-full max-w-[750px] rounded-md bg-[linear-gradient(45deg,#f97316_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#f97316_100%)] p-2 dark:bg-[linear-gradient(45deg,#f97316_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#f97316_100%)]">
          <div className="relative flex flex-col justify-center rounded-md bg-white/80 backdrop-blur-lg dark:bg-slate-900/80 px-6 lg:min-h-[500px] py-10">
          <div className="mx-auto w-full max-w-[400px] text-center">
              {resendEmail ? (
                <div>
                  <InputField
                  name="email"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                </div>
              ) : (
                <>
                  <div className="mb-10">
                    <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">
                      Email Verification
                    </h1>
                  </div>
                  <div className="mb-8 flex justify-center">
                    {isVerified ? (
                      <CheckCircle className="h-16 w-16 text-green-500" />
                    ) : (
                      <XCircle className="h-16 w-16 text-red-500" />
                    )}
                  </div>
                  <p className="text-xl font-semibold leading-normal text-slate-400 mb-8">
                    {isVerified
                      ? "Email verified successfully!"
                      : "Email verification failed!"}
                  </p>
                </>
              )}
              {isVerified && (
                <Link
                  to="/login"
                  className="relative flex items-center bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 justify-center rounded-md px-5 py-2 font-semibold outline-none transition duration-300 hover:shadow-none text-white !mt-6 w-full border-0 shadow-[0_10px_20px_-10px_rgba(249,115,22,1)]"
                >
                  Go to Login
                </Link>
              )}
              {!isVerified && (
                <button
                  onClick={handleResendEmail}
                  className="relative flex items-center bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 justify-center rounded-md px-5 py-2 font-semibold outline-none transition duration-300 hover:shadow-none text-white !mt-6 w-full border-0 shadow-[0_10px_20px_-10px_rgba(249,115,22,1)]"
                >
                  {resendEmail ? "Send" : "Resend Email"}
                </button>
              )}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
