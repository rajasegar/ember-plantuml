import Route from '@ember/routing/route';
import { htmlSafe } from '@ember/template';

export default class UmlRoute extends Route {
  queryParams = {
    folder: {
      refreshModel: true,
    },
    file: {
      refreshModel: true,
    },
  };

  async model(params) {
    const unsafe = await fetch(
      `/uml?folder=${params.folder}&file=${params.file}`
    ).then((res) => res.json());

    const svg = htmlSafe(unsafe.svg);
    return { svg };
  }
}
