export const getFormattedDateNow = () => {
    const currentDate = new Date(Date.now());

    const day = currentDate.getDay().toString().padStart(2, '0');
    const mounth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();

    return `${day}.${mounth}.${year}`;
}

export const formatDate = (str) => {
    return str.split('-').reverse().join('.');
}