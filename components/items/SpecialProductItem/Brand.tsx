import React, { FC } from "react";
import Image from "next/image";
type Props = {
  url: string;
};
const Brand: FC<Props> = ({ url }) => {
  return (
    <div className="absolute bg-orange-200 w-10 h-10 top-4 left-4 rounded-md">
      <Image
        src={url}
        fill
        className="object-cover rounded-md"
        alt="BrandIcon"
      />
    </div>
  );
};
export default Brand;
