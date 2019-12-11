import Sequelize, { Model } from 'sequelize';
import { isBefore, isAfter } from 'date-fns';

class Plan extends Model {
    static init(sequelize) {
        super.init(
            {
                title: Sequelize.STRING,
                duration: Sequelize.INTEGER,
                price: Sequelize.FLOAT,
                active: {
                    type: Sequelize.VIRTUAL(Sequelize.BOOLEAN, [
                        'start_date',
                        'end_date',
                    ]),
                    get() {
                        return (
                            isBefore(this.get('start_date'), new Date()) &&
                            isAfter(this.get('end_date'), new Date())
                        );
                    },
                },
            },
            { sequelize }
        );

        return this;
    }
}

export default Plan;
