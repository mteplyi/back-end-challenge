import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Room } from '../room/room.entity';
import { Length } from 'class-validator';

@Entity()
export class User {
  @Expose({ name: 'user_id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500, nullable: false })
  @Expose({ name: 'user_name' })
  @Length(1, 500)
  name: string;

  @Column({ length: 500, nullable: false })
  @Exclude()
  @Length(1, 500)
  password: string;

  @ManyToMany(() => Room, (room) => room.users)
  @JoinTable()
  rooms: Room[];
}
