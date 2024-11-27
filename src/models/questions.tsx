


 interface Option {
    IncorrectAnswer: string;
}

 interface OptionImage {
    IncorrectAnswer: number;
    image: string;
}

 interface CorrectAnswerImage {
    IncorrectAnswer: number;
    image: string;
}


export interface Question  {
    title: string;
    typeQuestion: string;
    option: Option[];
    optionImage: OptionImage[];
    question: string;
    explanation: string;
    correctAnswer: string;
    correctAnswerImage: CorrectAnswerImage[];
    image: string;
    chapterId: string;
    createAt: number;
    creatorId: string;
}
export interface HistoryQuestion  {
    title: string;
    typeQuestion: string;
    option: Option[];
    optionImage: OptionImage[];
    question: string;
    explanation: string;
    correctAnswer: string;
    correctAnswerImage: CorrectAnswerImage[];
    image: string;
    answered: string;
    chapterId: string;
    createAt: number;
    creatorId: string;
}

export interface HistoryTest {
    question : HistoryQuestion[],
    score: number;
    timerEndTime: number;
    speed: number;
    correct: number
    timeEnd: number;
}

export interface selectOptions {
    questionIndex: number;
    optionPick : string;
}

export interface ItemQuestionsProps {
    initialQuestions: Question[];
    picks: any;
    finish: boolean;
    onResetPicks : () => void ;
    onResetTO :(resetTimeOut: boolean) => void;
    submitAnswer :(submitAnswer: boolean) => void;
  }












//   ============== Deklarasi data ==========

//   Result bertipe QuestionData[], hasil map harus menghasilkan objek dengan struktur QuestionData. Artinya, setiap elemen yang Anda kembalikan harus memiliki properti initialQuestions. 
  
//   interface QuestionData {
//     initialQuestions : Question[];
//   }
  
//   const Result : QuestionData[] =  Data.map( item => ({ 
//     initialQuestions : [{  ...item , option : [ ...item.option , { IncorrectAnswer : item.correctAnswer }] }]
//    }) )