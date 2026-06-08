import { z } from 'zod';

export const createMemberSchema = z.object({
  nombres: z.string().min(2),

  apellido_paterno: z.string().min(2),

  apellido_materno: z.string().min(2),

  edad: z.preprocess((value) => {
    if (typeof value === 'string' && value.trim() !== '') {
      return Number(value);
    }
    return value;
  }, z.number().min(0)),

  curp: z.string(),

  fecha_nacimiento: z.string(),

  bautizado: z.boolean(),

  cobertura: z.boolean(),

  nivel_academico: z.string(),

  fecha_conversion: z.string(),

  ocupacion: z.string(),

  cursos: z.array(z.string()),

  iglesia_anterior: z.string(),

  razon_salida: z.string(),

  talentos_json: z.array(z.string()),

  correo: z.email(),

  telefono: z.string(),

  tipo_sangre: z.string(),

  estado_civil: z.string(),

  genero: z.string(),

  ministerios_json: z.array(z.string()),
});

export type CreateMemberFormData =
  z.infer<typeof createMemberSchema>;