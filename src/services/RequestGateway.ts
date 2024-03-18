import axios from 'axios';

class RequestGateway {
  private rootUrl = 'https://api.jikan.moe/v4';
  private requestTimeQueue: number[] = [];

  async getData<T>(endpoint: string) {
    try {
      const response = await axios.get(`${this.rootUrl}/${endpoint}`);
      return response.data as T;
    } catch (error) {
      const _e = error as Error;
      console.error(`RequestGateway::get Error: ${_e.name} message: ${_e.message}`);
    }
  }
}

// export default RequestGateway;
export default new RequestGateway();
