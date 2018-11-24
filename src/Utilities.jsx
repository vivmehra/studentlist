export const inputDataErrorMessageUtil = (name, score) =>{
   let ErrorMessage = '';
    if(name === '' && score === ''){
         ErrorMessage = 'Please enter valid Student Name and Score';
         return ErrorMessage;
    }else if(name === '' && score !== ''){
        ErrorMessage = 'Please enter valid Student Name';
        return ErrorMessage;
    }else if(name !== '' && (score === '' || score < 0 || score > 100 || isNaN(score))){
        ErrorMessage = 'Please enter valid score';
        return ErrorMessage;
}
}