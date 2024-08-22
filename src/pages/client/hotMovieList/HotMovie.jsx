import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotMovies } from "../../../services/clientServices/clientMovieService";
import ListHotMovie from "../../../components/clientComponents/listMovie/ListHotMovie";

function HotMovie()
{
    const dispatch = useDispatch();
    const hotMovieData = useSelector(state => state.clientMovie);
    const hotMovieList = hotMovieData?.data?.data?.data;
    //Lấy ra danh sách các review trong tháng hiện tại (getMonth() trả về theo index bắt đầu từ 0 => +1 để ra tháng hiện tại)
    //slice reviewDate để lấy ra số tháng và ép kiểu về number
    useEffect(() =>
    {
        dispatch(fetchHotMovies());
    }, []);

    return (
        <>
            { console.log(hotMovieList) }
            <ListHotMovie pageName={ "Phim hot trong tháng" } movieList={ hotMovieList } />
        </>
    );
}

export default HotMovie;