import React, { FC } from "react";

import Carousel from "@customs/Carousel";
import { CollectionFromApi } from "@types";
import ProductCarouselItem from "@items/ProductCarouselItem";
import SpecialProductItem from "@items/SpecialProductItem";

type Props = {
  data: CollectionFromApi[];
};
const SpecialCollectionContainer: FC<Props> = ({ data }) => {
  return (
    <div className="max-w-screen-xl mt-14 mx-auto flex flex-col md:flex-row">
      <div className="w-full md:max-w-mobile pb-14 md:pb-0">
        <Carousel
          showsDot={false}
          showsArrow={true}
          slidesToShow={1}
          slidesToScroll={1}
          responsive={false}
        >
          {data[0].results.map((item, index) => (
            <ProductCarouselItem data={item} key={index} />
          ))}
        </Carousel>
      </div>
      <div className="flex-1">
        <div className="columns-2 md:columns-1 lg:columns-2 xl:columns-3 gap-6 px-3">
          {data[0].results.slice(0, 6).map((item, index) => (
            <SpecialProductItem data={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialCollectionContainer;
