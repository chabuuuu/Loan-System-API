const Ajv = require('ajv'); // options can be passed, e.g. {allErrors: true}
const EmployeeSchema = {
    $id: 'EmployeeSchema',
    type: 'object',
    properties: {
        full_name: { type: 'string' },
        date_of_birth: { type: 'string' },
        gender: { type: 'string' },
        address: { type: 'string' },
        phone_number: { type: 'string' },
        email: { type: 'string' },
        job_title: { type: 'string' },
        start_date: { type: 'string' },
        salary: { type: 'string' },
        profile_picture: { type: 'string' },
        password: { type: 'string' },
    },
    required: [
        'full_name',
        'date_of_birth',
        'gender',
        'address',
        'phone_number',
        'job_title',
        'start_date',
        'salary',
        'password',
    ],
    additionalProperties: false,
};
const LenderSchema = {
    $id: 'LenderSchema',
    type: 'object',
    properties: {
        full_name: { type: 'string' },
        address: { type: 'string' },
        job_title: { type: 'string' },
        bank: { type: 'string' },
        branch: { type: 'string' },
    },
    required: ['full_name', 'address', 'job_title', 'bank', 'branch'],
    additionalProperties: false,
};
const BorrowerSchema = {
    $id: 'BorrowerSchema',
    type: 'object',
    properties: {
        full_name: { type: 'string' },
        address: { type: 'string' },
        job_title: { type: 'string' },
        phone_number: { type: 'string' },
        income: { type: 'string' },
        outcome: { type: 'string' },
        CCCD: { type: 'string' },
    },
    required: [
        'full_name',
        'address',
        'job_title',
        'phone_number',
        'income',
        'outcome',
        'CCCD',
    ],
    additionalProperties: false,
};
const LoanPackageSchema = {
    $id: 'LoanPackageSchema',
    type: 'object',
    properties: {
        name: { type: 'string' },
        guarantee_type: { type: 'string' },
        interest_rate: { type: 'string' },
        duration: { type: 'string' },
        description: { type: 'string' },
        max_money: { type: 'string' },
        min_money: { type: 'string' },
        interest_period: { type: 'string' },
    },
    required: [
        'name',
        'guarantee_type',
        'interest_rate',
        'duration',
        'description',
        'max_money',
        'min_money',
        'interest_period',
    ],
    additionalProperties: false,
};
const ajv = new Ajv({
    schemas: [EmployeeSchema, LenderSchema, BorrowerSchema, LoanPackageSchema],
});
//const validate = ajv.compile(EmployeeSchema);
module.exports = {
    ajv,
    EmployeeSchema,
    LenderSchema,
    BorrowerSchema,
    LoanPackageSchema,
};
