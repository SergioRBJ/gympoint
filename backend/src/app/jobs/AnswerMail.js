import Mail from '../../lib/Mail';

class AnswerMail {
    get key() {
        return 'AnswerMail';
    }

    async handle({ data }) {
        const { student, helpOrder } = data;

        await Mail.sendMail({
            to: `${student.first_name} <${student.email}>`,
            subject: 'Pedido de ajuda GymPoint',
            template: 'answer',
            context: {
                student: student.first_name,
                question: helpOrder.question,
                answer: helpOrder.answer,
            },
        });
    }
}

export default new AnswerMail();
