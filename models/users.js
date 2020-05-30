module.exports = (sequelize,DataTypes)=>{
    return sequelize.define(
        "users",
        {
            id:{
                type:DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true,
                allowNull:false
            },
            nick_name:DataTypes.STRING,
            avatar_url:DataTypes.STRING,
            gender: DataTypes.INTEGER,
            open_id: DataTypes.STRING,
            session_key: DataTypes.STRING,
        },
        {
            tableName: 'users',
        },
    )
}
