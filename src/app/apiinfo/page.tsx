import Link from 'next/link';

export default function APIInfo() {
  const apiAttributes = [
    { name: 'id', type: 'number', description: 'Identificador único do personagem' },
    { name: 'name', type: 'string', description: 'Nome completo do personagem' },
    { name: 'image', type: 'string', description: 'URL da imagem do personagem' },
    { name: 'gender', type: 'string', description: 'Gênero do personagem (Male/Female)' },
    { name: 'status', type: 'string', description: 'Status do personagem (Alive/Dead/unknown)' },
    { name: 'occupation', type: 'string', description: 'Ocupação ou profissão do personagem' },
    { name: 'location', type: 'object', description: 'Local atual do personagem' },
    { name: 'origin', type: 'object', description: 'Local de origem do personagem' },
    { name: 'species', type: 'string', description: 'Espécie do personagem' },
    { name: 'type', type: 'string', description: 'Tipo ou subespécie do personagem' },
    { name: 'episode', type: 'array', description: 'Lista de episódios onde aparece' },
    { name: 'created', type: 'string', description: 'Data de criação do registro' },
  ];

  const endpoints = [
    { method: 'GET', route: '/characters', description: 'Buscar todos os personagens' },
    { method: 'GET', route: '/characters/{id}', description: 'Buscar personagem específico por ID' },
    { method: 'POST', route: '/characters', description: 'Criar novo personagem (simulado)' },
    { method: 'PUT', route: '/characters/{id}', description: 'Atualizar personagem existente' },
    { method: 'DELETE', route: '/characters/{id}', description: 'Deletar personagem' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-blue-500 mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                📚 Documentação da API
              </h1>
              <p className="text-xl opacity-90">
                Sample APIs - The Simpsons Characters
              </p>
            </div>

            <div className="p-8">
              {/* Informações Básicas */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-200">
                  <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
                    🌐 Informações da API
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <strong className="text-gray-800">Nome:</strong>
                      <p className="text-blue-700">Sample APIs - Simpsons Characters</p>
                    </div>
                    <div>
                      <strong className="text-gray-800">URL Base:</strong>
                      <code className="block bg-gray-100 p-2 rounded mt-1 text-sm break-all">
                        https://api.sampleapis.com/simpsons
                      </code>
                    </div>
                    <div>
                      <strong className="text-gray-800">Endpoint Principal:</strong>
                      <code className="block bg-gray-100 p-2 rounded mt-1 text-sm">
                        /characters
                      </code>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
                  <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
                    📖 Sobre a API
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    A Sample APIs é uma coleção de APIs gratuitas para desenvolvedores 
                    testarem e aprenderem. A API dos Simpsons fornece dados sobre os 
                    personagens da famosa série animada, incluindo informações como 
                    nome, imagem, status, ocupação e muito mais.
                  </p>
                  <div className="mt-4">
                    <a 
                      href="https://sampleapis.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      🔗 Documentação Oficial
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Endpoints */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
                  🛠️ Endpoints Disponíveis
                </h2>
                <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-300">
                          <th className="text-left py-3 px-4 font-bold text-gray-800">Método</th>
                          <th className="text-left py-3 px-4 font-bold text-gray-800">Rota</th>
                          <th className="text-left py-3 px-4 font-bold text-gray-800">Descrição</th>
                        </tr>
                      </thead>
                      <tbody>
                        {endpoints.map((endpoint, index) => (
                          <tr key={index} className="border-b border-gray-200 hover:bg-white transition-colors">
                            <td className="py-3 px-4">
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold $${
                                endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                                endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                                endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {endpoint.method}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                {endpoint.route}
                              </code>
                            </td>
                            <td className="py-3 px-4 text-gray-700">
                              {endpoint.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Atributos da Resposta */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
                  📋 Atributos da Resposta
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {apiAttributes.map((attr, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-blue-300 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <code className="text-lg font-bold text-blue-600">{attr.name}</code>
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                          {attr.type}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{attr.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exemplo de Uso */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
                  💻 Exemplo de Resposta
                </h2>
                <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`{
  "id": 1,
  "name": "Homer Simpson",
  "image": "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png",
  "gender": "Male",
  "status": "Alive",
  "occupation": "Safety Inspector",
  "location": {
    "name": "Springfield",
    "url": ""
  },
  "origin": {
    "name": "Springfield",
    "url": ""
  },
  "species": "Human",
  "type": "",
  "episode": ["S01E01", "S01E02", "..."],
  "created": "2017-11-04T18:48:46.250Z"
}`}
                  </pre>
                </div>
              </div>

              {/* Botões de Navegação */}
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="/"
                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  🏠 Voltar ao Início
                </Link>
                <Link 
                  href="/characters"
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  👥 Ver Personagens
                </Link>
                <Link 
                  href="/characters/create"
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  ➕ Criar Personagem
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}