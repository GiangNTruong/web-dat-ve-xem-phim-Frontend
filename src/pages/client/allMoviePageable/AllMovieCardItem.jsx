import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import { Typography } from "antd";

function AllMovieCardItem({ movie })
{
    return (
        <Card sx={ { maxWidth: 345, minHeight: 300 } }>
            <CardActionArea>
                <CardMedia
                    component="img"
                    className="max-h-[400px]"
                    image={ movie.posterUrl }
                    alt={ movie.title }
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className="text-2xl font-bold">
                        { movie.title }
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="text-slate-500 font-semibold">
                        { movie.description }
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default AllMovieCardItem;