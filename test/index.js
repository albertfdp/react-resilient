import 'raf/polyfill';

import unexpected from 'unexpected';
import unexpectedReact from 'unexpected-react';
import unexpectedSinon from 'unexpected-sinon';

export default unexpected.clone().use(unexpectedReact).use(unexpectedSinon);
