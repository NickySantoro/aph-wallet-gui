// import accounting from 'accounting';
import moment from 'moment';
import numeral from 'numeral';
import { formats } from '../constants';
import { settings } from '../services';

export default {
  methods: {
    $formatDate(timestamp) {
      return moment(timestamp, 'X').format(formats.DATE);
    },

    $formatDateShow(timestamp) {
      return moment(timestamp, 'X').format(formats.DATE_SHORT);
    },

    $formatMoney(value, symbol, defaultValue = 'N/A') {
      if (value === null) {
        return defaultValue;
      }
      return accounting.formatMoney(value, symbol || settings.getCurrencySymbol());
    },

    $formatNumber(value, format = formats.NUMBER, defaultValue = 'N/A') {
      if (value === null) {
        return defaultValue;
      }

      if (value.toString().indexOf('e') > -1) {
        return parseFloat(value.toString()).toFixed(8);
      }
      if (numeral(value).format(format || formats) === 'NaN') {
        return parseFloat(value.toString()).toFixed(8);
      }
      return numeral(value).format(format || formats);
    },

    $formatNumberShort(value) {
      return numeral(value).format(formats.NUMBER_SHORT);
    },

    $formatTime(timestamp) {
      return moment(timestamp, 'X').format(formats.TIME);
    },
  },
};
