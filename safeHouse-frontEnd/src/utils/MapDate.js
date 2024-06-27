
export const formDate = (dateString) => {
    if (dateString === null) return 'No definida';
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
}

export const formatTime = (dateString) => {
    if (!dateString) return 'No definida';

    const dateObj = new Date(dateString);
    const hours = dateObj.getUTCHours(); // Obtener horas en UTC
    const minutes = dateObj.getUTCMinutes(); // Obtener minutos en UTC
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // Convertir de formato 24 horas a 12 horas

    const formattedTime = `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;

    return formattedTime;
}