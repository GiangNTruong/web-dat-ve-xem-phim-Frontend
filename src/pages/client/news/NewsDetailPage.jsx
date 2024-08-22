import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchNewsById } from "../../../services/generalServices";
import Header from "../../../layouts/client/header";
import Footer from "../../../layouts/client/footer";

function NewsDetailPage()
{
    const { newsId } = useParams();
    const dispatch = useDispatch();
    const data = useSelector(state => state.news);
    const newsData = data?.data?.data?.data;
    // const [ cookies, setCookies ] = useCookies("id", id);
    // setCookies("id", id);
    useEffect(() =>
    {
        // console.log("Before", cookies.id);
        dispatch(fetchNewsById(newsId));
    }, []);
    return (
        <>
            <Header />
            <div className="p-5 bg-[#10141B]">
                <h2 className="text-2xl font-bold text-white">
                    { newsData?.title }
                </h2>
                <span style={ { color: "rgb(187, 187, 187)" } }>
                    { newsData?.content }
                </span>
                <img src={ newsData?.imageUrl } alt="image" />
            </div>
            <Footer />
        </>
    );
}

export default NewsDetailPage;