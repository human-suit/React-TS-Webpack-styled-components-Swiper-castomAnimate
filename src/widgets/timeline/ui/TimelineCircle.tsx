import React from "react";
import styled from "styled-components";

interface TimelineCircleProps {
  size?: number; // диаметр круга
  color?: string; // цвет круга
  values: [number, number];
}

const Circle = styled.div<{ size: number; color: string }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: 1px solid ${({ color }) => color};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
  transition: transform 0.3s;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  gap: 75px;
  font-size: 180px;
`;

const NumberTextFirst = styled.span`
  line-height: 1;
  color: #3877ee; /* первый цвет */
`;

const NumberTextSecond = styled.span`
  line-height: 1;
  color: #ef5da8; /* второй цвет */
`;

export const TimelineCircle: React.FC<TimelineCircleProps> = ({
  size = 60,
  color = "#42567A",
  values,
}) => {
  return (
    <Circle size={size} color={color}>
      <NumberTextFirst>{values[0]}</NumberTextFirst>
      <NumberTextSecond>{values[1]}</NumberTextSecond>
    </Circle>
  );
};
