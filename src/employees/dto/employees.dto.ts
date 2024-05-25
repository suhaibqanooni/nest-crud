import { PrismaClient, Roles } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsNumber, IsString, Max, MaxLength, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
const prisma = new PrismaClient()

@ValidatorConstraint({ async: true })
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
    async validate(email: string) {
        const emp = await prisma.employee.findUnique({where: { email: email }})
        return !emp
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

export class CreateEmployeesDto {
    @IsEmail()
    @IsEmailUnique()
    email:string

    @IsString()
    @MaxLength(20, {message:"Name must be less than 20 characters"})
    name:string

    @IsString()
    dob:string

    @IsString()
    position:string

    @IsNumber()
    productId:number

    @IsNumber()
    addedById:number
}