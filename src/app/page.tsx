import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-blue-600">
            <div className="bg-blue-600 text-white p-6 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-2">
                🍩 Simpsons API Project
              </h1>
              <p className="text-xl opacity-90">Atividade de Desenvolvimento Web</p>
            </div>

            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Informações do Aluno */}
                <div className="space-y-6">
                  <div className="bg-yellow-100 rounded-2xl p-6 border-2 border-yellow-300">
                    <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
                      🎓 Informações Acadêmicas
                    </h2>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">🏫</span>
                        <div>
                          <p className="font-semibold text-gray-800">Escola:</p>
                          <p className="text-blue-700 text-lg">SENAI</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">📚</span>
                        <div>
                          <p className="font-semibold text-gray-800">Turma:</p>
                          <p className="text-blue-700 text-lg"> TDS 2</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">👨‍🎓</span>
                        <div>
                          <p className="font-semibold text-gray-800">Aluna:</p>
                          <p className="text-blue-700 text-lg font-bold">Rayssa Gonçalves</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Frase Inspiradora */}
                  <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                    <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center">
                      💭 Frase Inspiradora
                    </h3>
                    <blockquote className="text-gray-700 italic text-lg leading-relaxed">
                      &ldquo;A tecnologia move o mundo, mas é a criatividade que o transforma. 
                      Cada linha de código é uma oportunidade de criar algo extraordinário.&rdquo;
                    </blockquote>
                    <cite className="block text-right text-blue-600 font-semibold mt-2">
                      - Filosofia Pessoal
                    </cite>
                  </div>
                </div>

                {/* Foto do Aluno */}
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                    <div className="relative">
                      <Image
                        src="https://avatars.githubusercontent.com/u/158166558?v=4"
                        alt="Foto do aluno João Silva Santos"
                        width={288}
                        height={288}
                        className="w-72 h-72 rounded-full border-4 border-white shadow-xl object-cover"
                        priority
                      />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-blue-800 mb-2">
                      Desenvolvedor em Formação
                    </h3>
                    <p className="text-gray-600">
                      Apaixonada por tecnologia e inovação
                    </p>
                  </div>
                </div>
              </div>

              {/* Botões de Navegação */}
              <div className="mt-12 border-t-2 border-gray-200 pt-8">
                <h3 className="text-2xl font-bold text-center text-blue-800 mb-6">
                  🚀 Explore o Projeto
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link 
                    href="/apiinfo"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl text-center font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    📖 Documentação da API
                  </Link>
                  <Link 
                    href="/characters"
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl text-center font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    👥 Ver Personagens
                  </Link>
                  <Link 
                    href="/characters/create"
                    className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl text-center font-semibold hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    ➕ Criar Personagem
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Tecnologias Utilizadas */}
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-200">
            <h3 className="text-xl font-bold text-center text-blue-800 mb-4">
              🛠️ Tecnologias Utilizadas
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['Next.js 15', 'React', 'TypeScript', 'Tailwind CSS', 'Axios', 'React Toastify'].map((tech) => (
                <span 
                  key={tech}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold border border-blue-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
