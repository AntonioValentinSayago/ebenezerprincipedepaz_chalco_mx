export const getDateFormat = (dateInput: Date | string | number) : string => {
    const date = new Date(dateInput);

    // * Validar Fecha es valida para evitar errores
    if (isNaN(date.getTime())) return "Fecha no válida";

    // * Formatear la fecha usando Intl.DateTimeFormat para español de México
    const formatter = new Intl.DateTimeFormat("es-MX", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })
 
    const fechaFormateada = formatter.format(date);
    return fechaFormateada.replace(/de\s(\d{4})/, 'del $1');
}