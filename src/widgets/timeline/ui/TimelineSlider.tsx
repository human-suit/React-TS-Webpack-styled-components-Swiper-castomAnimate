import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const SliderOuterWrapper = styled.div`
  position: relative;
  width: 1050px;
  margin-left: 60px;

  .swiper-pagination {
    display: none;
  }

  @media (max-width: 400px) {
    width: 100%;
    margin-left: 20px;

    .swiper {
      margin-left: -170px;
      overflow: visible;
    }

    .top-line {
      width: 100%;
      height: 1px;
      background-color: #c7cdd9;
      margin: 0px 10px 10px -20px;
    }

    .swiper-pagination {
      display: flex;
      justify-content: center;
      position: absolute;
      margin: 0px 0px -90px 80px;
      bottom: -12px;

      .swiper-pagination-bullet {
        background: #42567a;
        opacity: 0.3;
      }

      .swiper-pagination-bullet-active {
        opacity: 1;
      }
    }

    .swiper-slide {
      opacity: 0.35;
      transition:
        opacity 0.3s ease,
        transform 0.3s ease;
    }

    .swiper-slide-active {
      opacity: 1;
    }

    .swiper-slide-next {
      opacity: 0.4;
    }
  }
`;

const SliderWrapper = styled.div<{ $visible: boolean }>`
  height: 100px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.4s ease;
  overflow: visible;

  @media (max-width: 400px) {
    height: 160px;
  }
`;

const SlideContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 110px;
  border-radius: 12px;
  padding: 15px;
  box-sizing: border-box;
`;

const SlideTitle = styled.h3`
  margin: 0 0 10px;
  color: #3877ee;
  font-size: 20px;

  @media (max-width: 400px) {
    font-size: 16px;
  }
`;

const SlideDescription = styled.p`
  margin: 0;
  color: #42567a;
  font-size: 16px;

  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

const NavButton = styled.div<{ $hidden: boolean; $left?: boolean }>`
  position: absolute;
  top: 30px;
  width: 30px;
  height: 30px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  pointer-events: ${({ $hidden }) => ($hidden ? "none" : "auto")};

  ${({ $left }) => ($left ? "left: -35px;" : "right: -70px;")}

  svg {
    width: 16px;
    height: 16px;
    fill: #3877ee;
    transform: ${({ $left }) => ($left ? "rotate(180deg)" : "none")};
  }

  @media (max-width: 400px) {
    display: none;
  }
`;

export interface SimpleSliderRef {
  slideTo: (index: number) => void;
  slideNext: () => void;
  slidePrev: () => void;
}

export interface SimpleSliderProps {
  slides: { title: string; description: string }[];
  currentStep: number;
  onSlideChange: (index: number) => void;
}

export const SimpleSlider = forwardRef<SimpleSliderRef, SimpleSliderProps>(
  ({ slides, currentStep, onSlideChange }, ref) => {
    const swiperRef = useRef<any>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [visible, setVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    const spaceBetween = 20;
    const visibleSlides = 3;
    const mobileSlideWidth = 250;

    useEffect(() => {
      const updateWidth = () => setIsMobile(window.innerWidth <= 400);
      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }, []);

    useImperativeHandle(ref, () => ({
      slideTo: (index) => swiperRef.current?.slideTo(index),
      slideNext: () => swiperRef.current?.slideNext(),
      slidePrev: () => swiperRef.current?.slidePrev(),
    }));

    useEffect(() => {
      setVisible(false);
      const t = setTimeout(() => {
        setActiveIndex(0);
        swiperRef.current?.slideTo(0);
        setVisible(true);
      }, 300);
      return () => clearTimeout(t);
    }, [currentStep]);

    const handleSlideChange = (index: number) => {
      setActiveIndex(index);
      onSlideChange(index);
    };

    return (
      <SliderOuterWrapper>
        {isMobile && <div className="top-line" />}
        <SliderWrapper $visible={visible}>
          <Swiper
            modules={[Pagination]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => handleSlideChange(swiper.activeIndex)}
            slidesPerView={isMobile ? "auto" : 3}
            spaceBetween={spaceBetween}
            pagination={{ clickable: true }}
            centeredSlides={isMobile}
            slidesPerGroup={1}
            initialSlide={0}
          >
            {slides.map((slide, index) => (
              <SwiperSlide
                key={index}
                style={{
                  width: isMobile ? mobileSlideWidth : 300,
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
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <svg viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
          </svg>
        </NavButton>

        <NavButton
          $hidden={activeIndex + visibleSlides >= slides.length}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <svg viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
          </svg>
        </NavButton>
      </SliderOuterWrapper>
    );
  },
);
