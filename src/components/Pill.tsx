import React from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

export const Pill = (props: any) => {
  return props.predictions.map((item: cocoSsd.DetectedObject, index: number) => {
    return (
      <span
        key={item.class}
        className={`inline-block bg-gray-600 size rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2`}
      >
        #{item.class} - {(item.score * 100).toFixed(2)}%
      </span>
    );
  });
};
