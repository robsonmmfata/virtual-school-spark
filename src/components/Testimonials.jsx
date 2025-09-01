import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from "lucide-react";

// Para o carrossel, você precisa ter a biblioteca react-slick instalada.
// Caso ainda não tenha, use o comando:
// npm install react-slick slick-carousel
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Importe as imagens que você quer usar nos depoimentos
// Lembre-se de colocar suas imagens na pasta src/assets
import student1 from '../assets/aluna1.jpg';
import student2 from '../assets/aluna2.jpg';
import student3 from '../assets/aluna3.jpg';

// i18n
import { useTranslation } from 'react-i18next';

const testimonialsData = (t) => [
  {
    id: 1,
    foto: student1,
    nome: t('testimonials.student1.name'),
    tipo: t('testimonials.student1.role'),
    feedback: t('testimonials.student1.feedback'),
  },
  {
    id: 2,
    foto: student2,
    nome: t('testimonials.student2.name'),
    tipo: t('testimonials.student2.role'),
    feedback: t('testimonials.student2.feedback'),
  },
  {
    id: 3,
    foto: student3,
    nome: t('testimonials.student3.name'),
    tipo: t('testimonials.student3.role'),
    feedback: t('testimonials.student3.feedback'),
  },
  // Adicione mais depoimentos aqui
];

const Testimonials = () => {
  const { t } = useTranslation();

  const settings = {
    dots: true, // Mostra os pontos de navegação
    infinite: true, // Permite que o carrossel volte ao início
    speed: 500, // Velocidade da animação (em milissegundos)
    slidesToShow: 1, // Mostra 1 depoimento por vez
    slidesToScroll: 1, // Rola 1 depoimento por vez
    autoplay: true, // Rola automaticamente
    autoplaySpeed: 5000, // Tempo de exibição de cada depoimento (5 segundos)
    pauseOnHover: true, // Pausa o carrossel se o usuário passar o mouse por cima
  };

  return (
    <section id="depoimentos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <Slider {...settings}>
          {testimonialsData(t).map((depoimento) => (
            <div key={depoimento.id} className="px-4">
              <Card className="max-w-3xl mx-auto shadow-elegant border-border/50">
                <CardContent className="p-8 space-y-4 text-center">
                  <img
                    src={depoimento.foto}
                    alt={depoimento.nome}
                    className="w-24 h-24 object-cover rounded-full mx-auto border-4 border-primary shadow-lg"
                  />
                  <h3 className="text-xl font-semibold text-foreground">{depoimento.nome}</h3>
                  <p className="text-primary font-medium">{depoimento.tipo}</p>
                  <div className="flex justify-center text-education-orange">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">
                    "{depoimento.feedback}"
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
