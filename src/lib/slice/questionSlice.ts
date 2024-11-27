import { HistoryQuestion, HistoryTest, selectOptions } from '@/models/questions';
import { createSlice } from '@reduxjs/toolkit';


interface QuestionState {
    stateQuestion: HistoryQuestion[];
    stateSelectedOptions: selectOptions[];
    stateHistoryQuestion: HistoryQuestion[];
    stateHistoryTest: HistoryTest;
    
    questionRes: string | null;
    stateAnswered: string;
    stateScore: number;
    stateSpeed: number;
    stateCorrect: number;

    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string | null,
  }
  
  const initialState: QuestionState = {
    stateQuestion: [],
    stateSelectedOptions: [],
    stateHistoryQuestion: [],
    stateHistoryTest: {} as HistoryTest,
    stateAnswered:'',
    questionRes: null,
    stateScore : 0,
    stateSpeed : 0,
    stateCorrect : 0,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  };
  


const questionSlice = createSlice({
  name: 'question',

  initialState,

  reducers: {

    setResponse: (state, action) => {
      state.stateQuestion = action.payload;
    },

    setSelectOptions : ( state, action ) => {
      state.stateSelectedOptions = action.payload;
    },

    setAnswered: (state, action) => {

      state.stateSpeed = action.payload
      state.stateCorrect = 0
    
      if (!state.stateSelectedOptions || state.stateSelectedOptions.length === 0) {
        return state;  
      }
       
        state.stateQuestion.filter((item: { correctAnswer: any; }) => 
          state.stateSelectedOptions.some(selectedOption => {
            
            const isMatch = item.correctAnswer === selectedOption.optionPick ;

            if (isMatch) {
              state.stateCorrect++;
            }
            
          })
        );

        
        state.stateScore = (state.stateCorrect / state.stateQuestion.length) * 100 ;
        
        state.stateHistoryQuestion = state.stateQuestion.map((item, index) => {
          
          const selectedOption = state.stateSelectedOptions.find(select => select.questionIndex === index);
          
          return {
            ...item, 
            answered: selectedOption ? selectedOption.optionPick : '' 
          };
        });
        
        state.stateHistoryTest = {
          question: state.stateHistoryQuestion, 
          score: state.stateScore,
          speed: state.stateSpeed,
          correct: state.stateCorrect,
          timeEnd: Date.now(),
          timerEndTime:0
        };
        
        
        // console.log("History State: ", state.stateHistoryQuestion);
        // console.log("History Test: ", state.stateHistoryTest);
        // console.log('Jumlah benar :', state.stateCorrect);
        console.log('Submit Answerd Active' , );
        // console.log('Data Tinme :' , state.stateSpeed);
        
        
      },
    
    setHistoryTest: (state, action) => {
      state.stateHistoryTest = action.payload;
    }
    


  },
});

export const { setResponse, setSelectOptions, setAnswered, setHistoryTest } = questionSlice.actions;
export default questionSlice.reducer;




// array > array 

// const filteredQuestions = state.stateQuestion.filter((item, questionIndex) => 
//   state.stateSelectedOptions.some(selectedOption => {
//     // Periksa apakah questionIndex dan optionPick cocok
//     const isMatch = item.option.some(option => option.IncorrectAnswer === selectedOption.optionPick);
    
//     // Jika ditemukan kecocokan, increment 'i'
//     if (isMatch) {
//       i++;
//     }
//   })
// );