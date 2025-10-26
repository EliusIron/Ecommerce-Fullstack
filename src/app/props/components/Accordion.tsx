import React from 'react';

interface PanelProps {
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  onShow: () => void;
}

export function Panel({ title, children, isActive, onShow }: PanelProps) {
  return (
    <div>
      <h3>{title}</h3>
      {isActive ? <p>{children}</p> : <button onClick={onShow}>Mostrar</button>}
    </div>
  );
}

interface AccordionProps {
  children: React.ReactNode;
}

export default function Accordion({ children }: AccordionProps) {
  return (
    <div className="accordion">
      {children}
    </div>
  );
}
