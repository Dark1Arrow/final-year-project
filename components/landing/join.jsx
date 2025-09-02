import Image from "next/image";

export default function Join() {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center  justify-between px-6 md:px-20 py-16 m-10 mx-32">

      {/* Left Text + Button */}
      <div className="text-center md:text-left md:w-1/2 space-y-6 flex flex-col gap-5">
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-900">
          Your plan is ready. <br />
          All that’s missing is you.
        </h2>
        <button className="bg-[#259FDE] hover:bg-[#25a0ded3] text-white text-lg px-10 py-3 rounded-full flex items-center justify-center gap-2 w-fit mx-auto md:mx-0 font-semibold ">
          Join Now
          <span className="text-xl">▼</span>
        </button>
      </div>

      {/* Right Mobile Mockup */}
      <div className="relative w-full md:w-1/2 max-w-md mb-10 md:mb-0">
        <img
          src="https://www.fittr.com/static-content/tailor_made_plans_326e72bd7f.webp"
          alt="Mobile Mockup"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
