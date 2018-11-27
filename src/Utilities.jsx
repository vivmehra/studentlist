export const inputDataErrorMessageUtil = (name, score) =>{
   let ErrorMessage = '';
    if(name === '' && score === ''){
         ErrorMessage = 'Please enter valid Student Name and Score';
         return ErrorMessage;
    }else if(name === '' && (score === '' || score < 0 || score > 100 || isNaN(score))){
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

 /*  Function to calculate min max and average values of the class */
 export const calculateSummaryDataUtil = (studentList) => {
    let studentsList = studentList;
    let scoreArray = '';
    scoreArray = studentsList.map((student) => Number(student.score));
    let min = Math.min(...scoreArray);
    let max = Math.max(...scoreArray);
    let avg = +(scoreArray.reduce((a, b) => Number(a) + Number(b), 0) / studentsList.length).toFixed(2);
    
   let summaryData = {
        min : min,
        max: max,
        avg : avg
    }
    return summaryData;
};