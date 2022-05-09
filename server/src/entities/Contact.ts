import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Contact extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    role: string;

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

}