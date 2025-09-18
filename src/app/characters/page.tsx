'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { getCharacters, SimpsonsCharacter } from '@/lib/api';
import CharacterCard from '@/components/CharacterCard';

export default function CharactersPage() {
  const [characters, setCharacters] = useState<SimpsonsCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const data = await getCharacters();
        setCharacters(data);
        toast.success(`Carregados ${data.length} personagens!`);
      } catch (error) {
        toast.error('Erro ao carregar personagens. Tente novamente!');
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  // Filtrar personagens baseado na busca e status
  const filteredCharacters = characters.filter(character => {
    const matchesSearch = character.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const matchesStatus = statusFilter === 'all' || character.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Salvar dados no localStorage para otimização
  useEffect(() => {
    if (characters.length > 0) {
      localStorage.setItem('simpsons_characters', JSON.stringify(characters));
    }
  }, [characters]);

  // Carregar dados do localStorage se disponível
  useEffect(() => {
    const savedCharacters = localStorage.getItem('simpsons_characters');
    if (savedCharacters && characters.length === 0) {
      try {
        const parsed = JSON.parse(savedCharacters);
        setCharacters(parsed);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados salvos:', error);
      }
    }
  }, [characters.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
            👥 Personagens dos Simpsons
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Explore todos os personagens da famosa série animada
          </p>

          {/* Botões de Navegação */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link
              href="/"
              className="bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-colors"
            >
              🏠 Home
            </Link>
            <Link
              href="/apiinfo"
              className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
            >
              📖 API Info
            </Link>
            <Link
              href="/characters/create"
              className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
            >
              ➕ Criar Personagem
            </Link>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-yellow-200">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Busca por Nome */}
            <div>
              <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-2">
                🔍 Buscar por nome:
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Digite o nome do personagem..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Filtro por Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
                ⚡ Filtrar por status:
              </label>
              <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              >
                <option value="all">Todos os status</option>
                <option value="Alive">Vivo</option>
                <option value="Dead">Morto</option>
                <option value="unknown">Desconhecido</option>
              </select>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
              Total: {characters.length}
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
              Filtrados: {filteredCharacters.length}
            </span>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Carregando personagens...</p>
          </div>
        )}

        {/* Lista de Personagens */}
        {!loading && filteredCharacters.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCharacters.map((character) => (
              <CharacterCard 
                key={character.id} 
                character={character}
              />
            ))}
          </div>
        )}

        {/* Nenhum resultado */}
        {!loading && filteredCharacters.length === 0 && characters.length > 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              Nenhum personagem encontrado
            </h3>
            <p className="text-gray-600 mb-6">
              Tente ajustar os filtros de busca ou criar um novo personagem.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        )}

        {/* Erro no carregamento */}
        {!loading && characters.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              Erro ao carregar personagens
            </h3>
            <p className="text-gray-600 mb-6">
              Não foi possível conectar com a API. Verifique sua conexão.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}