import React, { ReactNode } from 'react'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react';

interface Props {
  children: ReactNode;
  amount: number;
  slidesPerViewSm?: number;
  slidesPerViewMd?: number;
  slidesPerViewLg?: number;
  slidesPerViewXl?: number;
  arrowColor?: string;
}

const KeenSlider = ({
  children,
  amount,
  slidesPerViewSm = 2,
  slidesPerViewMd = 4,
  slidesPerViewLg = 6,
  slidesPerViewXl = 10,
  arrowColor = 'fill-white'
}: Props) => {
  const [sliderRef, sliderInstanceRef] = useKeenSlider<HTMLDivElement>({
    range: {
      min: 0,
      max: amount - 1,
    },
    mode: "free-snap",
    breakpoints: {
      "(max-width: 1440px)": {
        slides: { perView: slidesPerViewLg, spacing: 10 },
      },
      "(max-width: 600px)": {
        slides: { perView: slidesPerViewMd, spacing: 10 },
      },
      "(max-width: 400px)": {
        slides: { perView: slidesPerViewSm, spacing: 10 },
      },
    },
    slides: {
      perView: slidesPerViewXl,
      spacing: 15,
    },
  });

  return (
    <div className="w-full px-8 py-8 relative">
      <div ref={sliderRef} className="keen-slider first">
        {children}
      </div>

      <Arrow
        left
        color={arrowColor}
        onClick={(e: any) =>
          e.stopPropagation() || sliderInstanceRef.current?.prev()
        }
        disabled={false}
      />

      <Arrow
        onClick={(e: any) =>
          e.stopPropagation() || sliderInstanceRef.current?.next()
        }
        color={arrowColor}
        disabled={false}
      />
    </div>
  );
};

export default KeenSlider

function Arrow(props: {
  disabled: boolean,
  left?: boolean,
  color?: string,
  onClick: (e: any) => void
}) {
  const disabled = props.disabled ? " arrow--disabled" : ""
  if(!props.color){
    props.color = 'fill-white'
  }
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabled} ${props.color}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}