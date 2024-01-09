import {csWriteLine} from "../purecs/csUtils.js";
import {esWriteLine} from "./esUtils";


csWriteLine("csWriteLine from es");

esWriteLine('esWriteLine fr es');


import ("../purecs/csUtils.js").then(value => value.csWriteLine("csWriteLine from es"));
import ("./esUtils.js").then(value => value.esWriteLine("esWriteLine from es"));
