import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

/**
 * AdShot AI Logo Mark (Redesigned per PRD)
 * 
 * Concept: "From Flat Photo to AI Lifestyle Masterpiece"
 * - The framing brackets (Crop Tool) represent the original product photography and "AdShot".
 * - The organic, glowing stars represent the AI transformation and scene generation ("Virtual Studio").
 * 
 * Uses CSS variables for theming:
 * - Frame/Structure: var(--foreground)
 * - AI Accents: var(--primary)
 */
export const Logo = ({ className, size = 64, ...props }: LogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0 transition-transform duration-300 group", className)}
      {...props}
    >
      <g id="logo-mark">
        {/* Original Photo / Framing Tool */}
        <g id="crop-frame" className="transition-colors duration-300 fill-foreground group-hover:fill-foreground/90">
          {/* Top-Left Frame */}
          <path
            d="M4 28V4H28V10H10V28H4Z"
            className="opacity-90 transition-all duration-500 group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]"
          />
          {/* Bottom-Right Frame */}
          <path
            d="M60 36V60H36V54H54V36H60Z"
            className="opacity-90 transition-all duration-500 group-hover:translate-x-[2px] group-hover:translate-y-[2px]"
          />
        </g>

        {/* AI Transformation Sparks */}
        <g id="ai-sparks" className="transition-all duration-500 group-hover:scale-105 origin-center">
          {/* Central Main Spark */}
          <path
            d="M32 12C32 24 24 32 12 32C24 32 32 40 32 52C32 40 40 32 52 32C40 32 32 24 32 12Z"
            fill="var(--primary)"
          />
          {/* Top-Right Secondary Spark */}
          <path
            d="M52 4C52 9 49 12 44 12C49 12 52 15 52 20C52 15 55 12 60 12C55 12 52 9 52 4Z"
            fill="var(--primary)"
            className="opacity-80 animate-pulse"
          />
          {/* Bottom-Left Secondary Spark */}
          <path
            d="M12 44C12 49 9 52 4 52C9 52 12 55 12 60C12 55 15 52 20 52C15 52 12 49 12 44Z"
            fill="var(--primary)"
            className="opacity-80 animate-pulse"
            style={{ animationDelay: "500ms" }}
          />
        </g>
      </g>
    </svg>
  );
};

export default Logo;
