//Gọi API lấy ra list các movie, truyền các props vào component để render
function MovieCard({ movieGenres, movieName, userAdvice, releaseDate, movieImage, movieCountry })
{
    return (
        <div className="cursor-pointer shadow-lg text-white bg-[#10141B] border rounded-xl">
            <div className="relative w-full h-[290px] overflow-hidden shadow-lg">
                <img
                    alt={ `${ movieName }-${ userAdvice }` }
                    loading="lazy"
                    decoding="async"
                    data-nimg="fill"
                    className="object-fill object-center rounded-none hover:scale-110 transition duration-500"
                    sizes="230px"
                    src={ movieImage }
                    style={ {
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        inset: 0,
                        color: "transparent"
                    } }
                />
            </div>
            <div className="p-2">
                <div className="flex flex-wrap flex-col gap-x-5 text-sm mt-3">
                    <p>{ movieGenres.map((genre) =>
                    {
                        //movieGenre sẽ là một list các genre => Dùng map để render
                        return (<span>{ `${ genre.name } | ` }</span>);
                    }) }</p>
                    <p>{ releaseDate }</p>
                    <p>Quốc gia: { movieCountry }</p>
                </div>
                <p className="mt-2 text-sm xl:text-base font-bold">{ movieName } - { userAdvice }</p>
            </div>
        </div>

    );
}

export default MovieCard;