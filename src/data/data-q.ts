import { Data, ThemeName } from "../types/types";
import { questions_T_V } from "./obfuscated/quest-t_v";
import { questions_T_G } from "./obfuscated/quest-t_g";
import { questions_T_K } from "./obfuscated/quest-t_k";
import { questions_T_L } from "./obfuscated/quest-t_l";
import { questions_T_H } from "./obfuscated/quest-t_h";
import { questions_T_A } from "./obfuscated/quest-t_a";
import { questions_T_T } from "./obfuscated/quest-t_t";
import { questions_P_A } from "./obfuscated/quest-p_a";
import { questions_P_B } from "./obfuscated/quest-p_b";

export const questions = [
  ...questions_T_A,
  ...questions_T_V,
  ...questions_T_G,
  ...questions_T_K,
  ...questions_T_L,
  ...questions_T_T,
  ...questions_T_H,
  ...questions_P_A,
  ...questions_P_B,
] as Data[];

const json_tickets = `[
    {
      "category": "des3",
      "themes": ["Т-А", "П-Б", "Т-В", "Т-Г", "Т-Т", "Т-Х", "Т-К", "Т-А", "П-Б", "Т-В", "Т-Г", "Т-Т", "Т-Х", "Т-К", "Т-К"]
    },
    {
      "category": "des2",
      "themes": ["Т-А", "П-Б", "Т-В", "Т-Г", "Т-Т", "Т-Х", "П-Б", "Т-А", "П-Б", "Т-В", "Т-Г", "Т-Т", "П-Б", "Т-К", "Т-Т"]
    },
    {
      "category": "des1",
      "themes": ["Т-В", "П-Б", "Т-В", "Т-Г", "Т-В", "Т-Х", "Т-К", "Т-А", "П-Б", "Т-В", "Т-Г", "Т-Т", "Т-Х", "Т-Х", "Т-К"]
    },  
    {
      "category": "desh",
      "themes": ["Т-А", "П-Б", "Т-В", "Т-Г", "Т-Т", "Т-Х", "Т-К", "Т-В", "П-Б", "Т-В", "Т-Г", "Т-Г", "Т-Г", "Т-К", "Т-Х"]
    },   
    {
      "category": "pr3",
      "themes": ["П-А", "Т-А", "Т-В", "П-А", "Т-А", "Т-В", "П-А", "Т-А", "Т-В", "П-А", "Т-А", "Т-В", "П-А", "Т-А", "Т-В"]
    },
    {
      "category": "pr2",
      "themes": ["П-А", "П-А", "Т-А", "Т-В", "Т-В", "Т-В", "П-А", "П-А", "Т-А", "Т-В", "Т-А", "Т-В", "П-А", "Т-В", "Т-В"]
    },
    {
      "category": "pr1",
      "themes": ["П-А", "Т-А", "Т-В", "П-А", "П-А", "Т-В", "П-А", "Т-А", "Т-А", "Т-В", "П-А", "Т-В", "П-А", "П-А", "Т-В"]
    },  
    {
      "category": "despr3",
      "themes": ["Т-А", "П-Б", "Т-В", "Т-Г", "Т-Л", "Т-Т", "Т-Х", "П-А", "Т-К", "Т-А", "П-Б", "Т-В", "Т-Г", "Т-Л", "Т-Т"]
    }, 
    {
      "category": "despr2",
      "themes": ["Т-А", "П-Б", "Т-В", "Т-Г", "Т-Л", "Т-Т", "Т-Х", "П-А", "Т-К", "Т-А", "П-Б", "Т-В", "Т-Г", "Т-Л", "Т-Т"]
    },
    {
      "category": "despr1",
      "themes": ["Т-В", "Т-Х", "Т-Л", "Т-Г", "П-А", "П-Б", "Т-В", "Т-Х", "Т-Л", "Т-Т", "П-Б", "Т-В", "Т-Г", "Т-Л", "П-А"]
    },  
    {
      "category": "desprh",
      "themes": ["Т-К", "П-Б", "Т-В", "Т-Х", "Т-Л", "Т-Т", "Т-Х", "П-А", "Т-К", "П-А", "П-Б", "Т-В", "Т-Г", "Т-Х", "Т-К"]
    }
  ]`;

export const categories = [
  {
    group: "Designer",
    cats: [
      { id: "des3", name: "Designer 3 grade" },
      { id: "des2", name: "Designer 2 grade" },
      { id: "des1", name: "Designer 1 grade" },
      { id: "desh", name: "Designer high grade" },
    ],
  },
  {
    group: "Programmer",
    cats: [
      { id: "pr3", name: "Programmer 3 grade" },
      { id: "pr2", name: "Programmer 2 grade" },
      { id: "pr1", name: "Programmer 1 grade" },
    ],
  },
  {
    group: "Programmer-designer",
    cats: [
      { id: "despr3", name: "Programmer-designer 3 grade" },
      { id: "despr2", name: "Programmer-designer 2 grade" },
      { id: "despr1", name: "Programmer-designer 1 grade" },
      { id: "desprh", name: "Programmer-designer high grade" },
    ],
  },
];

export const themesArr: ThemeName[] = [
  "Т-А",
  "Т-В",
  "Т-Г",
  "Т-К",
  "Т-Л",
  "Т-Т",
  "Т-Х",
  "П-А",
  "П-Б",
];

export const tickets = JSON.parse(json_tickets);
