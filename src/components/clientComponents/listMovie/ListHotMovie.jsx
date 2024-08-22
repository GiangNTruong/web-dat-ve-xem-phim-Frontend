import { formatDate } from "../../../util";
import MovieCard from "../movieCard/MovieCard";

function ListHotMovie({ pageName, movieList })
{
    return (
        <>
            <div className="flex  text-2xl justify-between">
                { console.log(movieList) }
                <div className="flex items-center gap-2">
                    { <h3 className="font-bold text-2xl">{ pageName }</h3> }
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 bg-black">
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

export default ListHotMovie;