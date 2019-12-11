module.exports = {
    up: QueryInterface => {
        return QueryInterface.bulkInsert(
            'registrations',
            [
                {
                    student_id: 'Start',
                    plan_id: '1',
                    price: '129',
                    start_date: '129',
                    end_date: '129',
                    price_date: '',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    student_id: 'Start',
                    plan_id: '1',
                    price: '129',
                    start_date: '129',
                    end_date: '129',
                    price_date: '',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    student_id: 'Start',
                    plan_id: '1',
                    price: '129',
                    start_date: '129',
                    end_date: '129',
                    price_date: '',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: () => {},
};

