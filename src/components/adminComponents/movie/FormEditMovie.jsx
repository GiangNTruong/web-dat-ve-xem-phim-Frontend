import { Button, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCountries, fetchAllGenres, fetchAllUserAdvices } from "../../../services/generalServices";
import { editMovie, showMovieDetails } from "../../../services/adminServices/movieServices";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
function FormEditMovie()
{
    const { id } = useParams();
    // const [ cookies, setCookies ] = useCookies("id", id);
    const [ errors, setErrors ] = useState([]);
    // setCookies("id", id);
    const handleChange = (e) =>
    {
        const { name, value } = e.target;
        setMovie(
            {
                ...movie,
                [ name ]: value,
            }
        );
        validateData(e);
    };
    const [ showAvatar, setShowAvatar ] = useState(null);
    const handleChangeFile = (e) =>
    {
        setMovie({
            ...movie,
            posterUrl: e.target.files[ 0 ],
        });
        encodeImageFileAsURL(e.target.files[ 0 ]);
    };
    function encodeImageFileAsURL(file)
    {
        let reader = new FileReader();
        reader.onloadend = function ()
        {
            setShowAvatar(reader.result);
        };
        reader.readAsDataURL(file);
    }
    const validateData = (e) =>
    {
        const { name, value } = e.target;
        let hasError = false;
        let newError = {
            errorName: "",
            message: "",
        };
        if (!value)
        {
            switch (name)
            {
                case "title":
                    newError = {
                        errorName: name,
                        message: "Tên không được để trống",
                    };
                    hasError = true;
                    break;
                case "duration":
                    newError = {
                        errorName: name,
                        message: "Thời lượng phim không được để trống",
                    };
                    hasError = true;
                    break;
                case "posterUrl":
                    newError = {
                        errorName: name,
                        message: "Hãy chọn ảnh poster cho phim",
                    };
                    hasError = true;
                    break;
                case "description":
                    newError = {
                        errorName: name,
                        message: "Mô tả phim không được để trống",
                    };
                    hasError = true;
                    break;
                case "director":
                    newError = {
                        errorName: name,
                        message: "Tên đạo diễn không được để trống",
                    };
                    hasError = true;
                    break;
                case "userAdvice":
                    newError = {
                        errorName: name,
                        message: "Vui lòng nhập phân loại phim (giới hạn độ tuổi)",
                    };
                    hasError = true;
                    break;
                case "releaseDate":
                    newError = {
                        errorName: name,
                        message: "Hãy chọn ngày phát hành phim",
                    };
                    hasError = true;
                    break;
                case "trailerLink":
                    newError = {
                        errorName: name,
                        message: "Hãy nhập đường dẫn trailer của phim",
                    };
                    hasError = true;
                    break;
                case "genres":
                    newError = {
                        errorName: name,
                        message: "Vui lòng chọn thể loại phim",
                    };
                    hasError = true;
                    break;
                default:
                    break;
            }
            setErrors(
                [
                    ...errors,
                    newError,
                ]
            );
        } else
        {
            hasError = false;
            setErrors(
                [
                    ...errors.filter(error => error.errorName !== name)
                ]
            );
        };
        if (hasError)
        {
            return false;
        }
        return true;
    };
    const [ userAdviceState, setUserAdviceState ] = useState(null);
    const [ countryState, setCountryState ] = useState(null);
    const [ genreState, setGenreState ] = useState([]);
    const handleUserAdvice = (e) =>
    {
        setUserAdviceState(e);
        setMovie(
            {
                ...movie,
                userAdvice: e,
            }
        );
    };
    const handleCountryChange = (e) =>
    {
        setCountryState(e);
        setMovie(
            {
                ...movie,
                countryName: e,
            }
        );
    };
    const handleGenreChange = (e) =>
    {
        setGenreState(e);
        console.log("Genres", e);
        setMovie(
            {
                ...movie,
                genres: e,
            }
        );
    };
    const handleSubmit = (e) =>
    {
        e.preventDefault();
        // console.log("USeradvice", userAdviceState);
        // console.log("countryName", countryState);
        // console.log("genres", genreState);
        // setMovie(
        //     {
        //         ...movie,
        //         userAdvice: userAdviceState,
        //         countryName: countryState,
        //         genres: genreState,
        //     }
        // );
        // console.log("Movie USeradvice", movie.userAdvice);
        // console.log("Movie countryName", movie.countryName);
        // console.log("movie genres", movie.genres);
        // console.log(movie);
        //Component chưa được re-render nên giá trị của movie không được cập nhật ngay => Thiếu trường gây lỗi khi gửi form lần đầu
        const formData = new FormData();
        for (let i = 0; i < Object.keys(movie).length; i++)
        {
            formData.append(Object.keys(movie)[ i ], Object.values(movie)[ i ]);
            // console.log(typeof Object.keys(movie)[ i ] + " | " + Object.keys(movie)[ i ] + " | " + Object.values(movie)[ i ]);
        }
        if (errors.length > 0)
        {
            return;
        }
        dispatch(editMovie(formData));
    };
    const movieData = useSelector(state => state.movie);
    const movieToBeEdited = movieData?.data?.data?.data;
    const countryData = useSelector(state => state.country);
    const countryList = countryData?.data?.data?.data;
    const genreData = useSelector(state => state.genre);
    const genreList = genreData?.data?.data?.data;
    const userAdviceData = useSelector(state => state.userAdvice);
    const userAdviceList = userAdviceData?.data?.data?.data;
    const dispatch = useDispatch();

    const countryOptions = [];
    countryList?.forEach(c =>
    {
        if (c.status)
        {
            countryOptions.push({
                value: c.name
            });
        }
    }
    );
    const [ movie, setMovie ] = useState(null);
    useEffect(() =>
    {
        dispatch(fetchAllCountries());
        dispatch(fetchAllGenres());
        dispatch(fetchAllUserAdvices());
        dispatch(showMovieDetails(id));
    }, []);

    useEffect(() =>
    {
        setMovie({
            ...movieToBeEdited,
            countryName: movieToBeEdited?.country?.name,
            genres: movieToBeEdited?.genres?.map(g => g.name),
        });
    }, [ movieToBeEdited ]);
    useEffect(() =>
    {
        delete movie?.country;
    }, [ movie ]);
    const genreOptions = [];
    genreList?.forEach(g =>
    {
        if (g.status)
        {
            genreOptions.push({
                value: g.name
            });
        }
    }
    );
    const userAdviceOptions = [];
    userAdviceList?.forEach(a =>
    {
        userAdviceOptions.push({ value: a });
    }
    );
    return (
        <div div >
            { console.log("movie", movie) }
            <form className="flex flex-col gap-4 w-full" onSubmit={ handleSubmit }>
                <div>
                    <label htmlFor="">Tên phim</label>
                    <Input onChange={ handleChange } value={ movie?.title } name="title" />
                    { errors.length !== 0 && errors.some(e => e.errorName === "title") ? <p className="text-red-500">{ errors.find(e => e.errorName === "title").message }</p> : "" }
                </div>
                <div>
                    <label htmlFor="">Thời lượng phim</label>
                    <input className="border border-black ml-2" type="number" onChange={ handleChange } name="duration" value={ movie?.duration } />
                    { errors.length !== 0 && errors.some(e => e.errorName === "duration") ? <p className="text-red-500 ">{ errors.find(e => e.errorName === "duration").message }</p> : "" }
                </div>
                <div>
                    <label htmlFor="">Ảnh poster phim</label>
                    <input type="file" name="posterUrl" onChange={ handleChangeFile } formEncType="multipart/form-data" />
                    <img src={ movie?.posterUrl } alt="image" width={ 100 } height={ 100 } />
                    { errors.length !== 0 && errors.some(e => e.errorName === "posterUrl") ? <p className="text-red-500">{ errors.find(e => e.errorName === "posterUrl").message }</p> : "" }
                </div>
                <div>
                    <label htmlFor="">Mô tả phim</label>
                    <Input onChange={ handleChange } name="description" value={ movie?.description } />
                    { errors.length !== 0 && errors.some(e => e.errorName === "description") ? <p className="text-red-500">{ errors.find(e => e.errorName === "description").message }</p> : "" }
                </div>
                <div>
                    <label htmlFor="">Tên đạo diễn</label>
                    <Input onChange={ handleChange } name="director" value={ movie?.director } />
                    { errors.length !== 0 && errors.some(e => e.errorName === "director") ? <p className="text-red-500">{ errors.find(e => e.errorName === "director").message }</p> : "" }
                </div>
                <div>
                    <label htmlFor="">Tên các diễn viên chính</label>
                    <Input onChange={ handleChange } name="actors" value={ movie?.actors } />
                </div>
                <div>
                    <label htmlFor="">{ `Phân loại phim (Giới hạn độ tuổi)` }</label>
                    <Select name="userAdvice" options={ userAdviceOptions } value={ movie?.userAdvice } onChange={ handleUserAdvice } className="w-full" />
                    { errors.length !== 0 && errors.some(e => e.errorName === "userAdvice") ? <p className="text-red-500">{ errors.find(e => e.errorName === "userAdvice").message }</p> : "" }
                </div>
                <div>
                    <label htmlFor="">Ngày phát hành</label>
                    <input className="border border-black ml-4" value={ movie?.releaseDate } type="date" onChange={ (e) => handleChange(e) } name="releaseDate" format={ "DD/MM/YYYY" } />
                    { errors.length !== 0 && errors.some(e => e.errorName === "releaseDate") ? <p className="text-red-500">{ errors.find(e => e.errorName === "releaseDate").message }</p> : "" }
                </div>
                <div>
                    <label htmlFor="">Trailer của phim</label>
                    <Input onChange={ handleChange } name="trailerLink" value={ movie?.trailerLink } />
                    { errors.length !== 0 && errors.some(e => e.errorName === "trailerLink") ? <p className="text-red-500">{ errors.find(e => e.errorName === "trailerLink").message }</p> : "" }
                </div>
                <div>
                    <label htmlFor="">Quốc gia sản xuất</label>
                    <Select name="countryName" options={ countryOptions } value={ movie?.countryName } className="w-full" onChange={ handleCountryChange } />
                </div>
                <div>
                    <label htmlFor="">Thể loại phim</label>
                    <Select name="genres" mode="multiple" options={ genreOptions } value={ movie?.genres } className="w-full" onChange={ handleGenreChange } />
                    { errors.length !== 0 && errors.some(e => e.errorName === "genres") ? <p className="text-red-500">{ errors.find(e => e.errorName === "genres").message }</p> : "" }
                </div>
                <Button htmlType="submit" type="primary">Cập nhật</Button>
            </form>
        </div >
    );
}

export default FormEditMovie;