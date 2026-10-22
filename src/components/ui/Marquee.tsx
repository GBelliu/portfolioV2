import './Marquee.css';

interface MarqueeProps {
  items: string[];
  separator?: string;
  reverse?: boolean;
  className?: string;
}

export function Marquee({ items, separator = '✦', reverse = false, className = '' }: MarqueeProps) {
  const content = items.map((item) => (
    <span key={item}>
      {item}
      <b aria-hidden="true">{separator}</b>
    </span>
  ));

  return (
    <div className={`marquee ${className}`} data-reverse={reverse}>
      <p className="sr-only">{items.join(', ')}</p>
      <div className="marquee__track" aria-hidden="true">
        <div className="marquee__group">{content}</div>
        <div className="marquee__group">{content}</div>
      </div>
    </div>
  );
}
