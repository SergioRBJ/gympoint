import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class WellcomeMail {
    get key() {
        return 'WellcomeMail';
    }

    async handle({ data }) {
        const { student, endDate, plan } = data;

        await Mail.sendMail({
            to: `${student.first_name} <${student.email}>`,
            subject: 'Bem vindo ao Gym Point!',
            template: 'wellcome',
            context: {
                student: student.first_name,
                plan: plan.title,
                end_date: format(
                    parseISO(endDate),
                    "'Dia' dd 'de' MMMM 'de' yyyy",
                    {
                        locale: pt,
                    }
                ),
                formatedPrice: plan.duration * plan.price,
            },
        });
    }
}

export default new WellcomeMail();
