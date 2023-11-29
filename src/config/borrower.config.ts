import { Container } from 'inversify';
import 'reflect-metadata';
import { BorrwerService } from '../services/borrowers/borrower.service';
import { BORROWERSERVICE } from './types/borrower.type';
const container = new Container();
container.bind(BORROWERSERVICE).to(BorrwerService);
export default container;
