"use client"

import React, {useActionState, useState} from 'react'
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import MDEditor from '@uiw/react-md-editor';
import {Button} from "@/components/ui/button";
import {Send} from "lucide-react";
import {formSchema} from "@/lib/validation";
import {z} from "zod";
import {useToast} from "@sanity/ui";
import {useSonner} from "sonner";
import {toast} from 'sonner'
import {useRouter} from "next/navigation";

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [pitch, setPitch] = React.useState("");
    const router = useRouter();
    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            }
            await formSchema.parseAsync(formValues);
            // const result = await createIdea(prevState, formData, pitch);
            //
            // if (result.status === "SUCCESS") {
            //     toast("Success", {description: "Startup submitted successfully"})
            //     setErrors({});
            //     setPitch("");
            //     router.push(`/startup/${result.id}`);
            // }
            // return result;

            console.log(formValues);
        } catch (e) {
            if (e instanceof z.ZodError) {
                const fieldErrors = e.flatten().fieldErrors;

                setErrors(fieldErrors as unknown as Record<string, string>);
                toast("Error", {description: "Please check your inputs and try again"})
                return {...prevState, error: 'Validation failed', status: "ERROR"};
            }
            return {
                ...prevState,
                error: 'An unexpected error occurred. Please try again later.',
                status: "ERROR"
            }
        }
    }

    const [state, formAction, isPending] = useActionState(handleFormSubmit, {error: "", status: "INITIAL"});

    return (
        <form action={formAction} className="startup-form">
            <div className="">
                <label htmlFor="title" className="startup-form_label">
                    Title
                </label>
                <Input required type="text" id="title" name="title" placeholder="Startup Title"
                       className="startup-form_input"/>
                {errors.title && <p className="startup-form_error"> {errors.title}</p>}
            </div>
            <div className="">
                <label htmlFor="description" className="startup-form_label">
                    Description
                </label>
                <Textarea required id="description" name="description" placeholder="Startup description"
                          className="startup-form_textarea"/>
                {errors.description && <p className="startup-form_error"> {errors.description}</p>}
            </div>
            <div className="">
                <label htmlFor="category" className="startup-form_label">
                    Category
                </label>
                <Input required type="text" id="category" name="category"
                       placeholder="Startup Category (Tech, Health, Education)" className="startup-form_input"/>
                {errors.category && <p className="startup-form_error"> {errors.category}</p>}
            </div>
            <div className="">
                <label htmlFor="link" className="startup-form_label">
                    Image URL
                </label>
                <Input required id="link" name="link"
                       placeholder="Startup Category (Tech, Health, Education)" className="startup-form_input"/>
                {errors.link && <p className="startup-form_error"> {errors.link}</p>}
            </div>
            <div data-color-mode="light">
                <label htmlFor="link" className="startup-form_label">
                    Pitch
                </label>
                <MDEditor
                    id="pitch"
                    preview="edit"
                    height={300}
                    style={{borderRadius: 20, overflow: 'hidden'}}
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    textareaProps={{
                        placeholder: "Briefly describe your idea and what problem it solves.",
                    }}
                    previewOptions={{
                        disallowedElements: ["style"]
                    }}
                />
                {errors.pitch && <p className="startup-form_error"> {errors.pitch}</p>}
            </div>
            <Button disabled={isPending} type="submit" className="startup-form_btn">
                {isPending ? 'Submitting...' : 'Submit your Startup'}
                <Send className="size-6 ml-2"/>
            </Button>
        </form>
    )
}
export default StartupForm
