import { PhoneNumber } from "../entities/PhoneNumber";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";

@InputType()
class PhoneNumberInput {

    @Field()
    phoneNumber: string;

    @Field()
    phoneNumberType: string;

    @Field()
    createdBy: string;

    @Field()
    updatedBy: string;

    @Field()
    contactId: number;
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
    createPhoneNumber(
        @Arg("input") input: PhoneNumberInput
    ) {
        return PhoneNumber.create(input).save();
    }

    @Mutation(() => PhoneNumber, { nullable: true })
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
    async deletePhoneNumber(
        @Arg("id") id: number
    ): Promise<boolean> {
        await PhoneNumber.delete(id);
        return true;
    }

}