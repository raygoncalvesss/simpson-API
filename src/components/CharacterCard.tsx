'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SimpsonsCharacter } from '@/lib/api';

interface CharacterCardProps {
  character: SimpsonsCharacter;
  showDetails?: boolean;
}

const CharacterCard = ({ character, showDetails = false }: CharacterCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:border-yellow-400 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 overflow-hidden">
      {/* Imagem do Personagem */}
      <div className="relative h-48 bg-gradient-to-br from-yellow-200 to-orange-200">
        {character.image ? (
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {character.name?.charAt(0) || '?'}
            </div>
          </div>
        )}
        
        {/* Badge de Status */}
        {character.status && (
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
              character.status === 'Alive' ? 'bg-green-100 text-green-800' :
              character.status === 'Dead' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {character.status}
            </span>
          </div>
        )}
      </div>

      {/* Conteúdo do Card */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-blue-800 mb-2 line-clamp-2">
          {character.name}
        </h3>
        
        <div className="space-y-2 text-sm text-gray-600">
          {character.gender && (
            <div className="flex items-center">
              <span className="font-semibold w-20">Gênero:</span>
              <span>{character.gender}</span>
            </div>
          )}
          
          {character.occupation && (
            <div className="flex items-center">
              <span className="font-semibold w-20">Ocupação:</span>
              <span className="line-clamp-1">{character.occupation}</span>
            </div>
          )}
          
          {character.species && (
            <div className="flex items-center">
              <span className="font-semibold w-20">Espécie:</span>
              <span>{character.species}</span>
            </div>
          )}

          {showDetails && character.location?.name && (
            <div className="flex items-center">
              <span className="font-semibold w-20">Localização:</span>
              <span className="line-clamp-1">{character.location.name}</span>
            </div>
          )}
        </div>

        {/* Botão de Ação */}
        <div className="mt-6">
          {showDetails ? (
            <div className="flex space-x-3">
              <Link
                href="/characters"
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-600 transition-colors text-center"
              >
                ← Voltar
              </Link>
              <Link
                href="/"
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-center"
              >
                🏠 Home
              </Link>
            </div>
          ) : (
            <Link
              href={`/characters/${character.id}`}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-center block"
            >
              Ver Detalhes →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;