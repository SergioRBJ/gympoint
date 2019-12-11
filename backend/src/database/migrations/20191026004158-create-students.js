module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('students', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            first_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            age: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            weight: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            height: {
                type: Sequelize.STRING,
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
        return queryInterface.dropTable('students');
    },
};
