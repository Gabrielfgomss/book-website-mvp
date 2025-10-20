import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Target, Heart, Users } from "lucide-react"

export const About = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Obras Autorais",
      description: "Coleção cuidadosamente selecionada de livros autorais de diversos gêneros e estilos literários.",
    },
    {
      icon: Target,
      title: "Missão",
      description:
        "Conectar leitores apaixonados com autores independentes, promovendo a literatura autoral brasileira.",
    },
    {
      icon: Heart,
      title: "Paixão pela Leitura",
      description: "Acreditamos no poder transformador da leitura e no valor das histórias bem contadas.",
    },
    {
      icon: Users,
      title: "Comunidade",
      description: "Construindo uma comunidade de leitores e escritores que valorizam a literatura de qualidade.",
    },
  ]

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Sobre o projeto</h1>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
            O projeto nasceu do desejo de criar um espaço dedicado a compartilhar obras com leitores que procuram textos de
            qualidade e relevância. Acreditamos que cada autor tem uma voz única e histórias valiosas a compartilhar com o mundo.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
            Nossa plataforma foi desenvolvida para facilitar o acesso a obras de qualidade, permitindo que leitores
            descubram novos autores e que autores independentes alcancem seu público de forma direta e autêntica.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Nossa Visão</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Queremos aproximar leitores de autores independentes, aumentando o engajamento da comunidade
                local para promover a literatura de qualidade e disseminar o conhecimento.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Estamos constantemente aprimorando nossa plataforma para oferecer a melhor experiência possível, tanto
                para leitores quanto para autores. Junte-se a nós nessa jornada literária!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
