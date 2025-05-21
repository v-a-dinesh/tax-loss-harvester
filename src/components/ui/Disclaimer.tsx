import React, { useState, useEffect } from "react";

interface DisclaimerProps {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

const Disclaimer: React.FC<DisclaimerProps> = ({
  isOpen: propIsOpen,
  setIsOpen: propSetIsOpen,
}) => {
  // Local state for when component is uncontrolled
  const [localIsOpen, setLocalIsOpen] = useState(false);

  // Determine if we're using controlled or uncontrolled mode
  const isControlled = propIsOpen !== undefined && propSetIsOpen !== undefined;
  const isOpen = isControlled ? propIsOpen : localIsOpen;

  // Toggle function that respects controlled/uncontrolled mode
  const toggleOpen = () => {
    if (isControlled) {
      propSetIsOpen!(!propIsOpen);
    } else {
      setLocalIsOpen(!localIsOpen);
    }
  };

  // If controlled and isOpen prop changes, sync with local state (for animation purposes)
  useEffect(() => {
    if (isControlled) {
      setLocalIsOpen(propIsOpen);
    }
  }, [isControlled, propIsOpen]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-6">
      <div
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={toggleOpen}
      >
        <div className="flex items-center">
          <svg
            className="w-5 h-5 text-blue-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-medium">Important Notes & Disclaimers</span>
        </div>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 pt-2 border-t border-gray-200">
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              Tax-loss harvesting is currently not allowed under Indian tax
              regulations. Please consult your tax advisor before making any
              decisions.
            </li>
            <li>
              Tax harvesting does not apply to derivatives or futures. These are
              handled separately as business income under tax rules.
            </li>
            <li>
              Price and market value data is fetched from Coingecko, not from
              individual exchanges. As a result, values may slightly differ from
              the ones on your exchange.
            </li>
            <li>
              Some countries do not have a short-term / long-term bifurcation.
              For now, we are calculating everything as long-term.
            </li>
            <li>
              Only realized losses are considered for harvesting. Unrealized
              losses in held assets are not counted.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
