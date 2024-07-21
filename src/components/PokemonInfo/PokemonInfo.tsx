import React, { useCallback, useEffect, useRef } from 'react';
import { Pokemon } from '../SearchResultList/SearchResultList';
import './PokemonInfo.css';

interface PokemonInfoProps {
  pokemon: Pokemon;
  onClose: () => void;
}

const PokemonInfo: React.FC<PokemonInfoProps> = ({ pokemon, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="pokemon-info-container">
      <div className="pokemon-info-card" ref={cardRef}>
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>{pokemon.name}</h2>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p>{pokemon.id}</p>
      </div>
    </div>
  );
};

export default PokemonInfo;
