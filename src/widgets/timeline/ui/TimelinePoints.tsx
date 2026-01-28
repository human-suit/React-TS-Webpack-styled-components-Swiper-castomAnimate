import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TimelineStep } from "../data/steps";

interface TimelinePointsProps {
  steps: TimelineStep[];
  circleSize: number;
  activeIndex: number;
  tooltipVisible: number | null;
  setTooltipVisible: (index: number | null) => void;
  onPointClick: (index: number) => void;
}

const Circle = styled.div<{ size: number }>`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  z-index: 10;
  @media (max-width: 400px) {
    display: none;
  }
`;

const RotatingWrapper = styled.div<{ rotation: number }>`
  width: 100%;
  height: 100%;
  transform: rotate(${({ rotation }) => rotation}deg);
  transition: transform 0.5s ease;
  pointer-events: none;
`;

const PointWrapper = styled.div<{ x: number; y: number }>`
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  transform: translate(-50%, -50%);
  pointer-events: auto;
`;

const PointDot = styled.div<{ $active: boolean; $hover: boolean }>`
  width: ${({ $active, $hover }) => ($active || $hover ? "56px" : "10px")};
  height: ${({ $active, $hover }) => ($active || $hover ? "56px" : "10px")};
  border-radius: 50%;
  background: ${({ $active, $hover }) =>
    $active || $hover ? "#F4F5F9" : "#42567A"};
  border: ${({ $active, $hover }) =>
    $active || $hover ? "1px solid #303e58" : "0px"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #42567a;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    width: 56px;
    height: 56px;
    background: #f4f5f9;
    border: 1px solid #303e58;
  }
`;

const Tooltip = styled.div<{ x: number; y: number; $visible: boolean }>`
  position: absolute;
  left: ${({ x }) => x + 44}px;
  top: ${({ y }) => y}px;
  transform: translateY(${({ $visible }) => ($visible ? "-50%" : "-60%")});
  color: #42567a;
  font-size: 20px;
  font-weight: bold;
  white-space: nowrap;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: none;
  z-index: 10;

  transition:
    opacity ${({ $visible }) => ($visible ? "0.5s ease" : "0.1s ease")},
    transform ${({ $visible }) => ($visible ? "0.5s ease" : "0.1s ease")};
`;

export const TimelinePoints: React.FC<TimelinePointsProps> = ({
  steps,
  circleSize,
  activeIndex,
  tooltipVisible,
  setTooltipVisible,
  onPointClick,
}) => {
  const [rotation, setRotation] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const radius = circleSize / 2;
  const layoutOffset = -60;

  useEffect(() => {
    const anglePerStep = 360 / steps.length;
    const newRotation = -activeIndex * anglePerStep;
    setRotation(newRotation);
  }, [activeIndex, steps.length]);

  const handlePointClick = (index: number) => {
    setTooltipVisible(null);
    setTimeout(() => onPointClick(index), 100);
  };

  return (
    <Circle size={circleSize}>
      <RotatingWrapper rotation={rotation}>
        {steps.map((_, i) => {
          const angle = layoutOffset + (i / steps.length) * 360;
          const rad = (angle * Math.PI) / 180;
          const x = radius + radius * Math.cos(rad);
          const y = radius + radius * Math.sin(rad);

          const isActive = i === activeIndex;
          const isHover = i === hoverIndex;

          return (
            <PointWrapper
              key={i}
              x={x}
              y={y}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <PointDot
                style={{ transform: `rotate(${-rotation}deg)` }}
                $active={isActive}
                $hover={isHover}
                onClick={() => handlePointClick(i)}
              >
                {isActive || isHover ? i + 1 : null}
              </PointDot>
            </PointWrapper>
          );
        })}
      </RotatingWrapper>

      {steps.map((step, i) => {
        const isVisible = i === tooltipVisible;
        const angle = layoutOffset + (i / steps.length) * 360 + rotation;
        const rad = (angle * Math.PI) / 180;
        const x = radius + radius * Math.cos(rad);
        const y = radius + radius * Math.sin(rad);

        return (
          <Tooltip key={i} x={x} y={y} $visible={isVisible}>
            {step.facts?.[0]?.title ?? `${step.years[0]}–${step.years[1]}`}
          </Tooltip>
        );
      })}
    </Circle>
  );
};
