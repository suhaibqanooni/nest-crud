import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
const {userRoles} = require("../../data.js")
@Injectable()
export class EmployeesGaurd implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const ctx = context.switchToHttp()
        const req = ctx.getRequest<Request>()
        if(req.headers.authorization === userRoles.admin) return true
        return false
    };
}