import {date, z} from "zod";

const registerSchema = z.object({
    name: z
        .string({required_error: "Ce champ est requis"})
        .max(255, {message: "Veuillez renseigner moins de 255 caractères"}),
    lastName: z
        .string({required_error: "Ce champ est requis"})
        .max(255, {message: "Veuillez renseigner moins de 255 caractères"}),
    username: z.string({required_error: "Ce champ est requis"}),
    dateOfBirth: date({
        required_error: "Ce champ est requis",
    }),
    email: z
        .string({required_error: "Ce champ est requis"})
        .email()
        .max(255, {message: "Veuillez renseigner moins de 255 caractères"}),
    password: z
        .string()
        .min(8, {message: "Veuillez renseigner au moins 8 caractères"})
        .refine(value => /[A-Z]/.test(value), {
            message: "Veuillez renseigner au moins une lettre majuscule",
        })
        .refine(value => /[0-9]/.test(value), {
            message: "Veuillez renseigner au moins un chiffre",
        })
        .refine(value => /[!@#$%^&*+\-(),.?":{}|<>]/.test(value), {
            message: "Veuillez renseigner au moins un caractère spécial",
        }),
    confirmPassword: z.string()
        .min(8, {message: "Veuillez renseigner au moins 8 caractères"})
        .refine(value => /[A-Z]/.test(value), {
            message: "Veuillez renseigner au moins une lettre majuscule",
        })
        .refine(value => /[0-9]/.test(value), {
            message: "Veuillez renseigner au moins un chiffre",
        })
        .refine(value => /[!@#$%^&*+\-(),.?":{}|<>]/.test(value), {
            message: "Veuillez renseigner au moins un caractère spécial",
        }),
}).superRefine((({confirmPassword, password}, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "Les mots de passe ne correspondent pas",
            path: ['confirmPassword']
        });
    }
}));

export default registerSchema;