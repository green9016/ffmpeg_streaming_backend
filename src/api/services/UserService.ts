import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { events } from '../subscribers/events';

@Service()
export class UserService {

    constructor(
        @OrmRepository() private userRepository: UserRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<User[]> {
        this.log.info('Find all users');
        return this.userRepository.find();
    }

    public findOne(id: string): Promise<User | undefined> {
        this.log.info('Find one user');
        return undefined;
    }

    public async create(user: User): Promise<User> {
        this.log.info('Create a new user => ', user.toString());
        this.eventDispatcher.dispatch(events.user.created, undefined);
        return undefined;
    }

    public update(id: string, user: User): Promise<User> {
        this.log.info('Update a user');
        return undefined;
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a user');
        return;
    }

}
