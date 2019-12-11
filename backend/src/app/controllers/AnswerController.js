import * as Yup from 'yup';
import HelpOrder from '../schemas/HelpOrder';
import Student from '../models/Student';

import AnswerMail from '../jobs/AnswerMail';
import Queue from '../../lib/Queue';

class AnswerController {
    async index(req, res) {
        const helpOrders = await HelpOrder.find({ answer: null });

        return res.json(helpOrders);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            answer: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { id } = req.params;

        const helpOrder = await HelpOrder.findById(id);

        if (!helpOrder) {
            return res.status(400).json({
                error: 'This Help Order does not exists',
            });
        }

        const student = await Student.findOne({
            where: { id: helpOrder.student_id },
        });

        const { answer } = req.body;

        const date = new Date();
        helpOrder.answer = answer;
        helpOrder.answer_at = date;

        await helpOrder.save();

        await Queue.add(AnswerMail.key, {
            student,
            helpOrder,
        });

        return res.json(helpOrder);
    }

    async show(req, res) {
        const { id } = req.params;

        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(400).json({ error: 'Student does not exists.' });
        }

        const helpOrder = await HelpOrder.find({
            student_id: id,
        });

        return res.json(helpOrder);
    }
}

export default new AnswerController();
