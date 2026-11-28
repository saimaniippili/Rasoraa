import React from 'react';
import { MenuItem, OFFICIAL_DISHES } from '../../data/menuData';
import { ThreeBookViewer } from './ThreeBookViewer';
import './rasoraa-book.css';

interface RasoraaBookProps {
  onSelectDish: (dish: MenuItem) => void;
}

export const RasoraaBook: React.FC<RasoraaBookProps> = ({ onSelectDish }) => {
  return (
    <div className="w-full">
      <ThreeBookViewer
        onSelectDish={(dishName) => {
          const found = OFFICIAL_DISHES.find(
            (d) => d.name.toLowerCase() === dishName.toLowerCase()
          );
          if (found) onSelectDish(found);
        }}
      />
    </div>
  );
};
