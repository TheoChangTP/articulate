import _ from 'lodash';

module.exports = class BaseModel {
    constructor({ name, mappings, settings, client, registerConfiguration }) {

        this.name = name;
        this.index = _.toLower(name);
        this.mappings = mappings;
        this.settings = settings;
        this.client = client;
        this.registerConfiguration = registerConfiguration;
    }

    async count({ query = null } = {}) {

        const { index } = this;
        const body = query ? { query } : undefined;
        const { count } = await this.client.count({
            index,
            body
        });
        return count;
    }

    async createInstance({ data, refresh = true }) {

        const { index } = this;
        const { body } = await this.client.index({
            index,
            //type: index,
            body: data,
            refresh
        });
        return body;
    }

    async updateInstance({ id, data, refresh = true }) {

        const { index } = this;
        const { body } = await this.client.index({
            index,
            //type: index,
            id,
            body: data,
            refresh
        });

        return body;
    }

    async removeInstance({ id, refresh = true }) {

        const { index } = this;
        await this.client.delete({
            index,
            //type: index,
            id,
            refresh
        });
    }

    async findById({ id, refresh = true, source = true }) {

        const { index } = this;
        const { body } = await this.client.get({
            index,
            //type: index,
            id,
            refresh,
            _source: source
        });
        return body;
    }

    async search({ bodyParam, trackTotalHits = true }) {

        const { index } = this;
        const { body } = await this.client.search({
            index,
            body: bodyParam,
            trackTotalHits
        });
        return body;
    }

    async deleteByQuery({ body, refresh = true }) {

        const { index } = this;
        return await this.client.deleteByQuery({
            index,
            body,
            refresh
        });
    }
};
