import { ProductFromApi } from "@types";
import Image from "next/image";
import { FC } from "react";
import Brand from "./Brand";
import Button from "./Button";
type Props = {
  data: ProductFromApi;
};
const NormalProductItem: FC<Props> = ({ data }) => {
  return (
    <div className="border-2 w-full border-gray-500 hover:border-orange-500 transition-all rounded-lg flex p-4 flex-row relative mb-6">
      <div className="w-44 h-44 relative">
        <Image
          src={data.medias[0].file.mediumUrl}
          fill
          className="object-contain rounded-md"
          alt="ProductImage"
        />
      </div>
      <div className="flex flex-col p-4 text-left justify-between">
        <p className="text-lg text-black-600 capitalize">{data.name}</p>
        <div>
          <p className="text-sm text-black-500 capitalize line-through">
            {data.unitPrice}
          </p>
          <p className="text-lg text-black-600 capitalize">{data.unitPrice}</p>
        </div>
      </div>
      {data.brand ? <Brand url={data.brand.imageUrl} /> : null}
      <Button />
    </div>
  );
};
export default NormalProductItem;
