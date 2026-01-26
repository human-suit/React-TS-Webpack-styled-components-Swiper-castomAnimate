import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const SliderOuterWrapper = styled.div`
  position: relative;
  width: 1050px;
  margin-left: 60px;
`;

const SliderWrapper = styled.div<{ $visible: boolean }>`
  height: 220px;
  overflow: visible;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.4s ease;
`;

const SlideContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 110px;
  border-radius: 12px;
  padding: 15px;
  text-align: left;
  box-sizing: border-box;
`;

const SlideTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #3877ee;
  font-size: 20px;
  line-height: 1.2;
`;

const SlideDescription = styled.p`
  margin: 0;
  color: #42567a;
  font-size: 16px;
  line-height: 1.4;
`;

const NavButton = styled.div<{ $hidden: boolean; $left?: boolean }>`
  position: absolute;
  top: 30px;
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  color: #3877ee;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  pointer-events: ${({ $hidden }) => ($hidden ? "none" : "auto")};
  transition: opacity 0.3s ease;

  ${({ $left }) => ($left ? "left: -50px;" : "right: -100px;")}
`;

export interface SimpleSliderRef {
  slideTo: (index: number) => void;
  slideNext: () => void;
  slidePrev: () => void;
}

export interface SimpleSliderProps {
  slides: { title: string; description: string }[];
  currentStep: number; // шаг, который меняется извне
  onSlideChange: (index: number) => void;
}

export const SimpleSlider = forwardRef<SimpleSliderRef, SimpleSliderProps>(
  ({ slides, currentStep, onSlideChange }, ref) => {
    const swiperRef = useRef<any>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    const containerWidth = 1050;
    const slideWidth = 300;
    const spaceBetween = 20;
    const visibleSlides = Math.floor(
      containerWidth / (slideWidth + spaceBetween),
    );

    useImperativeHandle(ref, () => ({
      slideTo: (index: number) => swiperRef.current?.slideTo(index),
      slideNext: () => swiperRef.current?.slideNext(),
      slidePrev: () => swiperRef.current?.slidePrev(),
    }));

    // При смене currentStep делаем fade
    useEffect(() => {
      setVisible(false); // скрываем слайдер
      const timeout = setTimeout(() => {
        setActiveIndex(0); // сбрасываем активный слайд при новом step
        swiperRef.current?.slideTo(0);
        setVisible(true); // показываем слайдер снова
      }, 300); // длительность fade

      return () => clearTimeout(timeout);
    }, [currentStep]);

    const handleSlideChange = (index: number) => {
      setActiveIndex(index);
      onSlideChange(index);
    };

    return (
      <SliderOuterWrapper>
        <SliderWrapper $visible={visible}>
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => handleSlideChange(swiper.activeIndex)}
            slidesPerView="auto"
            spaceBetween={spaceBetween}
          >
            {slides.map((slide, index) => (
              <SwiperSlide
                key={index}
                style={{
                  width: slideWidth,
                  boxSizing: "border-box",
                  display: "flex",
                }}
              >
                <SlideContent>
                  <SlideTitle>{slide.title}</SlideTitle>
                  <SlideDescription>{slide.description}</SlideDescription>
                </SlideContent>
              </SwiperSlide>
            ))}
          </Swiper>
        </SliderWrapper>

        <NavButton
          $left
          $hidden={activeIndex === 0}
          onClick={() => activeIndex > 0 && swiperRef.current?.slidePrev()}
        >
          &lt;
        </NavButton>

        <NavButton
          $hidden={activeIndex + visibleSlides >= slides.length}
          onClick={() =>
            activeIndex + visibleSlides < slides.length &&
            swiperRef.current?.slideNext()
          }
        >
          &gt;
        </NavButton>
      </SliderOuterWrapper>
    );
  },
);
