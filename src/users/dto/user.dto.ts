import { PrismaClient, Roles } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsNumber, IsString, Max, MaxLength, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UserService } from "../users.service";
const prisma = new PrismaClient()

@ValidatorConstraint({ async: true })
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {}
    async validate(email: string) {
        const user = await prisma.user.findUnique({where: { email: email }})
        return !user
    }
    defaultMessage() {
        return 'Email Already Registered!';
    }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailUniqueConstraint, 
        });
    };
}

@ValidatorConstraint({ async: true })
export class IsRoleExists implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {}
    async validate(role: string) {
        return (Roles.ADMIN === role ||  Roles.LOCAL === role || Roles.USER === role)
    }
    defaultMessage() {
        return 'Invalid Role';
    }
}

export function IsRoleValid(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsRoleExists, 
        });
    };
}

export class CreateUserDto {
    @IsEmail()
    @IsEmailUnique()
    email:string

    @IsNotEmpty()
    password:string

    @IsString()
    @MaxLength(20, {message:"Name must be less than 20 characters"})
    name:string

    @IsNumber()
    @Max(60, { message: 'Age must be less than 60' })
    age:number

    @IsString()
    @IsRoleValid()
    role:Roles

    @IsString()
    productTableViewColumns: string = '["1","2","3","4","5","6"]';
}