import Model, { attr } from '@ember-data/model';

export default class PersonModel extends Model {
  @attr('string') name;
  @attr('number') age;
  @attr('boolean') admin;
  @attr('date') birthday;
}
