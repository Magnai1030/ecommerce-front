import React, { FC } from "react";
import Carousel from "@customs/Carousel";
import Image from "next/image";
import { BannerFromApi } from "@types";
type Props = {
  data: BannerFromApi[];
};
const SmallBannerCarousel: FC<Props> = ({ data }) => {
  return (
    <div className="max-w-screen-xl mt-14 mx-auto">
      <Carousel
        showsDot={false}
        showsArrow={false}
        slidesToShow={4}
        slidesToScroll={2}
        responsive={true}
      >
        {data &&
          data.map((item, index) => (
            <div className="px-3 flex items-stretch" key={index}>
              <div className="border-2 border-gray-500 hover:border-orange-500 transition-all rounded-lg p-8 flex relative h-44">
                <Image
                  src={item.imageUrl}
                  fill
                  alt={"bg"}
                  priority
                  className="object-cover rounded-md"
                />
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default SmallBannerCarousel;
