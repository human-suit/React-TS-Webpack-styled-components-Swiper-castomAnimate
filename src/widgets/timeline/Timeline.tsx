import { useState } from "react";
import { TimelinePeriod } from "./model/types";

interface Props {
  periods: TimelinePeriod[];
}

export const Timeline = ({ periods }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section>
      <h2>{periods[activeIndex].label}</h2>

      {/* круг с точками */}
      {/* слайдер */}
    </section>
  );
};
