import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-50 to-purple-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Personagem dos Simpsons perdido */}
        <div className="mb-8 relative">
          <div className="text-8xl md:text-9xl mb-4 animate-bounce">
            🍩
          </div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="text-6xl animate-spin-slow">
              😵‍💫
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-yellow-400">
          <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-4">
            D&apos;oh! 404
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Página não encontrada 😢
          </h2>
          
          <div className="space-y-4 text-gray-600 text-lg leading-relaxed mb-8">
            <p>
              Parece que você se perdeu em Springfield! 🏙️
            </p>
            <p>
              A página que você está procurando não existe ou foi movida para outro lugar.
              Que tal voltar para a área segura da cidade?
            </p>
          </div>

          {/* Estatísticas divertidas */}
          <div className="bg-yellow-50 rounded-2xl p-6 mb-8 border-2 border-yellow-200">
            <h3 className="text-xl font-bold text-yellow-800 mb-4">
              🎭 Fatos divertidos dos Simpsons:
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🍺</span>
                <span>Homer ama cerveja Duff</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🎷</span>
                <span>Lisa toca saxofone</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🛹</span>
                <span>Bart é um rebelde</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🧶</span>
                <span>Marge tem cabelo azul</span>
              </div>
            </div>
          </div>

          {/* Botões de Navegação */}
          <div className="space-y-4">
            <Link
              href="/"
              className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              🏠 Voltar para Springfield (Home)
            </Link>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/characters"
                className="block bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                👥 Ver Personagens
              </Link>
              
              <Link
                href="/apiinfo"
                className="block bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                📖 API Info
              </Link>
            </div>
          </div>

          {/* Dica técnica */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>💡 Dica:</strong> Verifique a URL digitada ou use a navegação acima para encontrar o que procura.
            </p>
          </div>
        </div>

        {/* Footer divertido */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            &ldquo;Woo-hoo!&rdquo; - Homer Simpson, quando encontra o que procura 🎉
          </p>
        </div>
      </div>
    </div>
  );
}