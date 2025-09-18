import axios from 'axios';

// Instância do Axios configurada para a API dos Simpsons
export const api = axios.create({
  baseURL: 'https://api.sampleapis.com/simpsons',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tipos TypeScript para os dados da API
export interface SimpsonsCharacter {
  id: number;
  name: string;
  image: string;
  gender?: string;
  status?: string;
  occupation?: string;
  location?: {
    name: string;
    url?: string;
  };
  origin?: {
    name: string;
    url?: string;
  };
  species?: string;
  type?: string;
  episode?: string[];
  created?: string;
}

// Função para buscar todos os personagens
export const getCharacters = async (): Promise<SimpsonsCharacter[]> => {
  try {
    const response = await api.get('/characters');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar personagens:', error);
    throw error;
  }
};

// Função para buscar personagem por ID
export const getCharacterById = async (id: string): Promise<SimpsonsCharacter> => {
  try {
    const response = await api.get(`/characters/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar personagem ${id}:`, error);
    throw error;
  }
};

// Função para criar personagem (simulado)
export const createCharacter = async (character: Omit<SimpsonsCharacter, 'id'>): Promise<SimpsonsCharacter> => {
  try {
    const response = await api.post('/characters', character);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar personagem:', error);
    throw error;
  }
};