// @flow
import qs from 'querystring';


function stringifyLocationSearch(queryParams: { [queryParam: string]: string }): string {
  return `?${qs.stringify(queryParams)}`;
}


export default stringifyLocationSearch;
