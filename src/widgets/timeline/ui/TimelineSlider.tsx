import React, { forwardRef, useImperativeHandle, useRef } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const SliderWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  height: 220px;
`;

const SlideContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-radius: 12px;
  padding: 15px;
  text-align: center;
`;

const SlideTitle = styled.h3`
  margin-bottom: 10px;
  color: #3877ee;
`;

const SlideDescription = styled.p`
  color: #42567a;
`;

export interface SimpleSliderRef {
  slideTo: (index: number) => void;
}

export interface SimpleSliderProps {
  slides: { title: string; description: string }[];
  currentStep: number;
  onSlideChange: (index: number) => void;
}

export const SimpleSlider = forwardRef<SimpleSliderRef, SimpleSliderProps>(
  ({ slides, currentStep, onSlideChange }, ref) => {
    const swiperRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      slideTo: (index: number) => swiperRef.current?.slideTo(index),
    }));

    return (
      <SliderWrapper>
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => onSlideChange(swiper.activeIndex)}
          slidesPerView={3}
          spaceBetween={20}
          navigation
          modules={[Navigation]}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <SlideContent>
                <SlideTitle>{slide.title}</SlideTitle>
                <SlideDescription>{slide.description}</SlideDescription>
              </SlideContent>
            </SwiperSlide>
          ))}
        </Swiper>
      </SliderWrapper>
    );
  },
);
