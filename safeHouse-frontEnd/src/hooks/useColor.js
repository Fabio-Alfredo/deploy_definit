export const getPhaseStyles = (phase) => {

    switch (phase) {
        case 'APPROVED':
            return { text: 'Aprobada', color: 'text-green-500' };
        case 'PENDING':
            return { text: 'Pendiente', color: 'text-gray-500' };
        case 'DENIED':
            return { text: 'Rechazada', color: 'text-red-500' };
        case 'EXPIRED':
            return { text: 'Usada', color: 'text-orange-500' };
        default:
            return { text: 'Pendiente', color: 'text-gray-500' };
    }
}