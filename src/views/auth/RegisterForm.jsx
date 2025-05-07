import TailwindLoader from "@/components/Loading/TailwindLoader";
import React, {useEffect} from "react";
import gitHub from "@/assets/img/github.svg";
import google from "@/assets/img/google.svg";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "@/store/auth/selectors";
import {useNavigate} from "react-router-dom";
import {register} from "@/store/auth/actions";
import Input from "@/components/Input";
import {minLengthValidation, req_validation} from "@/utils/inputValidations";
import {FormProvider, useForm} from "react-hook-form";

const RegisterForm = () => {
    const methods = useForm({mode: "onBlur"});

    const {isLoading, isSuccess} = useSelector(selectAuth);
    const navigate = useNavigate();
    // const size = useSize();

    const dispatch = useDispatch();

    const onSubmit = methods.handleSubmit((values) => {
        console.log(values);
        dispatch(register({registerData: values}));
    });

    useEffect(() => {
        if (isSuccess) navigate("/");
    }, [isSuccess]);
    return (
        <TailwindLoader isLoading={isLoading}>
            <div className="w-full lg:w-6/12 px-4">
                <div
                    className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-50
         border-0"
                >
                    <div className="rounded-t mb-0 px-6 py-6">
                        <div className="text-center mb-3">
                            <h6 className="text-slate-500 text-sm font-bold">
                                Sign up with
                            </h6>
                        </div>
                        <div className="btn-wrapper text-center">
                            <button
                                className="bg-white active:bg-slate-50 text-slate-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                                type="button"
                            >
                                <img
                                    alt="..."
                                    className="w-5 mr-1"
                                    src={gitHub}
                                />
                                <span className="hidden md:inline-block">
                                    Github
                                </span>
                            </button>
                            <button
                                className="bg-white active:bg-slate-50 text-slate-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                                type="button"
                            >
                                <img
                                    alt="..."
                                    className="w-5 mr-1"
                                    src={google}
                                />
                                <span className="hidden md:inline-block">
                                    Google
                                </span>
                            </button>
                        </div>
                        <hr className="mt-6 border-b-1 border-slate-300" />
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <div className="text-slate-400 text-center mb-3 font-bold">
                            <small>Or sign up with credentials</small>
                        </div>
                        <FormProvider {...methods}>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    onSubmit();
                                }}
                                noValidate
                                id="normal_register"
                            >
                                <div className="grid gap-5 md:grid-cols-2">
                                    <Input
                                        id="firstName"
                                        label="First Name"
                                        name="firstName"
                                        placeholder="First Name"
                                        validation={req_validation.validation}
                                        type="text"
                                    />
                                    <Input
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        placeholder="Last Name"
                                        validation={req_validation.validation}
                                        type="text"
                                    />
                                    <Input
                                        id="username"
                                        label="User Name"
                                        name="username"
                                        placeholder="User Name"
                                        validation={req_validation.validation}
                                        type="text"
                                    />
                                    <Input
                                        id="mobileNumber"
                                        label="Mobile Number"
                                        name="mobileNumber"
                                        placeholder="Mobile Number"
                                        validation={req_validation.validation}
                                        type="text"
                                    />
                                    <Input
                                        id="email"
                                        label="Email"
                                        name="email"
                                        placeholder="email"
                                        validation={req_validation.validation}
                                        type="email"
                                        className="col-span-2"
                                    />
                                    <Input
                                        id="password"
                                        label="password"
                                        name="password"
                                        placeholder="Password"
                                        validation={
                                            req_validation.validation +
                                            minLengthValidation(6).validation
                                        }
                                        type="password"
                                    />
                                    <Input
                                        id="confirm_password"
                                        label="confirm password"
                                        name="confirm_password"
                                        placeholder="confirm password"
                                        validation={{
                                            validate: (value) => {
                                                const {password} =
                                                    methods.getValues();
                                                return (
                                                    password === value ||
                                                    "Passwords should match!"
                                                );
                                            },
                                        }}
                                        type="password"
                                    />
                                </div>
                                <div>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            id="customCheckLogin"
                                            type="checkbox"
                                            className="form-checkbox border-0 rounded text-slate-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                        />
                                        <span className="ml-2 text-sm font-semibold text-slate-600">
                                            I agree with the{" "}
                                            <a
                                                href="#pablo"
                                                className="text-sky-500"
                                                onClick={(e) =>
                                                    e.preventDefault()
                                                }
                                            >
                                                Privacy Policy
                                            </a>
                                        </span>
                                    </label>
                                </div>

                                <div className="text-center mt-6">
                                    <button
                                        className="bg-slate-800 text-white cursor-pointer active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                        type="submit"
                                    >
                                        Create Account
                                    </button>
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </TailwindLoader>
    );
};

export default RegisterForm;
