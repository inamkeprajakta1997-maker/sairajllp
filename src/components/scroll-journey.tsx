import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const chapters = [
  {
    title: "Space for your next chapter.",
    text: "Flexible warehouse rental and organised storage, shaped around your business requirements.",
    image: "/images/warehouse.png",
    href: "/services/warehouse-rental",
    label: "WAREHOUSING",
  },
  {
    title: "People who keep you moving.",
    text: "Administrative, skilled, semi-skilled and unskilled manpower for the everyday demands of your operations.",
    image: "/images/mathadi.png",
    href: "/services/manpower-solutions",
    label: "PEOPLE & OPERATIONS",
  },
  {
    title: "Connected to the road ahead.",
    text: "Goods, courier and part-load transportation that brings your business closer to its destination.",
    image: "/images/transport.jpg",
    href: "/services/goods-transportation",
    label: "LOGISTICS",
  },
];
const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function ScrollJourney() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const line = useRef<SVGPathElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const meter = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = matchMedia("(max-width: 760px)");
    let frame = 0;
    const draw = () => {
      frame = 0;
      if (motion.matches || mobile.matches) return;
      const height = stage.current?.offsetHeight || innerHeight;
      const bounds = section.getBoundingClientRect();
      const header = parseFloat(getComputedStyle(section).getPropertyValue("--journey-top")) || 88;
      const progress = clamp((header - bounds.top) / (section.offsetHeight - height));
      line.current?.style.setProperty("stroke-dashoffset", String(1 - progress));
      meter.current?.style.setProperty("transform", `scaleX(${progress})`);
      cards.current.forEach((card, index) => {
        if (!card) return;
        const t = (progress - index * 0.27 - 0.015) / 0.45;
        const opacity = clamp(t * 7) * clamp((1 - t) * 7);
        card.style.transform = `translate3d(0,${(0.96 - t * 1.65) * height}px,0)`;
        card.style.opacity = String(opacity);
        card.style.visibility = opacity > 0 ? "visible" : "hidden";
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const reset = () => {
      cards.current.forEach((card) => {
        if (card) {
          card.style.removeProperty("transform");
          card.style.removeProperty("opacity");
          card.style.removeProperty("visibility");
        }
      });
      line.current?.style.removeProperty("stroke-dashoffset");
      schedule();
    };
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    motion.addEventListener("change", reset);
    mobile.addEventListener("change", reset);
    draw();
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      motion.removeEventListener("change", reset);
      mobile.removeEventListener("change", reset);
    };
  }, []);
  return (
    <section className="scroll-journey" ref={root} aria-labelledby="journey-title">
      <div className="journey-stage" ref={stage}>
        <svg
          className="journey-route"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="journey-colour" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#176b3a" />
              <stop offset="1" stopColor="#f28c28" />
            </linearGradient>
          </defs>
          <path
            className="journey-track"
            d="M-30 60 H450 Q600 60 600 210 V350 Q600 435 470 435 H275 Q145 435 145 550 V640 Q145 735 290 735 H1230"
          />
          <path
            ref={line}
            className="journey-drawn"
            pathLength="1"
            d="M-30 60 H450 Q600 60 600 210 V350 Q600 435 470 435 H275 Q145 435 145 550 V640 Q145 735 290 735 H1230"
          />
        </svg>
        <div className="journey-heading">
          <p className="eyebrow">
            <span />
            THE WAY FORWARD
          </p>
          <h2 id="journey-title">
            One partnership.
            <br />
            <span>Connected possibilities.</span>
          </h2>
          <p>Space. People. Movement. Working together for your business.</p>
        </div>
        <div className="journey-cards">
          {chapters.map((chapter, index) => (
            <article
              key={chapter.label}
              ref={(node) => {
                cards.current[index] = node;
              }}
              className={`journey-card journey-card-${index}`}
            >
              <div className="journey-photo">
                <img
                  src={chapter.image}
                  alt={
                    chapter.label === "PEOPLE & OPERATIONS"
                      ? "Workers handling goods"
                      : chapter.label === "WAREHOUSING"
                        ? "Warehouse storage racks"
                        : "Goods transportation truck"
                  }
                  loading="lazy"
                  width="600"
                  height="400"
                />
              </div>
              <div className="journey-copy">
                <span className="journey-label">
                  0{index + 1} / {chapter.label}
                </span>
                <h3>{chapter.title}</h3>
                <p>{chapter.text}</p>
                <a
                  href={chapter.href}
                  onFocus={() => {
                    if (
                      root.current &&
                      !matchMedia("(prefers-reduced-motion: reduce), (max-width: 760px)").matches
                    ) {
                      const start = root.current.getBoundingClientRect().top + scrollY;
                      const range =
                        root.current.offsetHeight - (stage.current?.offsetHeight || innerHeight);
                      scrollTo({
                        top: start - 88 + (index * 0.27 + 0.23) * range,
                        behavior: "instant",
                      });
                    }
                  }}
                >
                  Explore Service <ArrowUpRight size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="journey-caption">
          <span>
            <ArrowDown size={15} /> SCROLL TO CONNECT THE POSSIBILITIES
          </span>
          <div className="journey-meter">
            <span ref={meter} />
          </div>
          <a href="#about">
            Continue to our story <ArrowDown size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
