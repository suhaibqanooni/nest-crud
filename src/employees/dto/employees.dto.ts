import { PrismaClient } from "@prisma/client";
import { IsEmail,  IsNumber, IsString,  MaxLength, 
    ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, 
    registerDecorator } from "class-validator";

@ValidatorConstraint({ async: true })
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
    constructor(private readonly prisma: PrismaClient) {}
    async validate(email: string) {
        const emp = await this.prisma.employee.findUnique({where: { email: email }})
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