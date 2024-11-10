
import { Heart, Shield, Search, Users } from 'lucide-react'

export default function Page() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Sobre Nosotros
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Conectamos familias con cuidadores confiables para crear experiencias de cuidado excepcionales.
          </p>
        </div>

        <div className="mt-20">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Nuestro Impacto</h3>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white shadow rounded-lg p-6 text-center">
                <p className="text-4xl font-extrabold text-blue-600">{stat.value}</p>
                <p className="mt-2 text-lg font-medium text-gray-500">{stat.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Lo que dicen nuestros usuarios</h3>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white shadow rounded-lg p-6">
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                <p className="mt-4 font-medium text-gray-900">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    name: 'Cuidadores Verificados',
    description: 'Todos nuestros cuidadores pasan por un riguroso proceso de verificación de antecedentes para garantizar la seguridad de tu familia.',
    icon: Shield,
  },
  {
    name: 'Búsqueda Personalizada',
    description: 'Encuentra el cuidador perfecto con nuestros filtros avanzados que se adaptan a tus necesidades específicas.',
    icon: Search,
  },
  {
    name: 'Comunidad de Confianza',
    description: 'Únete a una comunidad de familias y cuidadores que comparten tus valores y prioridades.',
    icon: Users,
  },
  {
    name: 'Cuidado con Amor',
    description: 'Nuestros cuidadores no solo están calificados, sino que también están apasionados por proporcionar un cuidado amoroso y atento.',
    icon: Heart,
  },
]

const stats = [
  { name: 'Familias Atendidas', value: '10,000+' },
  { name: 'Cuidadores Verificados', value: '5,000+' },
  { name: 'Horas de Cuidado', value: '1M+' },
  { name: 'Ciudades', value: '50+' },
]

const testimonials = [
  {
    quote: 'Encontrar una niñera confiable nunca había sido tan fácil. ¡Gracias por hacer nuestra vida más sencilla!',
    author: 'María G., madre de dos',
  },
  {
    quote: 'Como cuidador, esta plataforma me ha permitido conectar con familias maravillosas y hacer lo que amo.',
    author: 'Carlos R., cuidador certificado',
  },
  {
    quote: 'La tranquilidad que siento al dejar a mi madre con un cuidador de esta plataforma no tiene precio.',
    author: 'Laura M., hija cuidadora',
  },
]