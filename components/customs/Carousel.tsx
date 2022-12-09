import React, { ClassAttributes, FC, ReactNode, useState } from "react";

import Slider from "react-slick";

import ArrowBack from "../../public/icons/eva_arrow-back-fill.svg";
import ArrowNext from "../../public/icons/eva_arrow-next-fill.svg";

type Props = {
  children: ReactNode;
  showsArrow: boolean;
  showsDot: boolean;
  responsive: boolean;
  slidesToShow: number;
  slidesToScroll: number;
};
const Carousel: FC<Props> = ({
  children,
  showsArrow,
  showsDot,
  responsive,
  slidesToShow,
  slidesToScroll,
}) => {
  const settings = {
    dots: showsDot,
    customPaging: function () {
      return (
        <a>
          <span className="mx-2 rounded-l-full rounded-r-full h-4 w-4 block cursor-pointer transition-all "></span>
        </a>
      );
    },
    dotsClass: "slick-dots w-max absolute mt-20 px-5",
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    responsive: responsive
      ? [
          {
            breakpoint: 770,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ]
      : undefined,
  };
  const [sliderRef, setSliderRef] = useState<any>();
  return (
    <>
      <Slider
        {...settings}
        arrows={false}
        ref={sliderRef}
        className="flex items-stretch justify-items-stretch"
      >
        {children}
      </Slider>
      {showsArrow ? (
        <div className="flex w-full items-center justify-end px-5">
          <div className="flex flex-none justify-between w-auto mt-14">
            <div
              className="mx-4 flex items-center justify-center h-14 w-14 rounded-full bg-white border-orange-500 border hover:bg-orange-500 hover:text-white-500 transition-all text-orange-500 cursor-pointer"
              onClick={sliderRef?.slickPrev}
            >
              <ArrowBack className="h-6 w-6 " />
            </div>
            <div
              className="flex items-center justify-center h-14 w-14 rounded-full bg-white border-orange-500 border hover:bg-orange-500 hover:text-white-500 transition-all text-orange-500 cursor-pointer"
              onClick={sliderRef?.slickNext}
            >
              <ArrowNext className="h-6 w-6" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Carousel;
