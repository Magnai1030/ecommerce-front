import React, { FC } from "react";

import { CollectionFromApi } from "@types";
import NormalProductItem from "@items/NormalProductItem";

type Props = {
  data: CollectionFromApi[];
};

const CollectionContainer: FC<Props> = ({ data }) => {
  return (
    <>
      {data &&
        data.map((item, index) => (
          <div
            className="max-w-screen-xl my-14 mx-auto flex-row flex"
            key={index}
          >
            <div className="w-full columns-1 sm:columns-2 lg:columns-3 gap-6 px-3">
              {item.results.map((prodItem, prodIndex) => (
                <NormalProductItem data={prodItem} key={prodIndex} />
              ))}
            </div>
          </div>
        ))}
    </>
  );
};

export default CollectionContainer;
