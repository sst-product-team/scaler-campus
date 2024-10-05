import { axiosInstance } from "@refinedev/simple-rest";

export default function Login({ requiredRole }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // Add login logic here

    await fetch(process.env.REACT_APP_API_URL + "/api/v0/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        requiredRole: requiredRole || "TEACHER",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Success:", data);
        document.cookie = `username=${data.username}`;
        document.cookie = `email=${data.email}`;
        document.cookie = `scope=${data.scope.join(",")}`;
        window.location.href = "/lectures";
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        localStorage.setItem("scope", data.scope);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="w-screen h-screen flex">
      {/* Left side: Background with a dark overlay, hidden on mobile */}
      <div className="w-[30%] h-screen bg-[#1a1a1a] text-white relative hidden md:block">
        <div className="pl-10 pt-10">
          {/* Header */}
          <div className="text-3xl font-semibold text-slate-200">
            Scaler Campus
          </div>
          <div className="text-3xl font-semibold text-slate-200 mt-2">
            Teacher
          </div>

          {/* Features list */}
          <div className="flex flex-col gap-14 mt-[12%] font-semibold">
            <div className="text-lg font-medium text-slate-200">
              Manage Attendance
            </div>
            <div className="text-lg font-medium text-slate-200">
              Take Quizzes
            </div>
            <div className="text-lg font-medium text-slate-200">
              View Schedules
            </div>
            <div className="text-lg font-medium text-slate-200">
              Upload Notes
            </div>
            <div className="text-lg font-medium text-slate-200">
              Monitor Progress
            </div>
            <div className="text-lg font-medium text-slate-200">
              Communicate with Students
            </div>
            <div className="text-sm font-semibold text-slate-500">
              powered by SST Product Team
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full md:w-[70%] h-screen flex items-center justify-center bg-white">
        <div className="w-[80%] max-w-md space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Login</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label
                className="text-sm font-medium text-gray-600"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            <div className="flex flex-col">
              <label
                className="text-sm font-medium text-gray-600"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-800"
                >
                  Remember me
                </label>
              </div>

              <div>
                <a
                  href="#"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
