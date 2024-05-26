import { PrismaClient } from "@prisma/client";
import {   IsBoolean, IsNumber, IsString,  MaxLength, 
    ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, 
    registerDecorator } from "class-validator";
const prisma = new PrismaClient()

@ValidatorConstraint({ async: true })
export class IsPhoneNumberUnique implements ValidatorConstraintInterface {
    async validate(phone: string) {
        const order = await prisma.order.findFirst({where: { phone: phone }})
        return !order
    }
    defaultMessage() {
        return 'Phone Number Already Registered!';
    }
}

export function IsPhoneUnique(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsPhoneNumberUnique, 
        });
    };
}

export class CreateOrdersDto {
    @IsString()
    name:string

    @IsString()
    @IsPhoneUnique()
    phone:string

    @IsString()
    address:string

    @IsNumber()
    qad:number

    @IsNumber()
    width:number

    @IsNumber()
    arm:number
    
    @IsNumber()
    cuff:number
    
    @IsNumber()
    chest:number
    
    @IsNumber()
    daman:number
    
    @IsNumber()
    collar:number
    
    @IsString()
    collarType:String
    
    @IsNumber()
    pant:number

    @IsNumber()
    pantCuff:number

    @IsBoolean()
    frontPocket:boolean

    @IsString()
    order: string

    @IsNumber()
    addedById: number

}
