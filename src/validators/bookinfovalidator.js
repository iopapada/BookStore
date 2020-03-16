export function isNumeric(value) {
    if(value==="" || value===null)
        return true;
    else if(isNaN(value))
        return false;
    else
        return true;
}
  
export function isValidDateFormat(value) {
    if(value==="" || value===null)
        return true;
    else if(!/^\d{4}$/.test(value))
        return false;
    else
        return true;
}