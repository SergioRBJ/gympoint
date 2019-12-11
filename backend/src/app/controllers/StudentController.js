import * as Yup from 'yup';
import Sequelize from 'sequelize';
import Student from '../models/Student';

class StudentController {
    async index(req, res) {
        const { Op } = Sequelize;
        const { name } = req.query;
        let user;

        if (name) {
            user = await Student.findAll({
                where: { first_name: { [Op.like]: `%${name}` } },
            });

        } else {
            user = await Student.findAll({
                attributes: [
                    'id',
                    'first_name',
                    'last_name',
                    'email',
                    'age',
                    'weight',
                    'height',
                ],
            });
        }

        return res.status(200).json(user);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            first_name: Yup.string().required(),
            last_name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            age: Yup.string().required(),
            weight: Yup.string().required(),
            height: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const studentExists = await Student.findOne({
            where: { email: req.body.email },
        });

        if (studentExists) {
            return res.status(400).json({ error: 'Student already exists.' });
        }

        const {
            id,
            first_name,
            last_name,
            email,
            age,
            weight,
            height,
        } = await Student.create(req.body);
        return res.json({
            id,
            first_name,
            last_name,
            email,
            age,
            weight,
            height,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            id: Yup.string().required(),
            first_name: Yup.string(),
            last_name: Yup.string(),
            email: Yup.string().email(),
            age: Yup.string(),
            weight: Yup.string(),
            height: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { email } = req.body;
        const student = await Student.findByPk(req.body.id);

        if (email !== student.email) {
            const studentExists = await Student.findOne({
                where: { email },
            });

            if (studentExists) {
                return res
                    .status(400)
                    .json({ error: 'Student already exists.' });
            }
        }

        const id = await student.id;
        const {
            first_name,
            last_name,
            age,
            weight,
            height,
        } = await student.update(req.body);

        return res.json({
            id,
            first_name,
            last_name,
            email,
            age,
            weight,
            height,
        });
    }
}

export default new StudentController();
