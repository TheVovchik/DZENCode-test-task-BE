'use strict';

import { DataTypes, Model } from 'sequelize';
import { CommentDB } from 'src/types/Comment';
import { sequelize } from './db';

interface UserModel extends Model<CommentDB>, CommentDB {}

export const Comments = sequelize.define<UserModel>('Comment', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nextId: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  prevId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  homepage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
  {
    tableName: 'Comments',
  }
);