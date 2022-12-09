import React, { FC } from "react";
import Carousel from "@customs/Carousel";
import BigBannerItem from "@items/BigBannerItem";
import { BannerFromApi } from "@types";

type Props = {
  data: BannerFromApi[];
};
const BannerCarousel: FC<Props> = ({ data }) => {
  return (
    <div className="w-full mt-24">
      <Carousel
        showsDot={true}
        showsArrow={true}
        slidesToShow={1}
        slidesToScroll={1}
        responsive={false}
      >
        {data &&
          data.map((item, index) => <BigBannerItem data={item} key={index} />)}
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
