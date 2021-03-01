import * as Yup from 'yup';

export const AddSchedulingFormSchema = Yup.object({
  name: Yup.string()
    .ensure()
    .required('Informe o nome!')
    .min(2, 'Informe ao menos 2 caracteres para o nome')
    .max(35, 'O nome pode conter no máximo 35 caracteres'),
  message: Yup.string()
    .ensure()
    .required('Informe a mensagem!')
    .min(2, 'Informe ao menos 2 caracteres para a mensagem')
    .max(255, 'A mensagem pode conter no máximo 255 caracteres'),
  date: Yup.date()
    .nullable()
    .required('Você precisa informar o agendamento!')
    .min(new Date(), 'Você precisa informar uma data que irá ocorrer!'),
  phones: Yup.array()
    .of(
      Yup.string()
        .required('Você precisa informar um numero de celular')
        .min(11, 'Informe um número válido!')
        .max(11, 'Informe um número válido!')
    )
    .min(1, 'Você precisa informar ao menos um número!'),
});
