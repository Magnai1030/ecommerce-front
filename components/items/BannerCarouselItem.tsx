import React, { FC } from "react";
import Image from "next/image";
import Stars from "../../public/icons/stars.svg";

export interface CarouselData {
  name: string;
  image: string;
  city: string;
  country: string;
  rating: string;
  testimoni: string;
}

type Props = {
  data: CarouselData;
  index?: number;
};
const BannerCarouselItem: FC<Props> = ({ data, index }) => {
  return (
    <div className="px-3 flex items-stretch" key={index}>
      <div className="border-2 border-gray-500 hover:border-orange-500 transition-all rounded-lg p-8 flex flex-col">
        <div className="flex flex-col xl:flex-row w-full items-stretch xl:items-center">
          <div className="flex order-2 xl:order-1">
            <Image src={data.image} height={50} width={50} alt="Icon People" />
            <div className="flex flex-col ml-5 text-left">
              <p className="text-lg text-black-600 capitalize">{data.name}</p>
              <p className="text-sm text-black-500 capitalize">
                {data.city},{data.country}
              </p>
            </div>
          </div>
          <div className="flex flex-none items-center ml-auto order-1 xl:order-2">
            <p className="text-sm">{data.rating}</p>
            <span className="flex ml-4">
              <Stars className="h-4 w-4" />
            </span>
          </div>
        </div>
        <p className="mt-5 text-left">“{data.testimoni}”.</p>
      </div>
    </div>
  );
};
export default BannerCarouselItem;
