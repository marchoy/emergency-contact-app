import { Contact } from "../entities/Contact";
import { Arg, Field, FieldResolver, InputType, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { PhoneNumber } from "../entities/PhoneNumber";
import { Length } from "class-validator";
import { checkAuth } from "../utils/checkAuth";

@InputType()
class ContactInput {

    @Field()
    @Length(1, 50)
    name?: string;

    @Field()
    @Length(1, 50)
    role?: string;

    @Field()
    @Length(1, 50)
    createdBy?: string;

    @Field()
    @Length(0, 50)
    updatedBy?: string;

}

@Resolver(Contact)
export class ContactResolver {

    @Query(() => Boolean)
    @UseMiddleware(checkAuth)
    checkAuth(): boolean {
        return true;
    }

    @Query(() => [Contact])
    async contacts(): Promise<Contact[]> {
        return Contact.find();
    }

    @Query(() => Contact, { nullable: true })
    async contact(@Arg("id") id: number): Promise<Contact | undefined> {
        return Contact.findOne(id);
    }

    @FieldResolver(() => [PhoneNumber])
    contactNumbers(
        @Root() contact: Contact
    ) {
        return PhoneNumber.find({ where: { contact: { id: contact.id } } })
    }

    @Mutation(() => Contact)
    @UseMiddleware(checkAuth)
    createContact(
        @Arg("input") input: ContactInput
    ) {
        return Contact.create(input).save();
    }

    @Mutation(() => Contact, { nullable: true })
    @UseMiddleware(checkAuth)
    async updateContact(
        @Arg("id") id: number,
        @Arg("name") name: string,
        @Arg("role") role: string,
        @Arg("updatedBy") updatedBy: string,
    ): Promise<Contact | null> {
        const contact = await Contact.findOne(id);
        if (!contact) {
            return null;
        }
        await Contact.update({ id }, { name, role, updatedBy });
        return contact;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(checkAuth)
    async deleteContact(
        @Arg("id") id: number
    ): Promise<boolean> {
        await Contact.delete(id);
        return true;
    }

}