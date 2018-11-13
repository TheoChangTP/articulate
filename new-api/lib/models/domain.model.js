import Joi from 'joi';
import {
    STATUS_ERROR,
    STATUS_OUT_OF_DATE,
    STATUS_READY,
    STATUS_TRAINING
} from '../../util/constants';

class DomainModel {
    static get schema() {

        return {
            id: Joi.number(),
            agent: Joi.string().trim(),
            domainName: Joi.string().trim(),
            enabled: Joi.boolean(),
            actionThreshold: Joi.number(),
            status: Joi
                .string()
                .trim()
                .valid(STATUS_READY, STATUS_TRAINING, STATUS_ERROR, STATUS_OUT_OF_DATE),
            lastTraining: Joi.date().allow(''),
            model: Joi.string().trim().allow(''),
            extraTrainingData: Joi.boolean()
        };
    };
}

module.exports = DomainModel;
