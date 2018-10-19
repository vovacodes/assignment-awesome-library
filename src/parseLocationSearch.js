// @flow
import qs from 'querystring';


function parseLocationSearch(search: string): { [queryParam: string]: string } {
  if (search.indexOf('?') < 0) return {};

  const queryString = search.substring(1);

  return qs.parse(queryString);
}


export default parseLocationSearch;
