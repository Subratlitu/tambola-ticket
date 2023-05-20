

const isValid=function(value){
    if(typeof value==='undefined' || value===null)return false
    if(typeof value==='string'&& value.trim().length===0)return false
    return true;
}

const isValidEmail=function(email){
   return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}
const isValidPassword=function(password){
    return (password.length>=5 && password.length<=15)
}

const isNumber=function(str){
    return (/^\d+$/.test(str));
}
const isArray=function(arr){
    return Array.isArray(arr)
}

function generateRandomCode() {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substring(2, 6);
  return timestamp + randomString;
}


function generateTicket() {
    const groupedNumbers = Array.from({ length: 9 }, (_, i) =>
      Array.from({ length: 10 }, (_, j) => i * 10 + j + 1)
    );
  
    const ticket = Array.from({ length: 3 }, () => Array.from({ length: 9 }, () => 0));
  
    for (let col = 0; col < 9; col++) {
      const group = groupedNumbers[col];
      const rowIndex = Math.floor(Math.random() * 3);
      const numberIndex = Math.floor(Math.random() * group.length);
  
      if (canInsertNumber(rowIndex, col)) {
        ticket[rowIndex][col] = group[numberIndex];
        group.splice(numberIndex, 1);
      }
    }
  
    function canInsertNumber(row, col) {
      return (
        row < ticket.length &&
        col < ticket[row].length &&
        ticket[row].filter(num => num !== 0).length < 5 &&
        ticket[row][col] === 0
      );
    }
  
    function fillTicket(row, col) {
      if (row === ticket.length) {
        return;
      }
  
      if (col === ticket[row].length) {
        fillTicket(row + 1, 0);
        return;
      }
  
      const chance = Math.random() < 0.5;
  
      if (canInsertNumber(row, col) && canInsertNumber(row, col) && chance) {
        const group = groupedNumbers[col];
        const numberIndex = Math.floor(Math.random() * group.length);
  
        ticket[row][col] = group[numberIndex];
        group.splice(numberIndex, 1);
      }
  
      fillTicket(row, col + 1);
    }
  
    fillTicket(0, 0);
  
    return ticket;
  }
module.exports={
isValid,
isValidEmail,
isValidPassword,
isNumber,
isArray,
generateTicket,
generateRandomCode
}