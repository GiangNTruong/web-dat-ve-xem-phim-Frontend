import { useDispatch, useSelector } from "react-redux";
import Footer from "../../../layouts/client/footer";
import Header from "../../../layouts/client/header";
import NewsCardItem from "./NewsCardItem";
import { fetchClientNews } from "../../../services/generalServices";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NewsList()
{
    const dispatch = useDispatch();
    const newsData = useSelector(state => state.news);
    const newsList = newsData?.data?.data?.data;
    const [ page, setPage ] = useState(1);
    const navigate = useNavigate();
    useEffect(() =>
    {
        dispatch(fetchClientNews(page));
    }, [ page ]);
    const handleChangePage = (toAdd) =>
    {
        if (page + toAdd < 0 || page + toAdd > newsList?.totalPages)
        {
            return;
        }
        setPage(prev => prev + toAdd);
    };
    const handleSeeNews = (newsId) =>
    {
        navigate(`../news/${ newsId }`, { replace: true });
    };
    return (
        <div className="bg-[#10141B] text-white">
            <Header />
            <div className="p-20">
                <div className=" gap-5 bg-[#10141B] text-white">
                    <h3 className="text-2xl font-bold mb-4 xl:mb-10 text-center">Tin tức</h3>
                    <div className="grid grid-cols-4 gap-6">
                        { newsList?.content?.map(n =>
                        {
                            return (
                                <button onClick={ () => handleSeeNews(n.id) }>
                                    <NewsCardItem key={ n.id } news={ n } />
                                </button>);
                        }
                        ) }
                    </div>
                </div>
                <div className="flex justify-end items-center mt-2">
                    <div className="flex justify-between gap-2">
                        { page == 1 ? <button className="text-white border border-white text-xl w-28 bg-slate-500">Quay lại</button> : <button onClick={ () => handleChangePage(-1) } className="text-white border border-white text-xl w-28 bg-transparent">Quay lại</button> }
                        { page == newsList?.totalPages ? <button className="text-white border border-white text-xl w-28 bg-slate-500">Tiếp theo</button> :
                            <button onClick={ () => handleChangePage(1) } className="text-white border border-white text-xl w-28 bg-transparent">Tiếp theo</button> }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default NewsList;