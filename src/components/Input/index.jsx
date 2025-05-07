import {findInputError, isFormInvalid} from "@/utils";
import {AnimatePresence, motion} from "framer-motion";
import React from "react";
import cn from "classnames";
import {useFormContext} from "react-hook-form";
import {AlertTriangle} from "lucide-react";

const framer_error = {
    initial: {opacity: 0, y: 10},
    animate: {opacity: 1, y: 0},
    exit: {opacity: 0, y: 10},
    transition: {duration: 0.2},
};
const input_tailwind = `border-0 px-3 py-3 placeholder-slate-300 text-slate-600 
bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear 
transition-all duration-150`;
const labelTailwind = "block uppercase text-slate-600 text-xs font-bold mb-2";
const errorStyle = `flex items-center gap-1 px-2 text-red-500 bg-red-100 
rounded-md my-2 text-xs italic`;

const Input = ({
    name,
    label,
    type,
    id,
    placeholder,
    validation,
    multiline,
    className,
}) => {
    const {
        register,
        formState: {errors},
    } = useFormContext();
    const inputErrors = findInputError(errors, name);
    const isInvalid = isFormInvalid(inputErrors);
    // if (isInvalid)
    //   toast.error(inputErrors.error.message);
    return (
        <div className={cn("relative w-full mb-3 ", className)}>
            <label
                className={cn(labelTailwind, isInvalid ? "text-red-400" : "")}
                htmlFor={id}
            >
                {label}
            </label>
            {multiline ? (
                <textarea
                    id={id}
                    name={name}
                    type={type}
                    className={cn(
                        input_tailwind,
                        "min-h-[10rem] max-h-[20rem] resize-y",
                        isInvalid ? " border-2 border-red-400" : ""
                    )}
                    placeholder={placeholder}
                    {...register(name, validation)}
                ></textarea>
            ) : (
                <input
                    id={id}
                    name={name}
                    type={type}
                    className={cn(
                        input_tailwind,
                        className,
                        isInvalid ? " border-2 border-red-400" : ""
                    )}
                    placeholder={placeholder}
                    {...register(name, validation)}
                />
            )}
            <AnimatePresence mode="wait" initial={false}>
                {isInvalid && (
                    <InputError
                        message={inputErrors.error.message}
                        key={inputErrors.error.message}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
const InputError = ({message}) => {
    return (
        <motion.p className={errorStyle} {...framer_error}>
            <AlertTriangle className="w-5 h-5 text-warning mr-2 inline" />{" "}
            {message}
        </motion.p>
    );
};
export default Input;
