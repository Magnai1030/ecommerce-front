import React, { FC, useMemo } from "react";
import Image from "next/image";
import ButtonOutline from "@customs/ButtonOutline";
import { motion } from "framer-motion";
import getScrollAnimation from "@utils/getScrollAnimation";
import ScrollAnimationWrapper from "@layouts/ScrollAnimation";
import { BrandFromApi, PaginationResult } from "@types";
import BrandSmallItem from "@items/BrandSmallItem";

type Props = {
  data: BrandFromApi[];
};

const BrandContainer: FC<Props> = ({ data }) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
      className="bg-gradient-to-b from-white-300 to-white-500 w-full py-14"
      id="pricing"
    >
      <div className="max-w-screen-xl  px-6 sm:px-8 lg:px-16 mx-auto flex flex-col w-full text-center justify-center">
        <div className="flex flex-col w-full">
          <ScrollAnimationWrapper>
            <motion.h3
              variants={scrollAnimation}
              className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-relaxed"
            >
              Брэндүүд
            </motion.h3>
            <motion.p
              variants={scrollAnimation}
              className="leading-normal w-10/12 sm:w-7/12 lg:w-6/12 mx-auto my-2 text-center"
            >
              Lets choose the package that is best for you and explore it
              happily and cheerfully.
            </motion.p>
          </ScrollAnimationWrapper>
          <div className="flex flex-wrap flex-row justify-center items-center pt-14">
            {data &&
              data.map((item, index) => (
                <BrandSmallItem data={item} key={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BrandContainer;
