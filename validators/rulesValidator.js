
const inputRequired = () => {
    return [
        v => !!v || 'Este campo es requerido',
        v => v && v.trim().length > 0 || 'Este campo no puede tener solo espacios en blanco',
    ];
}

const emailRequired = () => {
    return [
        v => !!v || 'Este campo es requerido',
        v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'El correo no es valido'
    ];
}

const numberRequired = () => {
    return [
        v => !!v || 'Este campo es requerido',
        v => (v && (v > 0 && v < 128)) || 'La cantidad debe se mayor que 0 y menor que 128',
    ];
}

export {
    inputRequired,
    emailRequired,
    numberRequired
}