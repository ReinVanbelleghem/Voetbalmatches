import { UserController } from "./controller/UserController";
import { VoetbalploegController } from "./controller/VoetbalploegController";
import { WedstrijdController } from "./controller/WedstrijdController";

export const Routes = [
    /*{
        method: "get",
        route: "/users",
        controller: UserController,
        action: "all"
    },
    {
        method: "get",
        route: "/users/:id",
        controller: UserController,
        action: "one"
    },
    {
        method: "post",
        route: "/users",
        controller: UserController,
        action: "save"
    },
    {
        method: "delete",
        route: "/users/:id",
        controller: UserController,
        action: "remove"
    },*/
    {
        method: "get",
        route: "/wedstrijden",
        controller: WedstrijdController,
        action: "all"
    },
    {
        method: "get",
        route: "/wedstrijden/:id",
        controller: WedstrijdController,
        action: "one"
    },
    {
        method: "post",
        route: "/wedstrijden",
        controller: WedstrijdController,
        action: "save"
    },
    {
        method: "patch",
        route: "/wedstrijden/:id",
        controller: WedstrijdController,
        action: "save"
    },
    {
        method: "delete",
        route: "/wedstrijden/:id",
        controller: WedstrijdController,
        action: "remove"
    },
    {
        method: "get",
        route: "/voetbalploegen",
        controller: VoetbalploegController,
        action: "all"
    },
    {
        method: "get",
        route: "/voetbalploegen/:id",
        controller: VoetbalploegController,
        action: "one"
    },
    {
        method: "post",
        route: "/voetbalploegen",
        controller: VoetbalploegController,
        action: "save"
    },
    {
        method: "delete",
        route: "/voetbalploegen/:id",
        controller: VoetbalploegController,
        action: "remove"
    }
];
