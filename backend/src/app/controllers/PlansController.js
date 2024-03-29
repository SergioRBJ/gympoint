import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlansController {
    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            duration: Yup.number().required(),
            price: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const planExists = await Plan.findOne({
            where: { title: req.body.title },
        });

        if (planExists) {
            return res.status(400).json({ error: 'Plan already exists.' });
        }

        const { id, title, duration, price } = await Plan.create(req.body);
        return res.json({ id, title, duration, price });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            id: Yup.string().required(),
            title: Yup.string(),
            duration: Yup.number(),
            price: Yup.number(),
        });

        if (!(await schema.isValid(req.params))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { title } = req.body;
        const plan = await Plan.findByPk(req.body.id);

        if (title !== plan.title) {
            const planExists = await Plan.findOne({
                where: { title },
            });

            if (planExists) {
                return res.status(400).json({ error: 'Plan already exists.' });
            }
        }

        const id = await plan.id;
        const { title: titleUpdate, duration, price } = await plan.update(
            req.body
        );

        return res.json({
            id,
            title: titleUpdate,
            duration,
            price,
        });
    }

    async delete(req, res) {
        const schema = Yup.object().shape({
            id: Yup.string().required(),
        });

        if (!(await schema.isValid(req.params))) {
            return res.status(400).json({ error: 'Invalid Parameter' });
        }

        const plan = await Plan.findByPk(req.params.id);
        if (plan === null) {
            return res.status(400).json({
                error: 'The plan id does not exists.',
            });
        }

        await Plan.destroy({
            where: { id: req.params.id },
        });

        return res.json(`The plan with id ${plan.id} has been deleted.`);
    }

    async index(req, res) {
        const plans = await Plan.findAll();

        return res.json(plans);
    }
}

export default new PlansController();
