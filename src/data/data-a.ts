import { DataAnsw } from "../types/types";
import { answers_T_G } from "./obfuscated/answ-t_g";
import { answers_T_H } from "./obfuscated/answ-t_h";
import { answers_T_K } from "./obfuscated/answ-t_k";
import { answers_T_L } from "./obfuscated/answ-t_l";
import { answers_T_V } from "./obfuscated/answ-t_v";
import { answers_T_T } from "./obfuscated/answ-t_t";
import { answers_T_A } from "./obfuscated/answ-t_a";

export const answers = [
  ...answers_T_A,
  ...answers_T_V,
  ...answers_T_G,
  ...answers_T_K,
  ...answers_T_L,
  ...answers_T_T,
  ...answers_T_H,
] as DataAnsw[];
