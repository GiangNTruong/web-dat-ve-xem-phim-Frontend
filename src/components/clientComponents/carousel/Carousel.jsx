import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../carousel/carousel.scss';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllBannerClient } from "../../../services/clientServices/clientBannerServices";

function Carousel()
{
  const dispatch = useDispatch();
  const clientBannerData = useSelector(state => state.clientBanner);
  useEffect(() =>
  {
    dispatch(fetchAllBannerClient());
  }, []);
  const bannerList = clientBannerData?.data?.data?.data;
  return (
    <Swiper
      slidesPerView={ 1 }
      spaceBetween={ 30 }
      loop={ true }
      pagination={ {
        clickable: true,
      } }
      autoplay={ {
        delay: 3000,
        disableOnInteraction: false,
      } }
      navigation={ true }
      modules={ [ Autoplay, Pagination, Navigation ] }
      className="mySwiper z-10"
    >
      { bannerList?.map(banner =>
      {
        return (<SwiperSlide key={ banner.id }><img className="w-full h-auto" src={ banner.imageUrl } alt={ banner.title } /></SwiperSlide>);
      }
      ) }
    </Swiper>


  );
}

export default Carousel;