import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { showMovieDetails } from "../../../services/adminServices/movieServices";
import { useCookies } from "react-cookie";

function MovieDetailPage()
{
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.movie);
    // const [ cookies, setCookies ] = useCookies("id", id);
    // setCookies("id", id);
    useEffect(() =>
    {
        // console.log("Before", cookies.id);
        dispatch(showMovieDetails(id));
    }, []);
    const movieData = data?.data?.data;
    return (
        <div>
            {/* { console.log(cookies.id) } */ }
            { console.log(data) }
            { console.log("Movie data", movieData) }
            Thông tin chi tiết phim
            <div>
                <p>Tên phim: <span>{ movieData?.title } </span></p>
            </div>
            <div>
                <p>Thời lượng phim: <span>{ movieData?.duration }</span></p>
            </div>
            <div>
                <p>Ảnh poster phim: <img src={ movieData?.posterUrl } alt="image" width={ 200 } height={ 200 } /></p>
            </div>
            <div>
                <p>Mô tả phim: <span>{ movieData?.description }</span></p>
            </div>
            <div>
                <p>Tên đạo diễn: <span>{ movieData?.director }</span></p>
            </div>
            <div>
                <p>Tên các diễn viên chính: <span>{ movieData?.actors }</span></p>
            </div>
            <div>
                <p>{ `Phân loại phim (Giới hạn độ tuổi)` }<span>{ movieData?.userAdvice }</span></p>
            </div>
            <div>
                <p>Ngày phát hành: <span>{ movieData?.releaseDate }</span></p>
            </div>
            <div>
                <p>Trailer của phim: <span>{ movieData?.trailerLink }</span></p>
            </div>
            <div>
                <p>Quốc gia sản xuất: <span>{ movieData?.country?.name }</span></p>
            </div>
            <div>
                <p>Thể loại phim: <span>{ movieData?.genres?.map(g => g?.name + " | ") }</span></p>
            </div>
        </div>
    );
}

export default MovieDetailPage;