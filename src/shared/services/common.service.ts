import { Injectable } from '@nestjs/common';
import { ResponseDto } from '../dto/response.dto';
import * as _ from 'lodash';

@Injectable()
export class CommonService {
  customResponse(data: object, message: string, status: string) {
    const dto = new ResponseDto();
    dto.status = status;
    dto.message = message;
    dto.data = data;
    return dto;
  }

  customResponseToken(data: object, message: string, status: string) {
    const dto = new ResponseDto();
    dto.status = status;
    dto.message = message;
    dto.data = data;

    return dto;
  }

  generateUID() {
    // I generate the UID from two parts here
    // to ensure the random number provide enough bits.
    let firstPart = ((Math.random() * 46656) | 0).toString();
    let secondPart = ((Math.random() * 46656) | 0).toString();
    firstPart = ('000' + firstPart).slice(-3);
    secondPart = ('000' + secondPart).slice(-3);
    const uuid = firstPart + secondPart;
    return uuid;
  }

  camelToSnakeCase = (text: string) => {
    return text
      .replace(/(.)([A-Z][a-z]+)/, '$1_$2')
      .replace(/([a-z0-9])([A-Z])/, '$1_$2')
      .toLowerCase();
  };

  cleanUpObjectKeys(dataObject: object) {
    return _.transform(dataObject, function (resultObject, value, key) {
      const newKey = _.snakeCase(_.trim(key));
      resultObject[newKey] = value;
    });
  }
}
