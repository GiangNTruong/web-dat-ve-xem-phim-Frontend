import { formatDate } from "../../../util/formatDate";
import MovieCard from "../movieCard/MovieCard";

function ListMovie({ pageName, movieList })
{
    return (
        <>
            <div className="flex  text-2xl justify-between">
                { console.log(movieList) }
                <div className="flex items-center gap-2">
                    <div className="rounded-full bg-red-500 w-4 h-4"></div>
                    { <h3 className="font-bold md:text-2xl">{ pageName }</h3> }
                </div>
                <a className="underline">Xem tất cả</a>
            </div>
            <div className="grid grid-cols-4 gap-4">
                { movieList?.map(movie => 
                {
                    return (<MovieCard key={ movie.id } movieName={ movie.title } userAdvice={ movie.userAdvice } releaseDate={ formatDate(movie.releaseDate) }
                        movieGenres={ movie.genres } movieImage={ movie.posterUrl } />);
                }
                ) }

            </div>
        </>
    );
}

export default ListMovie;