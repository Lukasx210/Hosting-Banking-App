import Input from "@/components/Input";
import {password_validation, req_validation} from "@/utils/inputValidations";
import React, {useEffect} from "react";
import {FormProvider, useForm} from "react-hook-form";
import gitHub from "@/assets/img/github.svg";
import google from "@/assets/img/google.svg";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "@/store/auth/actions";
import TailwindLoader from "@/components/Loading/TailwindLoader";
import {selectAuth} from "@/store/auth/selectors";

const LoginForm = () => {
    const methods = useForm({mode: "onBlur"});
    const {isLoading, isSuccess, isLoggedIn} = useSelector(selectAuth);
    const navigate = useNavigate();
    // const size = useSize();

    const dispatch = useDispatch();

    useEffect(() => {
        if (isSuccess && isLoggedIn) navigate("/");
    }, [isSuccess]);

    const onSubmit = methods.handleSubmit((data) => {
        console.log(data);
        dispatch(login({loginData: data}));
    });

    return (
        <TailwindLoader isLoading={isLoading}>
            <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-50 border-0">
                    <div className="rounded-t mb-0 px-6 py-6">
                        <div className="text-center mb-3">
                            <h6 className="text-slate-500 text-sm font-bold">
                                Sign in with
                            </h6>
                        </div>
                        <div className="btn-wrapper text-center">
                            <button
                                className="bg-white active:bg-slate-50 text-slate-700  px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
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
                                className="bg-white active:bg-slate-50 text-slate-700  px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
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
                            <small>Or sign in with credentials</small>
                        </div>
                        <FormProvider {...methods}>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    onSubmit();
                                }}
                                noValidate
                                id="normal_login"
                                // autoComplete="off"
                            >
                                <Input
                                    id="username"
                                    name="username"
                                    label={"User Name"}
                                    type="username"
                                    placeholder={"User Name"}
                                    validation={req_validation.validation}
                                />
                                <Input
                                    id="password"
                                    name="password"
                                    label={"password"}
                                    type="password"
                                    placeholder={"Password"}
                                    validation={password_validation.validation}
                                />
                                <div>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            id="remember"
                                            name="remember"
                                            type="checkbox"
                                            {...methods.register("remember")}
                                            className="form-checkbox border-0 rounded text-slate-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                        />
                                        <span className="ml-2 text-sm font-semibold text-slate-600">
                                            Remember me
                                        </span>
                                    </label>
                                </div>
                                <div className="text-center mt-6">
                                    <button
                                        className={`bg-slate-800 text-white active:bg-slate-600 
                        text-sm font-bold uppercase px-6 py-3 rounded shadow 
                        hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full 
                        ease-linear transition-all duration-150`}
                                        type="submit"
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </div>
                <div className="flex flex-wrap mt-6 relative">
                    <div className="w-1/2">
                        <a
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            className="text-slate-700"
                        >
                            <small>Forgot password?</small>
                        </a>
                    </div>
                    <div className="w-1/2 text-right">
                        <Link to="/auth/register" className="text-slate-700">
                            <small>Create new account</small>
                        </Link>
                    </div>
                </div>
            </div>
        </TailwindLoader>
    );
};

export default LoginForm;
