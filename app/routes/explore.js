import Route from '@ember/routing/route';

export default class ExploreRoute extends Route {
  queryParams = {
    path: {
      refreshModel: true,
    },
  };

  model(params) {
    return fetch(`/explore?folder=${params.path}`).then((res) => res.json());
  }
}
