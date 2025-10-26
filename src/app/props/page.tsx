import React, { useState } from "react";
import Accordion from "../props/components/Accordion";
import { Panel } from "../props/components/Accordion";

export default function PropsPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Accordion>
      <Panel
        title="Panel 1"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        Contenido del panel 1.
      </Panel>
      <Panel
        title="Panel 2"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        Contenido del panel 2.
      </Panel>
    </Accordion>
  );
}
