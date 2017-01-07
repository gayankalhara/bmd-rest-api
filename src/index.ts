import * as Server from './server';
import * as Configs from './configurations';
import * as couchbase from 'couchbase';

//Init Database
const dbConfigs = Configs.getDatabaseConfig();

let cluster  = new couchbase.Cluster(dbConfigs.connectionString);
let bucket = cluster.openBucket(dbConfigs.bucketName);

console.log(`Running environment ${process.env.NODE_ENV || 'dev'}`);

//Starting Application Server
const serverConfigs = Configs.getServerConfigs();
const server = Server.init(serverConfigs, bucket);

server.start(() => {
    console.log('Server running at:', server.info.uri);
});