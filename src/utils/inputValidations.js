/*-------------------------------------------------------------------
|  🐼 Input Validators 
|
|  🐯 Purpose: THIS FILE CONTAINS ALL THE VALIDATORS OBJECTS
|
|  🐸 Returns:  -
*-------------------------------------------------------------------*/

export const name_validation = {
    validation: {
        required: {
            value: true,
            message: "required",
        },
        maxLength: {
            value: 30,
            message: "30 characters max",
        },
    },
};

export const desc_validation = {
    validation: {
        required: {
            value: true,
            message: "required",
        },
        maxLength: {
            value: 200,
            message: "200 characters max",
        },
    },
};
export const maxLengthValidation = (value) => {
    return {
        validation: {
            maxLength: {
                value: value,
                message: `must have ${value} characters`,
            },
        },
    };
};
export const minLengthValidation = (value) => {
    return {
        validation: {
            minLength: {
                value: value,
                message: `should not be more than ${value} characters`,
            },
        },
    };
};

export const password_validation = {
    placeholder: "type password ...",
    validation: {
        required: {
            value: true,
            message: "required",
        },
        minLength: {
            value: 4,
            message: "min 4 characters",
        },
    },
};

export const num_validation = {
    validation: {
        required: {
            value: true,
            message: "required",
        },
    },
};

export const email_validation = {
    validation: {
        required: {
            value: true,
            message: "required",
        },
        pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "email is not valid",
        },
    },
};
export const req_validation = {
    validation: {
        required: {
            value: true,
            message: "required",
        },
    },
};
export const confirm_validation = {
    validation: {
        required: {
            value: true,
            message: "required",
        },
    },
};

export const phone_validation = {
    validation: {
        required: {
            value: true,
            message: "required",
        },
    },
};
