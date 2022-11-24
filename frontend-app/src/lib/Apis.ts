import * as Utils from './Utils';

const v1beta1Prefix = 'apis/v1beta1';

export interface BuildInfo {
    apiServerCommitHash?: string;
    apiServerTagName?: string;
    apiServerReady?: boolean;
    buildDate?: string;
    frontendCommitHash?: string;
    frontendTagName?: string;
}

export class Apis {
    /*
   * Retrieves the name of the Kubernetes cluster if it is running in GKE, otherwise returns an error.
   */
  public static getClusterName(): string {
    return "cluster name";
  }

  /**
   * Retrieve various information about the build.
   */
   public static async getBuildInfo(): Promise<BuildInfo> {
    return await this._fetchAndParse<BuildInfo>('/healthz', v1beta1Prefix);
  }

  /**
   * This function will call this._fetch() and parse the resulting JSON into an object of type T.
   */
   private static async _fetchAndParse<T>(
    path: string,
    apisPrefix?: string,
    query?: string,
    init?: RequestInit,
  ): Promise<T> {
    const responseText = await this._fetch(path, apisPrefix, query, init);
    try {
      return JSON.parse(responseText) as T;
    } catch (err) {
      throw new Error(
        `Error parsing response for path: ${path}\n\n` +
          `Response was: ${responseText}\n\nError was: ${JSON.stringify(err)}`,
      );
    }
  }

  /**
   * Makes an HTTP request and returns the response as a string.
   *
   * Use this._fetchAndParse() if you intend to parse the response as JSON into an object.
   */
   private static async _fetch(
    path: string,
    apisPrefix?: string,
    query?: string,
    init?: RequestInit,
  ): Promise<string> {
    init = Object.assign(init || {}, { credentials: 'same-origin' });
    const response = await fetch((apisPrefix || '') + path + (query ? '?' + query : ''), init);
    const responseText = await response.text();
    if (response.ok) {
      return responseText;
    } else {
      Utils.logger.error(
        `Response for path: ${path} was not 'ok'\n\nResponse was: ${responseText}`,
      );
      throw new Error(responseText);
    }
  }
}