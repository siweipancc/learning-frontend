import * as fs from "fs";
import {esWriteLine} from "../purees/esUtils.js";
import {csWriteLine} from "./csUtils.js";

esWriteLine('esWriteLine from cs');

csWriteLine('csWriteLine from cs');

console.log(fs != null)


import("./csUtils.js").then(value => value.csWriteLine('dynamic csWriteLine from cs'));
import("../purees/esUtils.js").then(value => value.esWriteLine('dynamic esWriteLine from cs'));
