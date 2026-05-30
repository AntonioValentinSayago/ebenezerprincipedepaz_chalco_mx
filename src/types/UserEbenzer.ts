export type UsuarioAPI = {
    id: number;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    edad: number;
    curp: string; // Viene vacío, pero se asume tipo string
    fecha_nacimiento: string; // Formato "YYYY-MM-DD"
    bautizado: boolean;
    nivel_academico: string;
    fecha_conversion: string; // Formato "YYYY-MM-DD"
    ocupacion: string;
    cursos: string[];
    iglesia_anterior: string;
    razon_salida: string;
    talentos_json: string[];
    correo: string;
    telefono: string;
    tipo_sangre: string; // Viene vacío, se mapea como string
    estado_civil: string;
    genero: string;
    created_at: string; // Formato ISO Date string
    ministerios_json: string[];
    cobertura: boolean;
};