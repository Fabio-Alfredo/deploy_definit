export const getPhaseStyles = (phase) => {

    switch (phase) {
        case 'APPROVED':
            return { text: 'Aprovada', color: 'text-green-500' };
        case 'PENDING':
            return { text: 'Pendiente', color: 'text-gray-500' };
        case 'REC':
            return { text: 'Rechazada', color: 'text-red-500' };
        default:
            return { text: 'Pendiente', color: 'text-gray-500' };
    }
    
}