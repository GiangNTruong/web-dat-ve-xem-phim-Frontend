import ScheduleList from "../../components/clientComponents/movies-schedules/ScheduleList";
import { formatDate } from "../../util";

export default function Movies() {
  return (
    <>
      <div className="bg-slate-500">
        {/* Phim Dang Chieu */}
        <div className="flex justify-center items-center my-2">
          <div className="flex items-center gap-2 ">
            <div className="w-5 h-5 rounded-full bg-red-500"></div>
            <h2 className="text-white text-2xl ">Phim đang chiếu</h2>
          </div>
        </div>
        {/* Movies Time */}
        <div className="flex justify-center items-center my-2 ">
          <button className="mx-1 px-3 py-2 border border-blue-400 focus:bg-red-400 rounded-md text-white hover:bg-slate-500 transition-all focus:outline-none">
            {formatDate("2023-12-22")}
          </button>
          <button className="mx-1 px-3 py-2 border border-blue-400 focus:bg-red-400 rounded-md text-white hover:bg-slate-500 transition-all focus:outline-none">
            {formatDate("2023-12-22")}
          </button>
          <button className="mx-1 px-3 py-2 border border-blue-400 focus:bg-red-400 rounded-md text-white hover:bg-slate-500 transition-all focus:outline-none">
            {formatDate("2023-12-22")}
          </button>
        </div>
        {/* Luu Y */}
        <div className="my-2 flex justify-center">
          <p className="text-orange-500">
            <span className="font-semibold">Lưu ý</span>: Khán giả dưới 13 tuổi
            chỉ chọn suất chiếu kết thúc trước 22h và Khán giả dưới 16 tuổi chỉ
            chọn suất chiếu kết thúc trước 23h.
          </p>
        </div>
        {/* Card */}
        <ScheduleList />
      </div>
    </>
  );
}
