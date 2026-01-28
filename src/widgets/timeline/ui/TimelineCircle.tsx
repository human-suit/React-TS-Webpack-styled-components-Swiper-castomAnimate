import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface TimelineCircleProps {
  size?: number;
  color?: string;
  values: [number, number];
}

const Circle = styled.div<{ size: number; color: string }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: 1px solid ${({ color }) => color};
  border-radius: 50%;
  position: absolute;
  inset: 0;
  margin: auto;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 90px;

  font-size: 180px;
  font-weight: bold;
  z-index: 1;

  @media (max-width: 400px) {
    position: static;
    margin-top: 20px;
    width: auto;
    height: auto;
    border: none;

    gap: 40px;
    justify-content: center;
  }
`;

const First = styled.span`
  color: #3877ee;
  @media (max-width: 400px) {
    font-size: 68px;
  }
`;

const Second = styled.span`
  color: #ef5da8;
  @media (max-width: 400px) {
    font-size: 68px;
  }
`;

export const TimelineCircle: React.FC<TimelineCircleProps> = ({
  size = 500,
  color = "#3877EE",
  values,
}) => {
  const [display, setDisplay] = useState<[number, number]>(values);
  const prevValues = useRef<[number, number]>(values);

  useEffect(() => {
    const start = prevValues.current;
    const end = values;

    const duration = 600; // ms
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);

      const current: [number, number] = [
        Math.round(start[0] + (end[0] - start[0]) * progress),
        Math.round(start[1] + (end[1] - start[1]) * progress),
      ];

      setDisplay(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        prevValues.current = end;
      }
    };

    requestAnimationFrame(animate);
  }, [values]);

  return (
    <Circle size={size} color={color}>
      <First>{display[0]}</First>
      <Second>{display[1]}</Second>
    </Circle>
  );
};
