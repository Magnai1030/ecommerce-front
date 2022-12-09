import React, { FC, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BrandFromApi } from "@types";

type Props = {
  data: BrandFromApi;
};

const BrandSmallItem: FC<Props> = ({ data }) => {
  return (
    <motion.div
      className="flex w-20 h-20 relative m-1"
      whileHover={{
        scale: 1.1,
        transition: {
          duration: 0.2,
        },
      }}
    >
      <Image src={data.imageUrl} fill alt="Standard Plan" />
    </motion.div>
  );
};
export default BrandSmallItem;
