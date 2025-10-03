"use client"

const SignUpCard = () => {
  return (
    <>
      <div className="absolute top-5 left-10 font-bold text-lg text-gray-800">
        LOGO
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 pt-24">

        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 sm:p-10">

          <div className="flex border-b border-gray-200 mb-8">
            <div className="pb-3 px-4 font-semibold text-gray-800 border-b-2 border-blue-600 cursor-pointer">
              Landlord
            </div>
            <div className="pb-3 px-4 font-medium text-gray-500 hover:text-gray-700 cursor-pointer">
              Tenant
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter user name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-150"
            >
              Sign up &gt;
            </button>
          </form>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          You already have Account ? Then just
          <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium ml-1">
            Log in
          </a>
        </div>
      </div>
    </>
  );
};

export default SignUpCard;