import React from 'react';
import { Pokemon } from '../SearchResultList/SearchResultList';
import './Card.css';

interface CardProps {
  data: Pokemon;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ data, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <h2>{data.name}</h2>
      <img src={data.sprites.front_default} alt={data.name} />
    </div>
  );
};

export default Card;
