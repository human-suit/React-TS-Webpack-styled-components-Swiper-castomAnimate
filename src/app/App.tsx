import React, { useState, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { TimelineCircle } from "../widgets/timeline/ui/TimelineCircle";
import { TimelinePoints } from "../widgets/timeline/ui/TimelinePoints";
import { steps } from "../widgets/timeline/data/steps";
import {
  SimpleSlider,
  SimpleSliderRef,
} from "../widgets/timeline/ui/TimelineSlider";

const GlobalStyle = createGlobalStyle`
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body, #root {
    width:100%;
    height:100%;
    font-family:"PT Sans", sans-serif;
    background: #E5E5E5;
  }
`;

const Container = styled.div`
  padding-top: 10vh;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(66, 86, 122, 0.2);
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  position: relative; /* для абсолютного позиционирования линий внутри */
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  color: #42567a;
  font-weight: bold;
  font-size: 26px;
  margin-bottom: 40px;

  h1 {
    line-height: 1.2;
  }

  .title-main {
    display: block;
  }
  .title-sub {
    display: block;
    position: relative;
    left: 0;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 60px;
    .title-sub {
      left: -100px;
    }
  }
`;

const Liner = styled.div`
  width: 5px;
  height: 15vh;
  background: linear-gradient(to bottom, #3877ee 0%, #ef5da8 100%);
  border-radius: 999px;
  @media (min-width: 768px) {
    height: 150px;
  }
`;

const Section = styled.div`
  margin-top: -120px;
  display: flex;
  justify-content: center;
  position: relative;
`;

const CircleWrapper = styled.div<{ size: number }>`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

const Controls = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin: 20px 0px 20px 60px;
`;

const StepCounter = styled.div`
  font-size: 16px;
  color: #42567a;
  font-weight: bold;
  margin: 20px 0px -10px 65px;
`;

const SliderFade = styled.div<{ $visible: boolean }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const ArrowButton = styled.button<{ $left?: boolean; $disabled?: boolean }>`
  font-size: 0;
  background: #e5e5e5;
  width: 50px;
  height: 50px;
  border: 1px solid #42567a;
  border-radius: 50%;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition:
    opacity 0.2s ease,
    border-color 0.2s ease;

  svg {
    width: 30px;
    height: 30px;
    fill: ${({ $disabled }) => ($disabled ? "#42567A" : "#42567a")};
    transform: ${({ $left }) => ($left ? "rotate(180deg)" : "none")};
    transition: fill 0.2s ease;
  }

  &:hover svg {
    fill: ${({ $disabled }) => ($disabled ? "#42567A" : "#3877ee")};
  }
`;

// Вертикальная линия по центру контейнера
const VerticalLine = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background-color: rgba(66, 86, 122, 0.2);
  transform: translateX(-50%); /* точно по центру */
`;

// Горизонтальная линия по центру контейнера
const HorizontalLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 41.3%;
  height: 1px;
  background-color: rgba(66, 86, 122, 0.2);
  transform: translateY(-50%);
`;
const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tooltipVisible, setTooltipVisible] = useState<number | null>(0);
  const [sliderVisible, setSliderVisible] = useState(true);
  const sliderRef = useRef<SimpleSliderRef>(null);

  // Ref для хранения таймера fade
  const fadeTimeout = useRef<NodeJS.Timeout | null>(null);

  // Плавная смена шага с fade
  const changeStep = (nextStep: number) => {
    // отменяем предыдущий таймер, если кликнули быстро
    if (fadeTimeout.current) {
      clearTimeout(fadeTimeout.current);
    }

    setSliderVisible(false);
    setTooltipVisible(null);

    fadeTimeout.current = setTimeout(() => {
      setCurrentStep(nextStep);
      sliderRef.current?.slideTo(0);
      setSliderVisible(true);

      setTimeout(() => setTooltipVisible(nextStep), 400);
      fadeTimeout.current = null;
    }, 300);
  };

  const handlePrev = () => {
    if (currentStep === 0) return;
    changeStep(currentStep - 1);
  };

  const handleNext = () => {
    if (currentStep === steps.length - 1) return;
    changeStep(currentStep + 1);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <VerticalLine />
        <HorizontalLine />
        <Header>
          <Liner />
          <h1>
            <span className="title-main">Исторические</span>
            <span className="title-sub">даты</span>
          </h1>
        </Header>

        <Section>
          <CircleWrapper size={500}>
            <TimelineCircle
              size={500}
              color="#3877EE"
              values={steps[currentStep].years}
            />

            <TimelinePoints
              steps={steps}
              circleSize={500}
              activeIndex={currentStep}
              tooltipVisible={tooltipVisible}
              setTooltipVisible={setTooltipVisible}
              onPointClick={changeStep}
            />
          </CircleWrapper>
        </Section>

        <StepCounter>
          {String(currentStep + 1).padStart(2, "0")}/
          {String(steps.length).padStart(2, "0")}
        </StepCounter>

        <Controls>
          <ArrowButton $left $disabled={currentStep === 0} onClick={handlePrev}>
            <svg viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </ArrowButton>

          <ArrowButton
            $disabled={currentStep === steps.length - 1}
            onClick={handleNext}
          >
            <svg viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </ArrowButton>
        </Controls>

        <SliderFade $visible={sliderVisible}>
          <SimpleSlider
            ref={sliderRef}
            slides={steps[currentStep].facts.map((f) => ({
              title: `${f.year}`,
              description: f.description,
            }))}
            currentStep={0}
            onSlideChange={() => {}}
          />
        </SliderFade>
      </Container>
    </>
  );
};

export default App;
