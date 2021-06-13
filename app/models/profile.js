import Model, { belongsTo } from '@ember-data/model';

export default class ProfileModel extends Model {
  @belongsTo('user') user;
}
