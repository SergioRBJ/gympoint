import * as Yup from 'yup';
import HelpOrder from '../schemas/HelpOrder';
import Student from '../models/Student';

class HelpController {
    async store(req, res) {
        const schema = Yup.object().shape({
            question: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { id } = req.params;
        const { question } = req.body;

        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(400).json({ error: 'Student does not exists.' });
        }

        const helpOrder = await HelpOrder.create({
            student_id: id,
            question,
        });

        return res.json(helpOrder);
    }

    async index(req, res) {
        const { page = 1, quantity = 20, id } = req.params;

        const helpOrders = await HelpOrder.findAll({
            where: { student_id: id },
            limit: quantity,
            offset: (page - 1) * quantity,
            include: [
                {
                    model: Student,
                    as: 'student',
                    attributes: ['id', 'first_name', 'last_name', 'email'],
                },
            ],
        });

        return res.json(helpOrders);
    }
}

export default new HelpController();
