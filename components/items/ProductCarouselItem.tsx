import React, { FC } from "react";
import Image from "next/image";
import Stars from "../../public/icons/stars.svg";
import { ProductFromApi } from "@types";

type Props = {
  data: ProductFromApi;
};
const ProductCarouselItem: FC<Props> = ({ data }) => {
  return (
    <div className="px-3 flex items-stretch">
      <div className="w-full h-96 border-2 border-gray-500 hover:border-orange-500 transition-all rounded-lg p-8 flex flex-col relative">
        <Image src={data.medias[0].file?.mediumUrl} fill alt="Icon People" className="object-contain" />
      </div>
    </div>
  );
};
export default ProductCarouselItem;
