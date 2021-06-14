import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  async model() {
    const response = await fetch('/files').then((res) => res.json());
    return response;
  }
}
