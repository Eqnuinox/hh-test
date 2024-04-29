import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepo: Repository<UsersEntity>,
  ) {}

  // get list of all users
  async findAll(page: number, take: number): Promise<{ users: UsersEntity[]; count: number }> {
    const skip = 20 * (page - 1);
    const [users, count] = await this.usersRepo.findAndCount({ take: take, skip: skip });
    return { users, count };
  }
}
