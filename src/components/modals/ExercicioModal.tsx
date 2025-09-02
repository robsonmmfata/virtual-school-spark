import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Clock, CheckCircle, XCircle } from "lucide-react";

interface ExercicioModalProps {
  isOpen: boolean;
  onClose: () => void;
  tarefaTitulo: string;
}

interface Pergunta {
  id: number;
  enunciado: string;
  alternativas: string[];
  respostaCorreta: number;
}

const ExercicioModal = ({ isOpen, onClose, tarefaTitulo }: ExercicioModalProps) => {
  const { toast } = useToast();
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostas, setRespostas] = useState<{ [key: number]: string }>({});
  const [respostaSelecionada, setRespostaSelecionada] = useState("");
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [pontuacao, setPontuacao] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(1800); // 30 minutos

  const perguntas: Pergunta[] = [
    {
      id: 1,
      enunciado: "Qual é o vértice da parábola y = x² - 4x + 3?",
      alternativas: ["(2, -1)", "(1, 0)", "(3, 0)", "(-2, 15)", "(0, 3)"],
      respostaCorreta: 0
    },
    {
      id: 2,
      enunciado: "A função f(x) = 2x² - 8x + 6 tem valor mínimo igual a:",
      alternativas: ["-2", "-1", "0", "1", "2"],
      respostaCorreta: 0
    },
    {
      id: 3,
      enunciado: "As raízes da equação x² - 5x + 6 = 0 são:",
      alternativas: ["1 e 6", "2 e 3", "-2 e -3", "5 e 1", "0 e 5"],
      respostaCorreta: 1
    },
    {
      id: 4,
      enunciado: "O discriminante da equação 3x² - 2x + 1 = 0 é:",
      alternativas: ["8", "4", "-8", "0", "12"],
      respostaCorreta: 2
    },
    {
      id: 5,
      enunciado: "A parábola y = -x² + 4x - 3 tem concavidade:",
      alternativas: ["Para cima", "Para baixo", "Indefinida", "Variável", "Nula"],
      respostaCorreta: 1
    }
  ];

  React.useEffect(() => {
    if (isOpen && tempoRestante > 0) {
      const timer = setTimeout(() => {
        setTempoRestante(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (tempoRestante === 0 && !mostrarResultado) {
      finalizarExercicio();
    }
  }, [tempoRestante, isOpen, mostrarResultado]);

  const formatTempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const proximaPergunta = () => {
    if (respostaSelecionada) {
      setRespostas(prev => ({ ...prev, [perguntaAtual]: respostaSelecionada }));
      setRespostaSelecionada("");
      
      if (perguntaAtual < perguntas.length - 1) {
        setPerguntaAtual(prev => prev + 1);
      } else {
        finalizarExercicio();
      }
    } else {
      toast({
        title: "Selecione uma resposta",
        description: "Escolha uma alternativa antes de continuar",
        variant: "destructive"
      });
    }
  };

  const perguntaAnterior = () => {
    if (perguntaAtual > 0) {
      setPerguntaAtual(prev => prev - 1);
      setRespostaSelecionada(respostas[perguntaAtual - 1] || "");
    }
  };

  const finalizarExercicio = () => {
    const respostasFinais = { ...respostas };
    if (respostaSelecionada) {
      respostasFinais[perguntaAtual] = respostaSelecionada;
    }

    let pontos = 0;
    perguntas.forEach((pergunta, index) => {
      const respostaAluno = respostasFinais[index];
      if (respostaAluno && parseInt(respostaAluno) === pergunta.respostaCorreta) {
        pontos++;
      }
    });

    setPontuacao(pontos);
    setMostrarResultado(true);
  };

  const reiniciarExercicio = () => {
    setPerguntaAtual(0);
    setRespostas({});
    setRespostaSelecionada("");
    setMostrarResultado(false);
    setPontuacao(0);
    setTempoRestante(1800);
  };

  if (mostrarResultado) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Resultado do Exercício</DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <div className="text-6xl font-bold text-primary">
                {Math.round((pontuacao / perguntas.length) * 100)}%
              </div>
              <div className="space-y-2">
                <div className="text-xl font-semibold">
                  {pontuacao} de {perguntas.length} questões corretas
                </div>
                <div className="text-muted-foreground">
                  {pontuacao >= 3 ? (
                    <div className="flex items-center justify-center space-x-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span>Parabéns! Você foi aprovado!</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2 text-red-600">
                      <XCircle className="h-5 w-5" />
                      <span>Continue estudando para melhorar!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {perguntas.map((pergunta, index) => {
                const respostaAluno = respostas[index];
                const correto = respostaAluno && parseInt(respostaAluno) === pergunta.respostaCorreta;
                return (
                  <div
                    key={pergunta.id}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                      correto ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={reiniciarExercicio}>
                Tentar Novamente
              </Button>
              <Button onClick={onClose}>
                Finalizar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{tarefaTitulo}</DialogTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant="outline">
                Questão {perguntaAtual + 1} de {perguntas.length}
              </Badge>
              <div className="flex items-center space-x-2 text-red-600">
                <Clock className="h-4 w-4" />
                <span className="font-mono">{formatTempo(tempoRestante)}</span>
              </div>
            </div>
          </div>
          <Progress value={((perguntaAtual + 1) / perguntas.length) * 100} className="w-full" />
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {perguntas[perguntaAtual].enunciado}
            </h3>
            
            <RadioGroup value={respostaSelecionada} onValueChange={setRespostaSelecionada}>
              {perguntas[perguntaAtual].alternativas.map((alternativa, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`alt-${index}`} />
                  <Label htmlFor={`alt-${index}`} className="flex-1 cursor-pointer">
                    {String.fromCharCode(65 + index)}) {alternativa}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={perguntaAnterior}
              disabled={perguntaAtual === 0}
            >
              Anterior
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={onClose}>
                Sair
              </Button>
              <Button onClick={proximaPergunta}>
                {perguntaAtual === perguntas.length - 1 ? "Finalizar" : "Próxima"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExercicioModal;