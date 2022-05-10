import { Contact } from "../entities/Contact";
import { Arg, Field, FieldResolver, InputType, Mutation, Query, Resolver, Root } from "type-graphql";
import { PhoneNumber } from "../entities/PhoneNumber";

@InputType()
class ContactInput {

    @Field()
    name: string;

    @Field()
    role: string;

    @Field()
    createdBy: string;

    @Field()
    updatedBy: string;

}

@Resolver(Contact)
export class ContactResolver {

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
    createContact(
        @Arg("input") input: ContactInput
    ) {
        return Contact.create(input).save();
    }

    @Mutation(() => Contact, { nullable: true })
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
    async deleteContact(
        @Arg("id") id: number
    ): Promise<boolean> {
        await Contact.delete(id);
        return true;
    }

}