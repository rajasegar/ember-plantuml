import Model, { hasMany } from '@ember-data/model';

export default class BlogPostModel extends Model {
  @hasMany('comment') comments;
}
