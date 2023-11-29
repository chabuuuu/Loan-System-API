import { Container } from 'inversify';
import 'reflect-metadata';
import { LOANPACKAGESERVICE } from './types/loan_package';
import { LoanPackageService } from '../services/loanpackages/loanpackage.service';

const container = new Container();
container.bind(LOANPACKAGESERVICE).to(LoanPackageService);
export default container;
