import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import Card from './Card';
import { Pokemon } from '../SearchResultList/SearchResultList';

const mockPokemon: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  sprites: 'url_to_bulbasaur_image',
  front_default: 'url_to_bulbasaur_image',
};

describe('Card', () => {
  it('calls onClick when the card is clicked', () => {
    const handleClick = vi.fn();
    render(<Card data={mockPokemon} onClick={handleClick} />);

    const card = screen.getByText('bulbasaur').parentElement;
    fireEvent.click(card!);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
