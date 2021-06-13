import Model, { belongsTo } from '@ember-data/model';

export default class UserModel extends Model {
  @belongsTo('profile') profile;
}
