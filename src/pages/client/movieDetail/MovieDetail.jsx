import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showMovieDetails } from "../../../services/adminServices/movieServices";
import { formatDate } from "../../../util";
import Header from "../../../layouts/client/header";
import { showTimeByMoviesId } from "../../../services/adminServices/showtimeService";
import { showSeatByRoomId } from "../../../services/clientServices/seatClientService";
import { fetchAllGenres } from "../../../services/generalServices";

export default function MovieDetail() {
  const { data, loading, error } = useSelector((state) => state.movie);
  const showTimeData = useSelector((state) => state.showtime.data.result);
  const showClientSeatData = useSelector(
    (state) => state.showSeatClient.data.result
  );
  
  const showAllMovies = useSelector(
    (state) => state.genre.data.data
  );

  const filmDetail = data?.data?.data;
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSeatCheck, setSeatCheck] = useState(0);
  const [isModalShowTime, setIsModalShowTime] = useState(false);
  const [isModalTrailerOpen, setIsModalTrailerOpen] = useState(false);

  console.log("filmDetail", filmDetail);

  const openModalTrailer = () => {
    setIsModalTrailerOpen(true);
  };

  const handleCloseModalTrailer = () => {
    setIsModalTrailerOpen(false);
  };

  const openGenenalInfo = () => {
    setIsModalOpen(true);
  };

  const handleCloseGeneralInfo = () => {
    setIsModalOpen(false);
  };

  const handleSelectShowTime = (roomID) => {
    
    setIsModalShowTime(!isModalShowTime);
    dispatch(showSeatByRoomId(roomID));
  };

  const handleCheckSeat = (seatCheck) =>{
      if(!seatCheck.isAvailable ){
        return
      }

      setSeatCheck(seatCheck.id);

      
  }

  useEffect(() => {
    dispatch(showMovieDetails(1));
    dispatch(showTimeByMoviesId(1));
    
  }, []);

  //Grey: khách khác đã đặt (Unavailable)
  //Green: khách chọn.
  // Blue: Khách có thể chọn (Availble)
  return (
    <>
      <Header />
      <Modal
        title="General Info"
        open={isModalOpen}
        onOk={handleCloseGeneralInfo}
        onCancel={handleCloseGeneralInfo}
      >
        {filmDetail.description}
      </Modal>
      <Modal
        title="Trailer Youtube"
        open={isModalTrailerOpen}
        onOk={handleCloseModalTrailer}
        onCancel={handleCloseModalTrailer}
      >
        <div>
          <iframe
            width="460"
            height="315"
            src="https://www.youtube.com/embed/wyiZWYMilgk?si=IN4WQZtplR804Rka"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </Modal>

      <div className="relative block top-40 xl:hidden px-4 md:px-6 pb-10 -mt-[120px] z-30">
        <div className="flex items-center gap-4">
          <div className="h-[200px] w-full max-w-[150px] md:w-[200px] md:max-w-[200px] md:h-[250px] relative">
            <img
              alt="XIN CHÀO JADOO: ĐẠI DƯƠNG DIỆU KỲ-P ( Lồng tiếng )"
              loading="lazy"
              decoding="async"
              data-nimg="fill"
              className="object-cover rounded-xl shadow-lg"
              sizes="(min-width: 780px) 200px, (min-width: 360px) 150px, calc(72.5vw - 98px)"
              src={filmDetail.posterUrl}
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                inset: 0,
                color: "transparent",
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mt-2">
              <h3 className="font-bold md:text-xl uppercase">
                {filmDetail.tittle} ( Lồng tiếng )
              </h3>
              <div className="rounded-md p-1 border border-white font-bold text-sm md:text-base">
                2D
              </div>
            </div>
            <div className="flex items-center mt-2 gap-x-2 text-sm md:text-base flex-wrap">
              <p />
              <p>- {filmDetail.country.name}</p>
              <p>- {filmDetail.duration} phút</p>
            </div>
          </div>
        </div>
        <div className="text-sm flex flex-col mt-4">
          <div className="flex items-center mt-2 gap-5 text-sm md:text-base">
            <p>Đạo diễn: {filmDetail.director}</p>
          </div>
          <p>Diễn viên: {filmDetail.actors} </p>
          <p>Khởi chiếu: {formatDate(filmDetail.releaseDate)}</p>
          <p className="mt-4 line-clamp-4">{filmDetail.description}</p>
          <div className="text-red-500 mt-5">
            Khuyến cáo: P - PHIM ĐƯỢC PHÉP PHỔ BIẾN ĐẾN NGƯỜI XEM Ở MỌI ĐỘ TUỔI.
          </div>
          <div className="mt-4 flex items-center justify-center gap-4 flex-1">
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:r2b:"
              data-state="closed"
              className="text-sm underline"
              onClick={openGenenalInfo}
            >
              Chi tiết nội dung
            </button>
            <button
              className="border border-yellow-500 rounded-full py-2 px-10 text-yellow-500 hover:scale-105"
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:r2e:"
              data-state="closed"
              onClick={openModalTrailer}
            >
              Xem trailer
            </button>
          </div>
          <div className="bg-cyan-700 m-2 rounded-md">
            <ul className="flex items-center justify-center py-4 p-2 gap-3">
              {showTimeData.map((time, index) => (
                <li
                  key={index}
                  className="rounded-xl bg-red-500 cursor-pointer text-white p-3 h-30 w-30 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
                  onClick={() => {
                    handleSelectShowTime(time.room.id);
                  }}
                >
                  <p className="font-semibold text-2xl ">{time.time}</p>
                  <p className="text-lg">{formatDate(time.date)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {isModalShowTime && (
          <div className="flex justify-center items-center h-screen bg-gray-300">
            <div className=" flex justify-center items-center rounded-md w-[500px] h-[500px] bg-black">
              <div className="grid grid-cols-3 gap-3 p-4 ">
                {showClientSeatData?.map((seat, index)=> {
                  return (
                    <>
                      <div
                        onClick={() => {
                          handleCheckSeat(seat);
                        }}
                        className={`w-[30px] h-[30px] text-center p-1 ${
                          seat.isAvailable
                            ? "bg-blue-500 cursor-pointer"
                            : "bg-gray-400"
                        } 
                        ${
                          isSeatCheck === seat.id
                            ? "bg-green-600 cursor-pointer"
                            : "bg-blue-500 cursor-pointer"
                        } 
                         rounded-md`}
                      >
                        {seat.seatRow}  
                        {seat.number}
                      </div>
                    </>
                  );
                })}
                
              </div>
            </div>
          </div>
        )}

     


      </div>
    </>
  );
}
