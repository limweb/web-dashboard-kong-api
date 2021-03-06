import 'babel-polyfill';
import config from 'app-config';
import _ from 'lodash';
import schedule from 'node-schedule';
import CalendarDate from '../models/CalendarDate';
import logger from '../utils/logger';
import clientHTTP from '../clientHTTP';
import response from '../utils/responseHelper';

const debug = require('debug')('GSITAE:scheduler');

const client = clientHTTP(config.config.kongOptions);

const deleteTokens = async () => {
  debug('deleteTokens');
  try {
    const responseTokens = await client.getRequest('/oauth2_tokens');
    const tokenList = responseTokens.body.data;
    const tokenFiltered = tokenList.filter(obj => (
      obj.credential_id !== config.config.application.id
    ));
    let query = {
      selectedDate: {
        $lt: new Date(),
      },
    };
    let deleteRequests = [
      CalendarDate.remove(query),
    ];
    tokenFiltered.forEach((obj) => {
      deleteRequests.push(client.deleteRequest(`/oauth2_tokens/${obj.access_token}`));
    });
    await Promise.all(deleteRequests);
    debug('[deleteTokens] Borrando tokens de acceso');
    logger.info('[deleteTokens] Borrando tokens de acceso');
    return '[deleteTokens] Borrando tokens de acceso';
  } catch (err) {
    debug(err);
    logger.error('[deleteTokens] Error borrando tokens de acceso');
    throw err;
  }
};

const init = (rule) => {
  debug('Init schedule deleteTokens');
  const task = schedule.scheduleJob(rule, deleteTokens);
};

export default init;
