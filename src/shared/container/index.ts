import { container, delay } from 'tsyringe';
import { UsersRepository } from '../../modules/accounts/respositories/implementations/UsersRepository';
import { IUsersRepository } from '../../modules/accounts/respositories/IUsersRepository';
import {ICategoriesRepository} from '../../modules/cars/repositories/ICategoriesRepository';
import {CategoriesRepository} from '../../modules/cars/repositories/implementations/CategoriesRepository';
import { SpecificationsRepository } from '../../modules/cars/repositories/implementations/SpecificationsRepository';
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository';


container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
   delay(() => UsersRepository),
);