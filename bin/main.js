#!/usr/bin/env node

import { program } from "commander";
import Questions from "../src/lib/triviaQuestions.js";
import { showMnMenu } from "../src/lib/TriviaLogic.js";

showMnMenu(Questions);
program.parse(process.argv);