'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { createCharacter, SimpsonsCharacter } from '@/lib/api';

interface FormData {
  name: string;
  image: string;
  gender: string;
  status: string;
  occupation: string;
  species: string;
  type: string;
  location: string;
  origin: string;
}

export default function CreateCharacterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    image: '',
    gender: '',
    status: 'Alive',
    occupation: '',
    species: 'Human',
    type: '',
    location: '',
    origin: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'URL da imagem é obrigatória';
    } else if (!isValidUrl(formData.image)) {
      newErrors.image = 'URL da imagem inválida';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gênero é obrigatório';
    }

    if (!formData.occupation.trim()) {
      newErrors.occupation = 'Ocupação é obrigatória';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Localização é obrigatória';
    }

    if (!formData.origin.trim()) {
      newErrors.origin = 'Origem é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpar erro quando o usuário começar a digitar
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário');
      return;
    }

    setLoading(true);

    try {
      // Simular criação (a API pode não aceitar POST real)
      const newCharacter: Omit<SimpsonsCharacter, 'id'> = {
        name: formData.name,
        image: formData.image,
        gender: formData.gender,
        status: formData.status,
        occupation: formData.occupation,
        species: formData.species,
        type: formData.type,
        location: {
          name: formData.location,
          url: ''
        },
        origin: {
          name: formData.origin,
          url: ''
        },
        episode: [],
        created: new Date().toISOString()
      };

      // Tentar criar via API (pode falhar)
      try {
        await createCharacter(newCharacter);
        toast.success('Personagem criado com sucesso!');
      } catch (apiError) {
        // Se a API falhar, simular criação local
        console.warn('API não suporta criação, simulando localmente:', apiError);
        
        // Gerar ID simulado
        const simulatedCharacter: SimpsonsCharacter = {
          ...newCharacter,
          id: Date.now() // ID baseado em timestamp
        };

        // Salvar no localStorage
        const savedCharacters = localStorage.getItem('simpsons_characters');
        let characters: SimpsonsCharacter[] = [];
        
        if (savedCharacters) {
          try {
            characters = JSON.parse(savedCharacters);
          } catch (error) {
            console.error('Erro ao carregar personagens salvos:', error);
          }
        }

        characters.unshift(simulatedCharacter); // Adicionar no início
        localStorage.setItem('simpsons_characters', JSON.stringify(characters));
        
        toast.success('Personagem criado localmente com sucesso!');
      }

      // Redirecionar para a lista de personagens
      setTimeout(() => {
        router.push('/characters');
      }, 1500);

    } catch (error) {
      toast.error('Erro ao criar personagem. Tente novamente.');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
              ➕ Criar Novo Personagem
            </h1>
            <p className="text-xl text-gray-600">
              Adicione um novo personagem à família Simpson
            </p>
          </div>

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
              <span className="text-gray-800 font-semibold">Criar Novo</span>
            </div>
          </nav>

          {/* Formulário */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-green-400">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 text-center">
              <h2 className="text-2xl font-bold">
                🎭 Formulário de Criação
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Nome */}
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                    👤 Nome do Personagem *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ex: Bart Simpson"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                      errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Gênero */}
                <div>
                  <label htmlFor="gender" className="block text-sm font-bold text-gray-700 mb-2">
                    ⚧️ Gênero *
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                      errors.gender ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                    }`}
                  >
                    <option value="">Selecione o gênero</option>
                    <option value="Male">Masculino</option>
                    <option value="Female">Feminino</option>
                    <option value="Other">Outro</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                </div>

                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-bold text-gray-700 mb-2">
                    ⚡ Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                  >
                    <option value="Alive">Vivo</option>
                    <option value="Dead">Morto</option>
                    <option value="unknown">Desconhecido</option>
                  </select>
                </div>

                {/* Espécie */}
                <div>
                  <label htmlFor="species" className="block text-sm font-bold text-gray-700 mb-2">
                    🧬 Espécie
                  </label>
                  <select
                    id="species"
                    name="species"
                    value={formData.species}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                  >
                    <option value="Human">Humano</option>
                    <option value="Animal">Animal</option>
                    <option value="Robot">Robô</option>
                    <option value="Alien">Alienígena</option>
                    <option value="Other">Outro</option>
                  </select>
                </div>

                {/* Ocupação */}
                <div>
                  <label htmlFor="occupation" className="block text-sm font-bold text-gray-700 mb-2">
                    💼 Ocupação *
                  </label>
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    placeholder="Ex: Estudante, Vendedor de Quadrinhos"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                      errors.occupation ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                    }`}
                  />
                  {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
                </div>

                {/* Tipo */}
                <div>
                  <label htmlFor="type" className="block text-sm font-bold text-gray-700 mb-2">
                    🏷️ Tipo/Subespécie
                  </label>
                  <input
                    type="text"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    placeholder="Ex: Criança, Adulto, etc."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Localização */}
                <div>
                  <label htmlFor="location" className="block text-sm font-bold text-gray-700 mb-2">
                    📍 Localização Atual *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Ex: Springfield"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                      errors.location ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                    }`}
                  />
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>

                {/* Origem */}
                <div>
                  <label htmlFor="origin" className="block text-sm font-bold text-gray-700 mb-2">
                    🎯 Origem *
                  </label>
                  <input
                    type="text"
                    id="origin"
                    name="origin"
                    value={formData.origin}
                    onChange={handleInputChange}
                    placeholder="Ex: Springfield"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                      errors.origin ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                    }`}
                  />
                  {errors.origin && <p className="text-red-500 text-sm mt-1">{errors.origin}</p>}
                </div>
              </div>

              {/* URL da Imagem */}
              <div>
                <label htmlFor="image" className="block text-sm font-bold text-gray-700 mb-2">
                  🖼️ URL da Imagem *
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://exemplo.com/imagem.png"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                    errors.image ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                  }`}
                />
                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                <p className="text-gray-500 text-sm mt-1">
                  💡 Dica: Use uma URL válida de imagem (ex: Unsplash, Google Images)
                </p>
              </div>

              {/* Preview da Imagem */}
              {formData.image && isValidUrl(formData.image) && (
                <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                  <p className="text-sm font-bold text-gray-700 mb-2">👀 Preview da Imagem:</p>
                  <div className="flex justify-center">
                    <div className="relative w-64 h-48">
                      <Image
                        src={formData.image}
                        alt="Preview do personagem"
                        fill
                        className="object-cover rounded-lg border-2 border-gray-300"
                        sizes="256px"
                        onError={() => {
                          toast.error('Erro ao carregar imagem. Verifique a URL.');
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 py-4 px-8 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg transform hover:scale-105 ${
                    loading
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Criando...
                    </span>
                  ) : (
                    '✅ Criar Personagem'
                  )}
                </button>

                <Link
                  href="/characters"
                  className="flex-1 bg-gray-500 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-gray-600 transition-colors text-center"
                >
                  ❌ Cancelar
                </Link>
              </div>

              {/* Nota */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>ℹ️ Nota:</strong> Os campos marcados com * são obrigatórios. 
                  Como esta API é apenas para leitura, o personagem será salvo localmente 
                  e aparecerá apenas neste navegador.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}