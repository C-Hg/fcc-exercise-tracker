exports.isDateFormatValid = function(date) {
    let regexp = /^(\d{4})-(\d{2})-(\d{2})$/;
    let result = date.match(regexp);
    if (result === null) { return false };
    if (result[1] > 1900 && result[1] < 2100 && result[2] > 0 && result[2] < 13 && result[3] > 0 && result[3] < 32) {
        return true;
    }
    return false;
}