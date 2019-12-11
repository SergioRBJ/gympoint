module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('plans', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            duration: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                AllowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                AllowNull: false,
            },
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('plans');
    },
};
