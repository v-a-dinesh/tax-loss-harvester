import React, { useState, useRef, useEffect } from "react";

const Header: React.FC = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  // Handle clicking outside to close tooltip
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        linkRef.current &&
        !linkRef.current.contains(event.target as Node)
      ) {
        setIsTooltipVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* KoinX logo */}
      <div className="py-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3g6sUdIrEyVHp5x7Dcb8SiA4DRCu_1UcT_w&s"
          alt="KoinX Logo"
          className="h-8"
        />
      </div>

      {/* Separator line */}
      <div className="border-b border-gray-200 w-full -mx-4"></div>
      {/* Tax Harvesting section */}
      <div className="py-6 relative">
        {/* Title and link layout */}
        <div className="flex items-baseline">
          <h1 className="text-3xl font-bold text-gray-800">Tax Harvesting</h1>

          <div className="relative ml-4">
            <a
              ref={linkRef}
              href="#"
              className="text-blue-500 hover:text-blue-700 text-base"
              onClick={(e) => {
                e.preventDefault();
                setIsTooltipVisible(!isTooltipVisible);
              }}
              onMouseEnter={() => setIsTooltipVisible(true)}
            >
              How it works?
            </a>

            {/* Tooltip/dialog box */}
            {isTooltipVisible && (
              <div
                ref={tooltipRef}
                className="absolute z-10 top-full mt-2 right-0 w-80 text-white bg-gray-900 rounded-md shadow-lg p-4"
                onMouseLeave={() => setIsTooltipVisible(false)}
              >
                <div className="absolute -top-2 right-12 transform w-4 h-4 rotate-45 bg-gray-900"></div>
                <p className="text-sm mb-2">
                  Lorem ipsum dolor sit amet consectetur. Euismod id posuere
                  nibh semper mattis scelerisque tellus. Vel mattis diam duis
                  morbi tellus dui consectetur.
                </p>
                <a href="#" className="text-blue-400 text-sm hover:underline">
                  Know More
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
