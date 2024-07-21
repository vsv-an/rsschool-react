import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import PokemonInfo from './PokemonInfo';

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
  sprites: { front_default: 'url_to_bulbasaur_image' },
};

describe('PokemonInfo', () => {
  it('renders the Pokémon details correctly', () => {
    render(<PokemonInfo pokemon={mockPokemon} onClose={vi.fn()} />);

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByAltText('bulbasaur')).toHaveAttribute(
      'src',
      'url_to_bulbasaur_image',
    );
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const handleClose = vi.fn();
    render(<PokemonInfo pokemon={mockPokemon} onClose={handleClose} />);

    const closeButton = screen.getByText('X');
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking outside the card', () => {
    const handleClose = vi.fn();
    render(<PokemonInfo pokemon={mockPokemon} onClose={handleClose} />);

    fireEvent.mouseDown(document);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking inside the card', () => {
    const handleClose = vi.fn();
    render(<PokemonInfo pokemon={mockPokemon} onClose={handleClose} />);

    const card = screen.getByText('bulbasaur');
    fireEvent.mouseDown(card);

    expect(handleClose).not.toHaveBeenCalled();
  });
});
