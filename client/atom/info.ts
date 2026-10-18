import { Membership } from "@/interfaces";
import { atom } from "jotai";

export const membershipAtom = atom<Membership | null>(null);
