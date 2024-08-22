
export default function ScheduleItem() {
  return (
    <>
      <div className=" rounded-sm w-full relative border border-grey-300">
        <div className="flex items-start text-white">
          <img
            src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className=" rounded-md w-[150px] h-[260px] hover:transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover: duration-300 "
          ></img>
          <div className="m-4">
            <h1 className="font-semibold uppercase	">tín hiệu vũ trụ</h1>
            <p>Xuất Xứ: Mỹ</p>
            <p className="uppercase text-red-500">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit
              odit vero earum nostrum qui corporis{" "}
            </p>
            <div className="">
              <button className="mx-1 mt-2 px-3 py-2 border border-blue-400 focus:bg-red-400 rounded-md text-white hover:bg-slate-500 transition-all focus:outline-none">
                16:00
              </button>
              <button className="mx-1 mt-2 px-3 py-2 border border-white focus:bg-red-400 rounded-md text-white hover:bg-slate-500 transition-all focus:outline-none">
                16:00
              </button>
              <button className="mx-1 mt-2 px-3 py-2 border border-white focus:bg-red-400 rounded-md text-white hover:bg-slate-500 transition-all focus:outline-none">
                16:00
              </button>
              <button className="mx-1 mt-2 px-3 py-2 border border-white focus:bg-red-400 rounded-md text-white hover:bg-slate-500 transition-all focus:outline-none">
                16:00
              </button>
              <button className="mx-1 mt-2 px-3 py-2 border border-white focus:bg-red-400 rounded-md text-white hover:bg-slate-500 transition-all focus:outline-none">
                16:00
              </button>
            </div>
          </div>
          <div className="border border-white rounded-lg p-2 m-2">2D</div>
        </div>
      </div>
    </>
  );
}
