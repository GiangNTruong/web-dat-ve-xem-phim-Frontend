import { useParams } from "react-router-dom";
import { formatDate } from "../../../util/formatDate";

function NewsCardItem({ news })
{
    return (
        <div className="border border-gray-700 rounded-md overflow-hidden cursor-pointer">
            <div className="relative h-[210px] cursor-pointer overflow-hidden">
                <img alt={ news.title } loading="lazy" data-nimg="fill"
                    className="object-cover hover:scale-110 transition object-center"
                    sizes="(min-width: 1300px) 303px, calc(100vw - 66px)"
                    src={ news.imageUrl } />
            </div>
            <div className="p-4">
                <p className="text-sm text-gray-400 mb-2">
                    { formatDate(news.createdAt) }
                </p>
                <h3 className="font-bold">
                    { news.title }</h3>
            </div>
        </div>
    );
}

export default NewsCardItem;