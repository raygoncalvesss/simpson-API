'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { getCharacterById, SimpsonsCharacter } from '@/lib/api';
import CharacterCard from '@/components/CharacterCard';

export default function CharacterDetailPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState<SimpsonsCharacter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCharacter = async () => {
      if (!id) {
        notFound();
        return;
      }

      try {
        setLoading(true);
        setError(false);
        
        // Primeiro, tentar carregar do localStorage
        const savedCharacters = localStorage.getItem('simpsons_characters');
        if (savedCharacters) {
          try {
            const characters = JSON.parse(savedCharacters);
            const foundCharacter = characters.find((char: SimpsonsCharacter) => 
              char.id === parseInt(id as string)
            );
            if (foundCharacter) {
              setCharacter(foundCharacter);
              setLoading(false);
              return;
            }
          } catch (error) {
            console.error('Erro ao carregar do localStorage:', error);
          }
        }

        // Se não encontrar no localStorage, buscar na API
        const data = await getCharacterById(id as string);
        setCharacter(data);
        toast.success('Personagem carregado com sucesso!');
      } catch (error) {
        setError(true);
        toast.error('Erro ao carregar personagem. Verifique se o ID existe.');
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-xl text-gray-600">Carregando personagem...</p>
        </div>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-8xl mb-6">😞</div>
          <h1 className="text-3xl font-bold text-red-800 mb-4">
            Personagem não encontrado
          </h1>
          <p className="text-gray-600 mb-8">
            O personagem com ID &ldquo;{id}&rdquo; não existe ou ocorreu um erro ao carregar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/characters"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              ← Ver Todos os Personagens
            </Link>
            <Link
              href="/"
              className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              🏠 Voltar ao Início
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span>→</span>
            <Link href="/characters" className="hover:text-blue-600 transition-colors">
              Personagens
            </Link>
            <span>→</span>
            <span className="text-gray-800 font-semibold">{character.name}</span>
          </div>
        </nav>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-2">
            {character.name}
          </h1>
          <p className="text-xl text-gray-600">
            Detalhes completos do personagem
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Imagem Principal */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-yellow-400">
                <div className="relative h-96 bg-gradient-to-br from-yellow-200 to-orange-200">
                  {character.image ? (
                    <Image
                      src={character.image}
                      alt={character.name}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                        {character.name?.charAt(0) || '?'}
                      </div>
                    </div>
                  )}
                  
                  {/* Badge de Status */}
                  {character.status && (
                    <div className="absolute top-4 right-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                        character.status === 'Alive' ? 'bg-green-500 text-white' :
                        character.status === 'Dead' ? 'bg-red-500 text-white' :
                        'bg-gray-500 text-white'
                      }`}>
                        {character.status}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Compacto */}
              <div className="lg:hidden">
                <CharacterCard character={character} showDetails />
              </div>
            </div>

            {/* Informações Detalhadas */}
            <div className="space-y-6">
              {/* Informações Básicas */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-blue-400">
                <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center">
                  📋 Informações Básicas
                </h2>
                <div className="space-y-4">
                  {[
                    { label: 'ID', value: character.id },
                    { label: 'Nome', value: character.name },
                    { label: 'Gênero', value: character.gender },
                    { label: 'Status', value: character.status },
                    { label: 'Espécie', value: character.species },
                    { label: 'Tipo', value: character.type },
                    { label: 'Ocupação', value: character.occupation },
                  ].map((item, index) => (
                    item.value && (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-3">
                        <span className="font-bold text-gray-800 sm:w-32 mb-1 sm:mb-0">
                          {item.label}:
                        </span>
                        <span className="text-gray-700 break-words">
                          {item.value}
                        </span>
                      </div>
                    )
                  ))}
                </div>
              </div>

              {/* Localização */}
              {(character.location?.name || character.origin?.name) && (
                <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-green-400">
                  <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center">
                    🌍 Localização
                  </h2>
                  <div className="space-y-4">
                    {character.location?.name && (
                      <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-3">
                        <span className="font-bold text-gray-800 sm:w-32 mb-1 sm:mb-0">
                          Atual:
                        </span>
                        <span className="text-gray-700">
                          {character.location.name}
                        </span>
                      </div>
                    )}
                    {character.origin?.name && (
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <span className="font-bold text-gray-800 sm:w-32 mb-1 sm:mb-0">
                          Origem:
                        </span>
                        <span className="text-gray-700">
                          {character.origin.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Episódios */}
              {character.episode && character.episode.length > 0 && (
                <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-purple-400">
                  <h2 className="text-3xl font-bold text-purple-800 mb-6 flex items-center">
                    📺 Episódios
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {character.episode.slice(0, 10).map((episode, index) => (
                      <span 
                        key={index}
                        className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold"
                      >
                        {episode}
                      </span>
                    ))}
                    {character.episode.length > 10 && (
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">
                        +{character.episode.length - 10} mais
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Metadados */}
              {character.created && (
                <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-gray-400">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    ⏰ Metadados
                  </h2>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-bold text-gray-800 sm:w-32 mb-1 sm:mb-0">
                        Criado em:
                      </span>
                      <span className="text-gray-700">
                        {new Date(character.created).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Botões de Navegação */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/characters"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              ← Ver Todos os Personagens
            </Link>
            <Link
              href="/"
              className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              🏠 Voltar ao Início
            </Link>
            <Link
              href="/characters/create"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              ➕ Criar Personagem
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}