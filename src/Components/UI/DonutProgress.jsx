import React, { useEffect, useState, useRef } from "react";

function DonutProgress({ percentage, size, strokeWidth, progressColor, backgroundColor }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const [offset, setOffset] = useState(() => circumference);
  const prevOffsetRef = useRef(circumference);

  useEffect(() => {
    const targetOffset = circumference - (percentage / 100) * circumference;
    const startOffset = prevOffsetRef.current;
    const animationDuration = 3000; // ms
    let startTime = null;

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      // ease function (easeInOutQuad)
      const easeProgress = progress < 0.5 
        ? 2 * progress * progress 
        : -1 + (4 - 2 * progress) * progress;

      const currentOffset = startOffset + (targetOffset - startOffset) * easeProgress;
      setOffset(currentOffset);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        prevOffsetRef.current = targetOffset; // save current as previous for next anim
      }
    }

    requestAnimationFrame(animate);
  }, [percentage, circumference]);

  return (
    <svg width={size} height={size}>
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke={backgroundColor}
        strokeWidth={strokeWidth}
      />
      {/* Animated Progress Circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke={progressColor}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      {/* Center Text */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize="1.5rem"
        fill="#333"
      >
        {percentage}%
      </text>
    </svg>
  );
}

export default DonutProgress;
