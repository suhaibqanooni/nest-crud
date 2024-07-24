import { PrismaClient  } from "@prisma/client";
import { Transform, Type } from "class-transformer";
import {    IsDate, IsNumber, IsOptional, IsString, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, 
    registerDecorator } from "class-validator";
import * as  moment from "moment";
import { trim } from "src/helper/actions";
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
    @Transform(({ value }) => trim(value))
    name:string

    @IsString()
    @IsPhoneUnique() 
    @Transform(({ value }) => trim(value))
    phone:string

    @IsString()  
    @IsOptional()
    @Transform(({ value }) => trim(value))
    address:string

    @IsNumber() 
    @IsOptional()
    @Transform(({ value }) => +value)
    qad:number

    @IsNumber()  
    @IsOptional()
    @Transform(({ value }) => +value)
    width:number

    @IsNumber() 
    @IsOptional()
    @Transform(({ value }) => +value)
    arm:number
    
    @IsNumber() 
    @IsOptional()
    @Transform(({ value }) => +value)
    cuff:number
    
    @IsNumber() 
    @IsOptional()
    @Transform(({ value }) => +value)
    chest:number
    
    @IsNumber() 
    @IsOptional()
    @Transform(({ value }) => +value)
    daman:number
    
    @IsNumber() 
    @IsOptional()
    @Transform(({ value }) => +value)
    collar:number
    
    @IsString()
    @IsOptional()
    collarType:string
    
    @IsNumber() 
    @IsOptional()
    @Transform(({ value }) => +value)
    pant:number

    @IsNumber() 
    @IsOptional()
    @Transform(({ value }) => +value)
    pantCuff:number

    @IsString()
    @IsOptional()
    @Transform(({ value }) => trim(value))
    frontPocket:string

    @IsString()
    @IsOptional()
    @Transform(({ value }) => trim(value))
    order: string

    @IsString() 
    @IsOptional()
    @Transform(({ value }) => trim(value))
    returnDate: string;

    @IsNumber() 
    @IsOptional()
    @Transform(({ value }) => +value)
    addedById: number;
}
