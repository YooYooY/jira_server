import is from "@/utils/validation";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
class User extends BaseEntity {
  static validations = {
    name: [is.required(), is.maxLength(100)],
    email: [is.required(), is.email(), is.maxLength(200)]
  };

  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @Column("varchar")
  email: string;

  @Column("varchar", {
    length: 2000,
    default: "https://i.ibb.co/6RJ5hq6/gaben.jpg"
  })
  avatarUrl: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}

export default User;
