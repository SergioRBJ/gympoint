import * as Yup from 'yup';
import { parseISO, isBefore, addMonths } from 'date-fns';
import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';

import WellcomeMail from '../jobs/WellcomeMail';
import Queue from '../../lib/Queue';

class RegistrationController {
    async index(req, res) {
        const { page = 1 } = req.query;
        const registrations = await Registration.findAll({
            order: ['id'],
            limit: 20,
            offset: (page - 1) * 20,
            attributes: [
                'id',
                'start_date',
                'end_date',
                'price',
                'student_id',
                'plan_id',
                'active',
            ],
            include: [
                {
                    model: Student,
                    as: 'student',
                    attributes: ['first_name', 'last_name'],
                },
                {
                    model: Plan,
                    as: 'plan',
                    attributes: ['title', 'price', 'duration'],
                },
            ],
        });
        return res.json(registrations);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            student_id: Yup.number()
                .integer()
                .required(),
            plan_id: Yup.number()
                .integer()
                .required(),
            start_date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { student_id, plan_id, start_date } = req.body;

        const date = parseISO(start_date);

        /**
         * Check if date is valid
         */

        if (isBefore(date, new Date())) {
            return res
                .status(400)
                .json({ error: 'Past dates are not permmited' });
        }

        /**
         * Check if student exists
         */

        const student = await Student.findOne({
            where: { id: student_id },
            attributes: ['first_name', 'last_name', 'email'],
        });

        if (!student) {
            return res.status(400).json({ error: 'Student does not exists.' });
        }

        /**
         * Check if plan exists
         */

        const plan = await Plan.findOne({
            where: { id: plan_id },
        });

        if (!plan) {
            return res
                .status(400)
                .json({ error: 'This plan does not exists. ' });
        }

        const endDate = addMonths(date, plan.duration);

        const registration = await Registration.create({
            student_id,
            plan_id,
            start_date: date,
            end_date: endDate,
            price: plan.duration * plan.price,
        });

        await Queue.add(WellcomeMail.key, {
            student,
            endDate,
            plan,
        });

        return res.json(registration);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            student_id: Yup.number().required(),
            plan_id: Yup.number().required(),
            start_date: Yup.date(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { student_id, plan_id, start_date } = req.body;

        const date = parseISO(start_date);

        if (isBefore(date, new Date())) {
            return res
                .status(400)
                .json({ error: 'Past dates are not permmited' });
        }

        const plan = await Plan.findOne({
            where: { id: plan_id },
        });

        if (!plan) {
            return res
                .status(400)
                .json({ error: 'This plan does not exists. ' });
        }

        const { id: registerId } = req.params;

        const registration = await Registration.findByPk(registerId);

        if (!registration) {
            return res.status(400).json({ error: 'Invalid registration.' });
        }

        await registration.update({
            student_id,
            plan_id,
            start_date: date,
            end_date: addMonths(date, plan.duration),
            price: plan.duration * plan.price,
        });

        return res.json(registration);
    }

    async delete(req, res) {
        const { id: registerId } = req.params;

        const registration = await Registration.findByPk(registerId);

        if (!registration) {
            return res.status(400).json({ error: 'The ID does not exists.' });
        }

        await Registration.destroy({ where: { id: registerId } });
        return res.json(
            `The registration with id ${registerId} has been deleted.`
        );
    }
}

export default new RegistrationController();
