import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Contact } from "./Contact";

@ObjectType()
@Entity()
export class PhoneNumber extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field({nullable: true})
    @Column()
    phoneNumber: string;

    @Field()
    @Column()
    phoneNumberType: string;

    @Field()
    @Column()
    createdBy: string;

    @Field(() => String)
    @CreateDateColumn()
    createdOn: Date;

    @Field()
    @Column()
    updatedBy: string;

    @Field(() => String)
    @CreateDateColumn()
    updatedOn: Date;

    @Field()
    @Column()
    contactId: number;

    @ManyToOne(() => Contact, contact => contact.phoneNumbers)
    contact: Contact;
  
}