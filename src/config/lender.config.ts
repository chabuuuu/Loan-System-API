import { Container } from 'inversify';
import 'reflect-metadata';
import { LENDERSERVICE } from './types/lender.types';
import { LenderServce } from '../services/employees/lender.service';

const container = new Container();
container.bind(LENDERSERVICE).to(LenderServce);
export default container;
