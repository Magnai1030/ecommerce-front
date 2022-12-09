import React, { FC } from "react";
import Image from "next/image";
import Stars from "../../public/icons/stars.svg";
import { BannerFromApi } from "@types";

type Props = {
  data: BannerFromApi;
  index?: number;
};
const BigBannerItem: FC<Props> = ({ data, index }) => {
  return (
    <div className="flex" key={index}>
      <div className="flex flex-col relative w-full h-96">
        <Image
          src={data.imageUrl}
          fill
          alt={"bg"}
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
};
export default BigBannerItem;
