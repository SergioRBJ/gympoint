module.exports = {
    up: QueryInterface => {
        return QueryInterface.bulkInsert(
            'students',
            [
                {
                    first_name: 'Sergio',
                    last_name: 'Bernardi',
                    email: 'sergiorbj93@gmail.com',
                    age: '26',
                    weight: '65',
                    height: '177',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    first_name: 'Diego',
                    last_name: 'Deschamps',
                    email: 'michel.fernandes@gmail.com',
                    age: '25',
                    weight: '74',
                    height: '175',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    first_name: 'Joana',
                    last_name: 'Silva',
                    email: 'joana.silva@gmail.com',
                    age: '28',
                    weight: '88',
                    height: '168',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: () => {},
};

