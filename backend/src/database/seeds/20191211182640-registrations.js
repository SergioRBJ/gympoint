module.exports = {
    up: QueryInterface => {
        return QueryInterface.bulkInsert(
            'registrations',
            [
                {
                    student_id: 1,
                    plan_id: 3,
                    start_date: new Date('2019-12-14'),
                    end_date: new Date('2020-06-14'),
                    price: 534,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    student_id: 2,
                    plan_id: 1,
                    start_date: new Date('2019-12-14'),
                    end_date: new Date('2020-01-14'),
                    price: 129,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    student_id: 3,
                    plan_id: 2,
                    start_date: new Date('2019-12-14'),
                    end_date: new Date('2020-03-14'),
                    price: 327,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: () => {},
};

