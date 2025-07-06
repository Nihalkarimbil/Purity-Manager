import * as Yup from 'yup';

export const Purityvalidation =Yup.object({
    metal: Yup.string().required('Metal is required'),
    purity: Yup.string().required('Purity name is required'),
    description: Yup.string().max(100, 'Description is too long'),
})

export const MetalValidation = Yup.object({
    metal: Yup.string().required('Metal is required'),
    purity: Yup.string().required('Purity is required'),
    rate: Yup.number().required('Rate is required').positive('Rate must be positive'),
    date: Yup.date().required('Date is required'),
})