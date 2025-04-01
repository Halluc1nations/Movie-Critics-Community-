import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    type Sequelize,
  } from 'sequelize';
  
  /*
  ! This is how we declared the Profile model using our own interfaces
  
  import { DataTypes, type Sequelize, Model, type Optional } from 'sequelize';
  
  interface ProfileAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
  }
  
  interface ProfileCreationAttributes extends Optional<ProfileAttributes, 'id'> {}
  
  export class Profile extends Model<ProfileAttributes, ProfileCreationAttributes> implements ProfileAttributes {
    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string;
    declare role: string;
  }
  
  */
  
  // ! This is how we declare the User model using sequelize's built-in types
  
interface ProfileAttributes {
  id: CreationOptional<number>;
  name: string;
  email: string;
  password: string;
  role: string;
}

  export class Profile extends Model<
    InferAttributes<Profile>,
    InferCreationAttributes<Profile>
  > implements ProfileAttributes {
    declare id: CreationOptional<number>;
    public name: string = '';
    public email: string = '';
    public password: string = '';
    public role: string = '';
// constructor(name: string
//   id: CreationOptional<number>,
//   email: string,
//   password: string,
//   role: string
// ) {
//       super();
//       this.name = name;
//       this.id = id;
//       this.email = email;
//       this.password = password;
//       this.role = role;
//     }

  }
  
  export function ProfileFactory(sequelize: Sequelize): typeof Profile {
    Profile.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'Please enter your password',
            },
          },
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'profile',
      }
    );
  
    return Profile;
  }
  