import * as Hapi from "hapi";
import UserController from "./controller";
import { IServerConfigurations } from "../configurations";

export default function (server: Hapi.Server, serverConfigs: IServerConfigurations, database: any) {

    const userController = new UserController(serverConfigs, database);
    server.bind(userController);

    server.route({
        method: 'GET',
        path: '/users',
        config: {
            handler: userController.getAllDocuments,
            tags: ['api', 'users'],
            description: 'Get All Users.',
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '201': {
                            'description': 'User created.'
                        }
                    }
                }
            }
        }
    });
}