import {IServerConfigurations} from '../configurations/index';
import {Bucket, N1qlQuery} from 'couchbase';

export default class UserController {
    private serverConfigs: IServerConfigurations;
    private bucket: Bucket;


    constructor(serverConfigs: IServerConfigurations, bucket: Bucket) {
        this.serverConfigs = serverConfigs;
        this.bucket = bucket;
    }

    public getAllDocuments(req, reply): void {
        this.bucket.query(N1qlQuery.fromString('SELECT * FROM bluemangodeals'), (err, rows) => {
            if (err) {
                reply(err);
            } else {
                reply(rows);
            }
        });
    }
}