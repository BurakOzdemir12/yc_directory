"use server";

import {auth} from "@/auth";
import {parseServerActionResponse} from "@/lib/utils";

export const creativePitch = async (
    state: any,
    form: FormData,
    pitch: string) => {
    const session = await auth();

    if (!session) {
        return parseServerActionResponse({
            error: "Not Signed In",
            status: "ERROR",
        })
    }
    const {title, description, category, link} =
        Object.fromEntries(
            Array.from(form).filter(([key]) => key !== "pitch"));
};