import { PhoneNumber } from "../entities/PhoneNumber";
import { Arg, Field, InputType, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Length } from "class-validator";
import { checkAuth } from "../utils/checkAuth";

@InputType()
class PhoneNumberInput {

    @Field()
    @Length(1, 50)
    phoneNumber?: string;

    @Field()
    @Length(1, 50)
    phoneNumberType?: string;

    @Field()
    createdBy?: string;

    @Field()
    updatedBy?: string;

    @Field()
    contactId?: number;
}

@Resolver(PhoneNumber)
export class PhoneNumberResolver {

    @Query(() => [PhoneNumber])
    async phoneNumbers(): Promise<PhoneNumber[]> {
        return PhoneNumber.find();
    }

    @Query(() => PhoneNumber, { nullable: true })
    phoneNumber(@Arg("id") id: number): Promise<PhoneNumber | undefined> {
        return PhoneNumber.findOne(id);
    }

    @Mutation(() => PhoneNumber)
    @UseMiddleware(checkAuth)
    createPhoneNumber(
        @Arg("input") input: PhoneNumberInput
    ) {
        return PhoneNumber.create(input).save();
    }

    @Mutation(() => PhoneNumber, { nullable: true })
    @UseMiddleware(checkAuth)
    async updatePhoneNumber(
        @Arg("id") id: number,
        @Arg("phoneNumber") phoneNumber: string,
        @Arg("phoneNumberType") phoneNumberType: string,
        @Arg("updatedBy") updatedBy: string,
    ): Promise<PhoneNumber | null> {
        const phone = await PhoneNumber.findOne(id);
        if (!phone) {
            return null;
        }
        await PhoneNumber.update({ id }, { phoneNumber, phoneNumberType, updatedBy });
        return phone;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(checkAuth)
    async deletePhoneNumber(
        @Arg("id") id: number
    ): Promise<boolean> {
        await PhoneNumber.delete(id);
        return true;
    }

}