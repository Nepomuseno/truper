import React from "react";
import "./PokemonModal.css";
import type { Pokemon } from "@/interfaces/pokemon";

interface PokemonModalProps {
  pokemon: Pokemon | null;
  onClose: () => void;
}

export const PokemonModal: React.FC<PokemonModalProps> = ({ pokemon, onClose }) => {
  if (!pokemon) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>{pokemon.name}</h2>
        <div className="modal-body">
          <div className="images">
            {pokemon.sprite?.front ? (
              <img
                src={pokemon.sprite.front}
                alt={`${pokemon.name} frontal`}
                className="sprite"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            ) : (
              <span className="no-img">Sin imagen</span>
            )}
            {pokemon.sprite?.back ? (
              <img
                src={pokemon.sprite.back}
                alt={`${pokemon.name} trasero`}
                className="sprite"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            ) : (
              <span className="no-img">Sin imagen</span>
            )}
            {/* <img src={pokemon.sprite.back} alt={pokemon.name} className="modal-sprite" /> */}
          </div>
          <div className="modal-info">
            <p>
              <strong>ID:</strong> {pokemon.id}
            </p>
            <p>
              <strong>Peso:</strong> {pokemon.weight / 10} kg
            </p>
            <p>
              <strong>Altura:</strong> {pokemon.height / 10} m
            </p>
            <p>
              <strong>Movimientos:</strong> {pokemon.moves.slice(0, 5).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
