import * as Yup from 'yup'

export interface FormProducts {
  sku: string
  name: string
}

export const CreateProductSchema = Yup.object().shape({
  name: Yup.string().required('¡Campo requerido!'),
  sku: Yup.string()
    .min(2, '¡Muy corto!')
    .max(5, 'Muy largo!')
    .required('¡Campo requerido!'),
})
