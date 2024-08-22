import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../../../components/clientComponents/movieCard/MovieCard";
import { useEffect, useState } from "react";
import { fetchClientMovies, searchClientMovies } from "../../../services/clientServices/clientMovieService";
import { Button } from "antd";
import Search from "antd/es/transfer/search";
import { useDebounce } from "rooks";
import { fetchAllCountries, fetchAllGenres } from "../../../services/generalServices";

function SearchMovie()
{
    const dispatch = useDispatch();
    const movieData = useSelector(state => state.clientMovie);
    const genreData = useSelector(state => state.genre);
    const countryData = useSelector(state => state.country);
    const movieList = movieData?.data?.data?.data;
    const genreList = genreData?.data?.data?.filter(g => g.status);
    const countryList = countryData?.data?.data?.data.filter(country => country.status);
    const [ searchValue, setSearchValue ] = useState("");
    const setValueDebounced = useDebounce(setSearchValue, 500);
    const [ searchOption, setSearchOption ] = useState("title");
    useEffect(() =>
    {
        dispatch(searchClientMovies({ searchValue, searchOption }));
        dispatch(fetchAllGenres());
        dispatch(fetchAllCountries());
    }, []);
    const handleSearchValue = (e) =>
    {
        setSearchValue(e.target.value);
    };
    const handleChangeSearchOption = (e) =>
    {
        const option = e.target.value;
        setSearchOption(option);
        if (option === "title")
        {
            setSearchValue("");
        }
        else if (option === "genres")
        {
            setSearchValue(1);
        }
        else if (option === "country")
        {
            setSearchValue("My");
        }
        else
        {
            setSearchValue("P");
        }
    };
    // const handleSearch = (e) =>
    // {
    //     e.preventDefault();
    //     dispatch(searchClientMovies({ searchValue, searchOption }));
    // };
    useEffect(() =>
    {
        dispatch(searchClientMovies({ searchValue, searchOption }));
    }, [ searchValue, searchOption ]);
    return (
        <>
            <div className="flex flex-row gap-10 justify-center bg-slate-500 text-2xl">
                { console.log(countryList) }
                <div>
                    <label>Tìm kiếm theo: </label>
                    <select value={ searchOption } onChange={ handleChangeSearchOption } className="border border-black ml-4">
                        <option value={ "title" }>Tên</option>
                        <option value={ "genres" }>Thể loại</option>
                        <option value={ "userAdvice" }>Phân loại</option>
                        <option value={ "country" }>Quốc gia</option>
                    </select>
                </div>
                <div>
                    { searchOption == "title" ?
                        <Search onChange={ e => setValueDebounced(e.target.value) } placeholder="Tìm kiếm phim"></Search>
                        : searchOption == "genres" ?
                            <select name="genres" className="border border-black ml-4" onChange={ handleSearchValue }>
                                { genreList?.map(g =>
                                    <option key={ g.id } value={ g.id }>{ g.name }</option>
                                ) }
                            </select>
                            : searchOption == "userAdvice" ?
                                <select name="userAdvice" className="border border-black ml-4" onChange={ handleSearchValue }>
                                    <option value={ "P" }>P</option>
                                    <option value={ "T13" }>T13</option>
                                    <option value={ "T16" }>T16</option>
                                    <option value={ "T18" }>T18</option>
                                </select>
                                :
                                <select name="country" className="border border-black ml-4" onChange={ handleSearchValue }>
                                    { countryList?.map(country =>
                                    {
                                        return (<option value={ country.name }>{ country.name }</option>);
                                    }
                                    ) }
                                </select>

                    }
                </div>

            </div>
            <h1 className="text-2xl font-bold">Danh sách các phim</h1>
            <div className="grid grid-cols-4 grid-rows-4 bg-slate-800 gap-4">
                { movieList?.map(movie =>
                {
                    return (<MovieCard key={ movie.id } movieGenres={ movie.genres } movieName={ movie.title } movieCountry={ movie.country.name }
                        userAdvice={ movie.userAdvice } releaseDate={ movie.releaseDate } movieImage={ movie.posterUrl } />);
                }
                ) }
            </div>
        </>
    );
}

export default SearchMovie;