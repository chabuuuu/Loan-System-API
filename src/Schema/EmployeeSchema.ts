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
const ajv = new Ajv({ schemas: [EmployeeSchema, LenderSchema] });
//const validate = ajv.compile(EmployeeSchema);
module.exports = { ajv, EmployeeSchema, LenderSchema };
