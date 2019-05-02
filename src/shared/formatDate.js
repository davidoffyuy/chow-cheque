const formatDate = stringDate  => {
    const newDate = new Date(stringDate);
    return `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`;
}

export default formatDate;