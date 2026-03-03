import React from 'react';
import './Cell.css';

export type CellValue = 'black' | 'white' | null;

interface CellProps {
  /**
   * The current value of the cell: black disc, white disc, or empty.
   */
  value: CellValue;
  /**
   * Callback when the cell is clicked.
   */
  onClick?: () => void;
  /**
   * Optional: Disable interaction (e.g., game over or CPU turn).
   */
  disabled?: boolean;
}

export const Cell: React.FC<CellProps> = ({ value, onClick, disabled = false }) => {
  return (
    <div
      className={`cell ${disabled ? 'disabled' : ''}`}
      onClick={!disabled ? onClick : undefined}
      role="button"
      tabIndex={0}
      aria-label={`Cell ${value ? value : 'empty'}`}
    >
      {value && <div className={`disc ${value}`} />}
    </div>
  );
};
