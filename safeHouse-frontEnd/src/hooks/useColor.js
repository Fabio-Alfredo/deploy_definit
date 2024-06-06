export const getPhaseStyles = (phase) => {

    switch (phase) {
        case 'APR':
            return { text: 'Aprovada', color: 'text-green-500' };
        case 'PEN':
            return { text: 'Pendiente', color: 'text-gray-500' };
        case 'REC':
            return { text: 'Rechazada', color: 'text-red-500' };
        default:
            return { text: 'Pendiente', color: 'text-gray-500' };
    }
    
}