import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { User, Truck } from "lucide-react";
import { Toaster, toast } from "sonner";
import Loader from "../../components/Loader";
import SpinnerIcon from "../../components/SpinnerIcon";

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('selectedRole', selectedRole);
    setIsLoading(true);
    setTimeout(() => {
      toast.success("role selected successfully");
      navigate('/auth/register');
    }, 2000);
  };

  return (
    <div>
      <Toaster richColors />
    <div className="relative flex min-h-screen items-center justify-center px-6 py-10 bg-slate-50 dark:bg-slate-900 sm:px-16">
      <div className="relative w-full max-w-[750px] rounded-md bg-[linear-gradient(45deg,#f97316_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#f97316_100%)] p-2 dark:bg-[linear-gradient(45deg,#f97316_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#f97316_100%)]">
        <div className="relative flex flex-col justify-center rounded-md bg-white/80 backdrop-blur-lg dark:bg-slate-900/80 px-6 lg:min-h-[500px] py-10">
          <div className="mx-auto w-full max-w-[500px]">
            <h1 className="text-3xl font-extrabold uppercase text-primary mb-10 text-center">
              Join as a client or deliverer
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex space-x-4 justify-center">
                <label
                  className={`relative flex flex-col items-center p-4 border rounded-lg cursor-pointer ${
                    selectedRole === "client" ? "border-orange-500 border-2" : "border-slate-600"
                  } bg-white dark:bg-slate-800 text-orange-500 h-40`}>
                  <input
                    type="radio"
                    name="role"
                    value="client"
                    checked={selectedRole === "client"}
                    onChange={handleRoleChange}
                    className="hidden"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`w-4 h-4 inline-block rounded-full border-2 ${
                        selectedRole === "client" ? "border-orange-500 bg-orange-500 text-orange-500" : "border-slate-600"
                      }`}
                    />
                  </div>
                  <User size={48} className={`mb-2 ${selectedRole === "client" ? "text-orange-500" : "text-slate-600 dark:text-slate-300"}`} />
                  <span className={`font-semibold text-center ${selectedRole === "client" ? "text-orange-500" : "text-slate-600 dark:text-slate-300"}`}>I'm a client, hiring for a project</span>
                </label>
                <label
                  className={`relative flex flex-col items-center p-4 border rounded-lg cursor-pointer ${
                    selectedRole === "deliverer" ? "border-orange-500 bg-orange-500 text-orange-500 border-2" : "border-slate-600"
                  } bg-white dark:bg-slate-800 text-orange-500 h-40`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="deliverer"
                    checked={selectedRole === "deliverer"}
                    onChange={handleRoleChange}
                    className="hidden"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`w-4 h-4 inline-block rounded-full border-2 ${
                        selectedRole === "deliverer" ? "bg-orange-500 border-orange-500" : "border-slate-600"
                      }`}
                    />
                  </div>
                  <Truck size={48} className={`mb-2 ${selectedRole === "deliverer" ? "text-orange-500" : "text-slate-600 dark:text-slate-300"}`} />
                  <span className={`font-semibold text-center ${selectedRole === "deliverer" ? "text-orange-500" : "text-slate-600 dark:text-slate-300"}`}>I'm a deliverer, looking for work</span>
                </label>
              </div>
              <button
                type="submit"
                className={`w-full py-2 px-4 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75 ${
                  selectedRole ? "bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 shadow-[0_10px_20px_-10px_rgba(249,115,22,1)" : "bg-slate-700 cursor-not-allowed"
                }`}
                disabled={!selectedRole}
              >
                {isLoading ? (
                    <>
                      <SpinnerIcon className="w-4 h-4 me-3 text-white" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
              </button>
            </form>
            <p className="mt-4 text-slate-600 dark:text-slate-300 text-center">
              Already have an account?&nbsp;
              <a href="/auth/login" className="uppercase text-primary underline transition hover:text-orange-600 dark:hover:text-white">
                Log In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    {isLoading && <Loader />}
    </div>
  );
};

export default RoleSelection;