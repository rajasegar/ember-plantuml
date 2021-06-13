import Controller from '@ember/controller';

export default class ExploreController extends Controller {
  queryParams = ['path'];

  path = null;
}
