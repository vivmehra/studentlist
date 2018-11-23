export const inputDataErrorMessageUtil = (name, score) =>{
    let ErrorMessage = '';
    if(name === '' && score === ''){
        return ErrorMessage = 'Please enter valid Student Name and Score';
    }else if(name === '' && score !== ''){
        return ErrorMessage = 'Please enter valid Student Name';
    }else if(name !== '' && score === '' || score < 0 || score > 100 || isNaN(score)){
        return ErrorMessage = 'Please enter valid score';
}
}