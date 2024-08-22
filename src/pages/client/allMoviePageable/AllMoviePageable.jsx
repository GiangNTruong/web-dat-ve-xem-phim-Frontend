import { useEffect, useState } from "react";
import Footer from "../../../layouts/client/footer";
import Header from "../../../layouts/client/header";
import AllMovieCardItem from "./AllMovieCardItem";
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesPageable } from "../../../services/clientServices/clientMovieService";

function AllMoviePable()
{
    const dispatch = useDispatch();
    const [ pageNumber, setPageNumber ] = useState(1);
    const pageAbleData = useSelector(state => state.clientMovie);
    const [ itemsPerPage, setItemsPerPage ] = useState(10);
    const pageAbleMovieList = pageAbleData?.data?.data?.data;
    const handleChange = (event, value) =>
    {
        setPageNumber(value);
    };
    const handleChangeItemPerPage = (e) =>
    {
        setItemsPerPage(e.target.value);
    };
    useEffect(() =>
    {
        dispatch(fetchMoviesPageable({ pageNumber, itemsPerPage }));
    }, [ pageNumber, itemsPerPage ]);
    return (
        <>
            <div>
                { console.log(pageAbleMovieList) }
                { console.log(pageNumber) }
                <Header />
                <h1 className="text-4xl font-bold p-4">Danh sách tất cả các phim</h1>
                <div className="flex flex-row gap-6 justify-evenly items-center">
                    <Pagination count={ pageAbleMovieList?.totalPages } page={ pageNumber } onChange={ handleChange } />
                    <div className="flex flex-row gap-3">
                        <label className="font-bold text-2xl">Số lượng phim mỗi trang: </label>
                        <select name="itemsPerPage" className="border border-black" onChange={ handleChangeItemPerPage }>
                            <option value={ 10 }>10</option>
                            <option value={ 20 }>20</option>
                            <option value={ 30 }>30</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-4 p-4">
                    { pageAbleMovieList?.content.map(movie =>
                    {
                        return (<AllMovieCardItem movie={ movie } />);
                    }) }
                </div>
            </div>
            <Footer />
        </>
    );
}

export default AllMoviePable;