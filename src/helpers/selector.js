import Immutable from 'immutable';

export const convertToJS = (data) => Immutable.isImmutable(data) ? data.toJS() : data;